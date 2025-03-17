import { Handler } from '@netlify/functions';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { storage } from '../../server/storage';

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { username, password, email } = JSON.parse(event.body || '');

    if (!username || !password || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    // Check if user already exists
    const existingUser = await storage.getUserByUsername(username);
    if (existingUser) {
      return {
        statusCode: 409,
        body: JSON.stringify({ message: 'Username already exists' })
      };
    }

    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await storage.createUser({
      username,
      password: hashedPassword,
      email
    });

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      })
    };
  } catch (error) {
    console.error('Error during registration:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};