import { Handler } from '@netlify/functions';
import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { storage } from './storage';
import { User as SelectUser } from '@shared/schema';
import createMemoryStore from 'memorystore';
import * as serverless from 'serverless-http';



const MemoryStore = createMemoryStore(session);
const scryptAsync = promisify(scrypt);

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split('.');
  const hashedBuf = Buffer.from(hashed, 'hex');
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

const app = express();
app.use(express.json());

const sessionSettings: session.SessionOptions = {
  secret: process.env.SESSION_SECRET || 'communion-hub-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  })
};

app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.post('/register', async (req, res, next) => {
  try {
    const existingUser = await storage.getUserByUsername(req.body.username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = await storage.createUser({
      ...req.body,
      password: await hashPassword(req.body.password),
    });

    req.login(user, (err) => {
      if (err) return next(err);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    });
  } catch (error) {
    next(error);
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  const { password, ...userWithoutPassword } = req.user as SelectUser;
  res.json(userWithoutPassword);
});

app.post('/.netlify/functions/auth-handler/login', passport.authenticate('local'), (req, res) => {
  const { password, ...userWithoutPassword } = req.user as SelectUser;
  res.json(userWithoutPassword);
});

app.post('/logout', (req, res) => {
});

app.post('/.netlify/functions/auth-handler/logout', (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

app.get('/me', (req, res) => {
});

app.get('/.netlify/functions/auth-handler/me', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  const { password, ...userWithoutPassword } = req.user as SelectUser;
  res.json(userWithoutPassword);
});

export const handler = serverless(app);