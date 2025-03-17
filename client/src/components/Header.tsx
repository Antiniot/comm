import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, logoutMutation } = useAuth();

  const closeMenu = () => setIsOpen(false);
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-primary h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden transition-transform hover:scale-105 duration-300">
            <img
              src="https://www.shutterstock.com/shutterstock/photos/1890637207/display_1500/stock-vector-abstract-people-symbol-togetherness-and-community-concept-design-creative-hub-social-connection-1890637207.jpg"
              alt="CommunionHub Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold font-heading text-black hover:opacity-80 transition-opacity duration-300">CommunionHub</span>
        </Link>

        {/* Mobile Nav Toggle */}
        <button 
          className="lg:hidden text-dark"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link 
            href="/" 
            className={`nav-link ${location === '/' ? 'text-primary font-medium' : 'text-dark/70 hover:text-primary transition-colors'}`}
          >
            Home
          </Link>
          <Link 
            href="/events" 
            className={`nav-link ${location === '/events' ? 'text-primary font-medium' : 'text-dark/70 hover:text-primary transition-colors'}`}
          >
            Events
          </Link>
          <Link 
            href="/about" 
            className={`nav-link ${location === '/about' ? 'text-primary font-medium' : 'text-dark/70 hover:text-primary transition-colors'}`}
          >
            About
          </Link>
          <Link 
            href="/community" 
            className={`nav-link ${location === '/community' ? 'text-primary font-medium' : 'text-dark/70 hover:text-primary transition-colors'}`}
          >
            Community
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs opacity-70">
                  Logged in as {user.username}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth">
                <Button variant="ghost" className="px-4 py-2">
                  Log in
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-full transition-all transform hover:scale-105">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white absolute w-full left-0 top-full shadow-md p-4 transition-all duration-300 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className={`nav-link py-2 ${location === '/' ? 'text-primary font-medium' : 'text-dark/70 hover:text-primary'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={`nav-link py-2 ${location === '/events' ? 'text-primary font-medium' : 'text-dark/70 hover:text-primary'}`}
              onClick={closeMenu}
            >
              Events
            </Link>
            <Link
              href="/about"
              className={`nav-link py-2 ${location === '/about' ? 'text-primary font-medium' : 'text-dark/70 hover:text-primary'}`}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              href="/community"
              className={`nav-link py-2 ${location === '/community' ? 'text-primary font-medium' : 'text-dark/70 hover:text-primary'}`}
              onClick={closeMenu}
            >
              Community
            </Link>
            <hr className="border-gray-200" />
            {user ? (
              <>
                <div className="flex items-center py-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.username}</span>
                </div>
                <Button 
                  onClick={handleLogout} 
                  variant="outline" 
                  className="justify-start text-left rounded-lg py-3 transition-all"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth" onClick={closeMenu}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left rounded-lg py-3 transition-all"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/auth" onClick={closeMenu}>
                  <Button 
                    className="w-full justify-start text-left bg-primary hover:bg-primary/90 text-white rounded-lg py-3 transition-all"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
