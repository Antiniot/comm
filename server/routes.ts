import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEventSchema, eventFilterSchema } from "@shared/schema";
import { type ValidationError } from "zod-validation-error";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);
  
  // API routes for events
  const apiRouter = express.Router();
  app.use("/api", apiRouter);

  // Get all events with optional filtering
  apiRouter.get("/events", async (req, res) => {
    try {
      const filters = eventFilterSchema.safeParse(req.query);
      
      if (!filters.success) {
        return res.status(400).json({ 
          message: "Invalid filter parameters", 
          errors: filters.error 
        });
      }
      
      const events = await storage.getEvents(filters.data);
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Get a single event by ID
  apiRouter.get("/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  // Create a new event
  apiRouter.post("/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.safeParse(req.body);
      
      if (!eventData.success) {
        return res.status(400).json({ 
          message: "Invalid event data", 
          errors: eventData.error 
        });
      }
      
      // Convert the date string to a Date object if it's a string
      const processedData = {
        ...eventData.data,
        date: typeof eventData.data.date === 'string' 
          ? new Date(eventData.data.date) 
          : eventData.data.date,
      };
      
      const newEvent = await storage.createEvent(processedData);
      res.status(201).json(newEvent);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Failed to create event" });
    }
  });

  // Get event categories
  apiRouter.get("/event-categories", async (req, res) => {
    try {
      const categories = await storage.getEventCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
