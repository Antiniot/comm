import { events, type Event, type InsertEvent, type EventFilter, type User, type InsertUser, users } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getEvents(filter?: EventFilter): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  getEventCategories(): Promise<string[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private userId: number;
  private eventId: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.userId = 1;
    this.eventId = 1;
    
    // Seed with sample events
    this.seedEvents();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getEvents(filter?: EventFilter): Promise<Event[]> {
    let events = Array.from(this.events.values());

    if (filter) {
      if (filter.category && filter.category !== "") {
        events = events.filter(event => event.category.toLowerCase() === filter.category?.toLowerCase());
      }

      if (filter.search && filter.search !== "") {
        const searchTerm = filter.search.toLowerCase();
        events = events.filter(event => 
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.location.toLowerCase().includes(searchTerm)
        );
      }
    }

    // Sort events by date (newest first)
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventId++;
    
    // Ensure date is a Date object
    const date = insertEvent.date instanceof Date 
      ? insertEvent.date 
      : new Date(insertEvent.date as string);
    
    const event: Event = { 
      ...insertEvent,
      date, // Use the processed date
      id,
      image: insertEvent.image || null,
      authorId: null
    };
    
    this.events.set(id, event);
    return event;
  }

  async getEventCategories(): Promise<string[]> {
    const categorySet = new Set<string>();
    
    // Convert values() iterator to array before using for...of to avoid MapIterator issue
    const eventsArray = Array.from(this.events.values());
    
    for (const event of eventsArray) {
      categorySet.add(event.category);
    }
    
    return Array.from(categorySet);
  }

  private seedEvents() {
    const categories = ["Religious", "Social", "Charity", "Educational", "Community"];
    const images = [
      "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=300&fit=crop"
    ];

    const sampleEvents: InsertEvent[] = [
      {
        title: "Interfaith Prayer Gathering",
        date: new Date("2025-04-15T18:00:00"),
        location: "Community Center, 123 Main St",
        description: "Join us for an evening of shared prayer, reflection, and dialogue across different faith traditions.",
        category: "Religious",
        image: images[0]
      },
      {
        title: "Community Food Drive",
        date: new Date("2025-04-22T10:00:00"),
        location: "City Park, 789 Park Avenue",
        description: "Help us collect non-perishable food items for local families in need. All donations welcome!",
        category: "Charity",
        image: images[1]
      },
      {
        title: "Multicultural Festival",
        date: new Date("2025-05-05T12:00:00"),
        location: "Community Plaza, 456 Center St",
        description: "Celebrate diversity with food, music, dance, and art from different cultures around the world.",
        category: "Social",
        image: images[2]
      },
      {
        title: "Faith Leadership Workshop",
        date: new Date("2025-05-12T09:00:00"),
        location: "Community College, 321 Education Blvd",
        description: "A workshop on community leadership and organization for faith leaders and interested community members.",
        category: "Educational",
        image: images[3]
      },
      {
        title: "Youth Mentorship Program",
        date: new Date("2025-05-20T16:00:00"),
        location: "Youth Center, 555 Community Ln",
        description: "Connect with youth in our community through our mentorship program. Training provided for all mentors.",
        category: "Community",
        image: images[4]
      },
      {
        title: "Community Potluck",
        date: new Date("2025-06-01T17:30:00"),
        location: "Community Garden, 777 Green St",
        description: "Bring a dish to share! A wonderful opportunity to connect over food and conversation with neighbors.",
        category: "Social",
        image: images[5]
      }
    ];

    sampleEvents.forEach(event => {
      this.createEvent(event);
    });
  }
}

export const storage = new MemStorage();
