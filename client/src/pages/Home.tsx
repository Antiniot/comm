import { useEffect } from 'react';
import { Link } from 'wouter';
import { Container } from '@/components/ui/container';
import ThreeScene from '@/lib/3d/ThreeScene';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Home = () => {
useEffect(() => {
window.scrollTo(0, 0);
}, []);

return (
<div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
{/* 3D Animation Canvas */}
<ThreeScene className="opacity-40" />

{/* Hero Section */}
  <section id="home" className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-r from-violet-100/30 to-fuchsia-100/30">
    <Container className="relative z-10">
      <div className="flex flex-col lg:flex-row items-center">
        <motion.div 
          className="lg:w-1/2 space-y-6 mb-12 lg:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight bg-gradient-to-r from-violet-600 via-primary to-fuchsia-500 text-transparent bg-clip-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Connecting People <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Across Faiths</span> & Interests
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-dark/70 max-w-xl animate-fade-in-up"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Building bridges between communities through meaningful events, shared experiences, and authentic connections.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 pt-4 animate-fade-in-up"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild className="px-8 py-6 bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 hover:from-primary/90 hover:to-fuchsia-500/90 text-white rounded-full transition-all transform hover:scale-105 hover:rotate-1 shadow-lg shadow-primary/20">
              <Link href="/events">
                Explore Events
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </Button>
            
            <Button variant="outline" className="px-8 py-6 border-2 border-primary/20 hover:border-primary text-primary rounded-full transition-all bg-white/80 hover:bg-gradient-to-r hover:from-primary/5 hover:to-fuchsia-500/5 hover:-rotate-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Learn More
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4 pt-2 animate-fade-in-up"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex -space-x-2">
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face" alt="User" />
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face" alt="User" />
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face" alt="User" />
            </div>
            <span className="text-sm text-dark/70">Join <span className="font-medium text-primary">2,500+</span> members</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2 relative animate-float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative h-[400px] md:h-[500px] w-full">
            <motion.div 
              className="absolute top-0 right-0 md:right-12 w-[280px] md:w-[320px] h-[200px] md:h-[240px] rounded-xl overflow-hidden shadow-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=350&fit=crop" alt="Community event" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <div className="text-sm font-medium">Interfaith Gathering</div>
                <div className="text-xs opacity-80">250 attendees</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-0 left-0 md:left-12 w-[280px] md:w-[320px] h-[200px] md:h-[240px] rounded-xl overflow-hidden shadow-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 0.5, ease: "easeInOut" }}
            >
              <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=350&fit=crop" alt="Charity event" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <div className="text-sm font-medium">Charity Drive</div>
                <div className="text-xs opacity-80">120 participants</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[350px] h-[200px] md:h-[260px] rounded-xl overflow-hidden shadow-2xl"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
            >
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=350&fit=crop" alt="Social gathering" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <div className="text-sm font-medium">Community Festival</div>
                <div className="text-xs opacity-80">500+ attendees</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Container>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-light to-transparent"></div>
  </section>

  {/* Features Section */}
  <section className="py-16 bg-gradient-to-b from-white via-violet-50/30 to-fuchsia-50/30">
    <Container>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">How CommunionHub Works</h2>
        <p className="text-lg text-dark/70 max-w-2xl mx-auto">Our platform makes it easy to connect, engage, and build community across different faith traditions.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50 hover:-translate-y-1"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 font-heading">Discover Events</h3>
          <p className="text-dark/70">Find meaningful events that match your interests and beliefs from various communities.</p>
        </motion.div>
        
        {/* Feature 2 */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50 hover:-translate-y-1"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 font-heading">Connect with Others</h3>
          <p className="text-dark/70">Meet like-minded individuals and build authentic relationships in your community.</p>
        </motion.div>
        
        {/* Feature 3 */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50 hover:-translate-y-1"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 font-heading">Host Your Own</h3>
          <p className="text-dark/70">Create and manage your own events to share with the broader community.</p>
        </motion.div>
      </div>
    </Container>
  </section>

  {/* Testimonials */}
  <section className="py-16 bg-gradient-to-br from-violet-100/50 via-primary/5 to-fuchsia-100/50">
    <Container>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What Our Community Says</h2>
        <p className="text-lg text-dark/70 max-w-2xl mx-auto">Hear from members who have found connection and meaning through CommunionHub.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50 hover:-translate-y-1 hover:rotate-1"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <img src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" alt="Pranav Arya" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h4 className="font-semibold">Pranav Arya</h4>
              <p className="text-sm text-dark/60">Interfaith Coordinator</p>
            </div>
          </div>
          <p className="text-dark/80 italic">"CommunionHub has transformed how we organize our interfaith events. We've reached so many more people and built lasting connections."</p>
          <div className="mt-4 text-primary">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Testimonial 2 */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50 hover:-translate-y-1 hover:rotate-1"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center mb-4">
            <img src="https://static.vecteezy.com/system/resources/previews/056/588/160/non_2x/a-figure-wearing-a-hooded-jacket-and-reflective-goggles-sits-quietly-in-a-dimly-lit-industrial-environment-smoke-lingers-adding-to-the-mysterious-atmosphere-of-the-setting-photo.jpeg" alt="Nitish kumar" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h4 className="font-semibold">Nitish kumar</h4>
              <p className="text-sm text-dark/60">Community Member</p>
            </div>
          </div>
          <p className="text-dark/80 italic">"As someone new to the area, CommunionHub helped me find my place in the community and connect with people who share my values."</p>
          <div className="mt-4 text-primary">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </motion.div>
        
        {/* Testimonial 3 */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50 hover:-translate-y-1 hover:rotate-1"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <img src="https://thumbs.dreamstime.com/b/groupe-des-terroristes-80168719.jpg" alt="Alok" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h4 className="font-semibold">Alok</h4>
              <p className="text-sm text-dark/60">Event Organizer</p>
            </div>
          </div>
          <p className="text-dark/80 italic">"The platform is so intuitive! We've grown our charity events by 200% since we started using CommunionHub to reach the community."</p>
          <div className="mt-4 text-primary">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  </section>


  <section className="py-20 bg-gradient-to-r from-violet-600 via-primary to-fuchsia-500 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
    <Container className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Ready to Join Our Community?</h2>
      <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">Start discovering events and connecting with people who share your interests.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          asChild
          className="px-8 py-3 bg-white text-primary rounded-full font-medium transition-all hover:bg-white/90 transform hover:scale-105 shadow-lg"
        >
          <Link href="/events">
            View Events
          </Link>
        </Button>
        <Button 
          asChild
          variant="outline" 
          className="px-8 py-3 border border-white/30 hover:border-white text-white rounded-full transition-all hover:bg-white/10"
        >
          <Link href="/events">
            Explore Events
          </Link>
        </Button>
      </div>
    </Container>
  </section>
</div>
);
};

export default Home;