import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { UseFormReturn, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, MessageCircle, Share2, Users, Globe, Calendar, Award } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Form schema for community stories
const storyFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  story: z.string().min(20, { message: "Your story should be at least 20 characters" }),
});

type StoryFormValues = z.infer<typeof storyFormSchema>;

// Community stories data
const communityStories = [
  {
    id: 1,
    author: "Nitish kumar",
    title: "Finding Connection Through Difference",
    content: "Growing up in a predominantly community, I never had much exposure to other faiths. CommunionHub events changed that for me. Attending an interfaith dialogue opened my eyes to the beauty of other traditions.",
    likes: 42,
    comments: 7,
    date: "March 2, 2025",
    image: "https://images.unsplash.com/photo-1536337005238-94b997371b40?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    author: "Alok",
    title: "Building Bridges in Our Neighborhood",
    content: "After a series of divisive incidents in our neighborhood, we used CommunionHub to organize a community dinner with families from different backgrounds. What started as a one-time event has become a monthly tradition.",
    likes: 56,
    comments: 11,
    date: "February 15, 2025",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=300&fit=crop"
  },
  {
    id: 3,
    author: "Pranav Arya",
    title: "Youth Mentorship Success",
    content: "The youth mentorship program we discovered through CommunionHub has been transformative for the teenagers in our community. Seeing young people from different faiths working together on service projects gives me hope for the future.",
    likes: 38,
    comments: 5,
    date: "February 27, 2025",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=500&h=300&fit=crop"
  }
];

// Stats data
const communityStats = [
  { id: 1, icon: Users, label: "Community Members", value: "5,200+" },
  { id: 2, icon: Calendar, label: "Events Hosted", value: "340+" },
  { id: 3, icon: Globe, label: "Cities Represented", value: "75+" },
  { id: 4, icon: Award, label: "Success Stories", value: "230+" },
];

const CommunityPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const statsRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      name: "",
      email: "",
      story: ""
    }
  });
  
  const onSubmit = (data: StoryFormValues) => {
    console.log('Form submitted:', data);
    form.reset();
    alert("Thank you for sharing your story! Our team will review it shortly.");
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <motion.div 
        className="bg-gradient-to-b from-primary/10 to-background pt-20 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Container>
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Our Community</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Join thousands of individuals working together to create meaningful connections across faiths and cultures.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["All", "Stories", "Events", "Projects", "Resources"].map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full px-5"
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </Container>
      </motion.div>
      
      {/* Community stats */}
      <Container>
        <motion.div 
          ref={statsRef}
          className="py-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Community Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {communityStats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="bg-gradient-to-br from-white via-white/95 to-white/90 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Community stories */}
        <motion.div
          className="py-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-heading">Community Stories</h2>
            <Button variant="link" className="flex items-center">
              View all stories <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {communityStories.map((story) => (
              <motion.div
                key={story.id}
                variants={itemVariants}
                className="bg-gradient-to-br from-white via-white/98 to-white/95 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-44 object-cover" 
                />
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{story.date}</p>
                  <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                  <p className="text-muted-foreground mb-3 line-clamp-3">{story.content}</p>
                  <p className="font-medium mb-4">By {story.author}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <button className="flex items-center mr-4 hover:text-primary transition-colors">
                        <Heart className="h-4 w-4 mr-1" />
                        {story.likes}
                      </button>
                      <button className="flex items-center hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {story.comments}
                      </button>
                    </div>
                    <button className="hover:text-primary transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Share your story section */}
        <motion.div 
          className="py-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="bg-card rounded-xl p-8 md:p-12 shadow-sm">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold font-heading text-center mb-8">Share Your Story</h2>
              <p className="text-center text-muted-foreground mb-8">
                Has CommunionHub made a difference in your community? We'd love to hear your story and potentially feature it on our platform.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="story"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Story</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your experience with CommunionHub..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="text-center">
                    <Button type="submit" className="px-8 py-2">
                      Submit Your Story
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default CommunityPage;