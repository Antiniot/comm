import { Handler } from '@netlify/functions';
import express from 'express';
import { storage } from './storage';
import { insertEventSchema, eventFilterSchema } from '@shared/schema';
import serverless from 'serverless-http';
import session from 'express-session';
import passport from 'passport';
import createMemoryStore from 'memorystore';

const app = express();
app.use(express.json());

const MemoryStore = createMemoryStore(session);
const sessionSettings = {
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

// Get all events with optional filtering
app.get('/events', async (req, res) => {
  try {
    const filters = eventFilterSchema.safeParse(req.query);
    
    if (!filters.success) {
      return res.status(400).json({ 
        message: 'Invalid filter parameters', 
        errors: filters.error 
      });
    }
    
    const events = await storage.getEvents(filters.data);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Get a single event by ID
app.get('/events/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }
    
    const event = await storage.getEvent(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
});

// Create a new event
app.post('/events', async (req, res) => {
  try {
    const eventData = insertEventSchema.safeParse(req.body);
    
    if (!eventData.success) {
      return res.status(400).json({ 
        message: 'Invalid event data', 
        errors: eventData.error 
      });
    }
    
    const processedData = {
      ...eventData.data,
      date: typeof eventData.data.date === 'string' 
        ? new Date(eventData.data.date) 
        : eventData.data.date,
    };
    
    const newEvent = await storage.createEvent(processedData);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// Get event categories
app.get('/event-categories', async (req, res) => {
  try {
    const categories = await storage.getEventCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

export const handler = serverless(app);