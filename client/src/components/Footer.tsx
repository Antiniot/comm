import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-white h-10 w-10 rounded-full bg-primary/80 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l8 4.5a1 1 0 01.095 1.693l-8 7a1 1 0 01-1.182 0l-8-7a1 1 0 01.095-1.693l8-4.5zM10 15.54l7.066-6.183L10 5.478 2.934 9.357 10 15.54z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M9.417 1.415a1 1 0 011.166 0l8 5.5A1 1 0 0119 7.5v8a1 1 0 01-1 1h-6a1 1 0 01-1-1v-5h-2v5a1 1 0 01-1 1H2a1 1 0 01-1-1v-8a1 1 0 01.417-.585l8-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold font-heading text-white">CommunionHub</span>
            </div>
            <p className="text-white/70 mb-6">
              Connecting people across faiths and interests through meaningful events and authentic community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/70 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-white/70 mb-4">
              Subscribe to get updates on events and community news.
            </p>
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-l-lg w-full border-0 focus:ring-0"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 px-4 rounded-r-lg border-0">
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-white/70">&copy; {new Date().getFullYear()} CommunionHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
