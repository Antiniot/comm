import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AddEventModal from '@/components/AddEventModal';
import { Event } from '@shared/schema';
import { formatDistance } from 'date-fns';
import { 
  Calendar, 
  MapPin, 
  Search, 
  Plus 
} from 'lucide-react';
import { motion } from 'framer-motion';

const EventsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Events');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ['/api/event-categories'],
  });

  // Filter events based on search and category
  const filteredEvents = events?.filter((event) => {
    const matchesSearch = 
      search === '' || 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All Events' || 
      event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get the category color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'religious':
        return 'bg-primary';
      case 'social':
        return 'bg-secondary';
      case 'charity':
        return 'bg-[#F97316]';
      case 'educational':
        return 'bg-blue-500';
      case 'community':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div>
      {/* Events Hero */}
      <section className="pt-32 pb-10 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 relative overflow-hidden">
        <Container>
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold font-heading mb-4 text-black"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Upcoming Events
            </motion.h1>
            <motion.p 
              className="text-lg text-black max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover and join events from different communities and traditions.
            </motion.p>
          </motion.div>
        </Container>
        <motion.div
          className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </section>

      {/* Events Filter */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2 bg-light rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/50 h-4 w-4" />
            </div>
            
            <div className="flex flex-wrap gap-3">              <Button
                className={`px-4 py-2 text-sm ${selectedCategory === 'All Events' ? 'bg-gradient-to-r from-primary to-primary/80 text-black shadow-primary/20' : 'bg-white hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 border border-gray-200 text-dark/70 hover:text-primary'} rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5`}
                onClick={() => setSelectedCategory('All Events')}
              >
                All Events
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category}
                  className={`px-4 py-2 text-sm ${selectedCategory === category ? `bg-gradient-to-r ${getCategoryColor(category)} text-black shadow-${getCategoryColor(category).split('-')[1]}/20` : 'bg-white hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 border border-gray-200 text-dark/70 hover:text-primary'} rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <AddEventModal>
              <Button className="px-4 py-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 rounded-full flex items-center whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </AddEventModal>
          </div>
        </Container>
      </section>

      {/* Events List */}
      <section className="py-12 bg-gradient-to-b from-light to-white">
        <Container>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredEvents && filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={event.image || `https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=300&fit=crop`} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <Badge className={`absolute top-4 left-4 ${getCategoryColor(event.category)} text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md`}>
                        {event.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-heading font-semibold text-xl mb-3 text-black hover:text-primary transition-colors cursor-pointer">{event.title}</h3>
                        <div className="flex items-center mb-3 text-black">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          <span className="text-sm">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-black">
                          <MapPin className="mr-2 h-4 w-4 text-primary" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <p className="mt-3 text-black">{event.description}</p>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <div className="flex -space-x-2">
                          <Avatar className="h-8 w-8 border-2 border-white ring-2 ring-primary/10">
                            <AvatarFallback className="bg-primary/10 text-primary">U1</AvatarFallback>
                          </Avatar>
                          <Avatar className="h-8 w-8 border-2 border-white ring-2 ring-primary/10">
                            <AvatarFallback className="bg-primary/10 text-primary">U2</AvatarFallback>
                          </Avatar>
                          <div className="h-8 w-8 rounded-full border-2 border-white ring-2 ring-primary/10 bg-primary/5 flex items-center justify-center text-xs font-medium text-primary">
                            +{Math.floor(Math.random() * 20) + 5}
                          </div>
                        </div>
                        <Button className="px-6 py-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white hover:from-primary/90 hover:to-primary/70 rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                          RSVP
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-dark/70 mb-6">
                {search || selectedCategory !== 'All Events' 
                  ? "No events match your current filters. Try adjusting your search or category selection."
                  : "There are no upcoming events yet. Be the first to add one!"}
              </p>
              <AddEventModal>
                <Button className="px-6 py-2 bg-primary text-white rounded-full">
                  <Plus className="mr-2 h-4 w-4" /> Add New Event
                </Button>
              </AddEventModal>
            </div>
          )}
          
          {filteredEvents && filteredEvents.length > 0 && (
            <div className="mt-12 text-center">
              <Button className="px-6 py-3 bg-white border border-primary/20 text-primary rounded-full hover:bg-primary/5 transition-colors">
                Load More Events
              </Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default EventsPage;
