import { useEffect, useRef } from 'react';
import { Container } from '@/components/ui/container';
import * as THREE from 'three';
import { gsap } from 'gsap';

const AboutPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  
  // Initialize Three.js animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, 300);
    
    // Create floating orbs that represent different faiths
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const colors = [
      new THREE.Color(0x4F46E5), // indigo
      new THREE.Color(0x3B82F6), // blue
      new THREE.Color(0x10B981), // emerald
      new THREE.Color(0xF59E0B), // amber
      new THREE.Color(0xEF4444), // red
    ];
    
    const orbs: THREE.Mesh[] = [];
    
    for (let i = 0; i < 10; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.7,
      });
      
      const orb = new THREE.Mesh(geometry, material);
      // Random positions
      orb.position.x = Math.random() * 20 - 10;
      orb.position.y = Math.random() * 10 - 5;
      orb.position.z = Math.random() * 10 - 15;
      orb.userData = {
        speedX: Math.random() * 0.02 - 0.01,
        speedY: Math.random() * 0.02 - 0.01,
        speedZ: Math.random() * 0.02 - 0.01,
      };
      
      scene.add(orb);
      orbs.push(orb);
    }
    
    camera.position.z = 5;
    
    // Animate the scene
    const animate = () => {
      requestAnimationFrame(animate);
      
      orbs.forEach(orb => {
        orb.position.x += orb.userData.speedX;
        orb.position.y += orb.userData.speedY;
        orb.position.z += orb.userData.speedZ;
        
        // Bounce off invisible boundaries
        if (Math.abs(orb.position.x) > 10) orb.userData.speedX *= -1;
        if (Math.abs(orb.position.y) > 5) orb.userData.speedY *= -1;
        if (Math.abs(orb.position.z) > 15) orb.userData.speedZ *= -1;
        
        orb.rotation.x += 0.005;
        orb.rotation.y += 0.005;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / 300;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 300);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Clean up
      orbs.forEach(orb => {
        geometry.dispose();
        (orb.material as THREE.Material).dispose();
      });
      
      renderer.dispose();
    };
  }, []);
  
  // Text animation with GSAP
  useEffect(() => {
    if (!animationRef.current) return;
    
    gsap.from(animationRef.current.querySelectorAll('.animate-text'), {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: animationRef.current,
        start: 'top 80%',
      }
    });
    
    gsap.from(animationRef.current.querySelectorAll('.animate-fade'), {
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: animationRef.current,
        start: 'top 70%',
      }
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with animation */}
      <div className="relative overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 h-[300px] w-full" 
          style={{ zIndex: 0 }}
        />
        <div className="relative pt-20 pb-16 text-center z-10">
          <Container>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              About CommunionHub
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
              Connecting communities across faiths, cultures, and backgrounds
            </p>
          </Container>
        </div>
      </div>
      
      {/* Main content */}
      <Container>
        <div ref={animationRef} className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-8 animate-text">Our Mission</h2>
            <p className="text-lg mb-6 animate-text">
              CommunionHub was founded with a simple yet powerful mission: to create a space where people from different faiths, cultures, and backgrounds can come together in understanding and mutual respect.
            </p>
            <p className="text-lg mb-12 animate-text">
              In today's increasingly divided world, we believe that building bridges between communities is more important than ever. Our platform facilitates meaningful interactions through events, educational resources, and community initiatives.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-card rounded-xl p-6 shadow-sm animate-fade">
                <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 mt-0.5">•</div>
                    <span>Respect for diverse beliefs and traditions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 mt-0.5">•</div>
                    <span>Open dialogue and active listening</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 mt-0.5">•</div>
                    <span>Community-driven initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 mt-0.5">•</div>
                    <span>Inclusivity and accessibility</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-sm animate-fade">
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="mb-4">
                  We envision a world where differences are celebrated, where communities support each other, and where dialogue leads to better understanding.
                </p>
                <p>
                  Through CommunionHub, we're working to make this vision a reality—one event, one conversation, and one connection at a time.
                </p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold font-heading mb-8 animate-text">Our Team</h2>
            <p className="text-lg mb-12 animate-text">
              CommunionHub is powered by a diverse team of dedicated individuals who share a passion for community building. Coming from various backgrounds, faiths, and professional experiences, our team brings unique perspectives to our mission.
            </p>
            
            <div className="text-center mb-8 animate-fade">
              <blockquote className="text-xl italic border-l-4 border-primary pl-4 py-2">
                "The beauty of CommunionHub lies not just in the events we host, but in the connections that form when people of different backgrounds gather in the spirit of understanding."
              </blockquote>
              <p className="mt-4 font-medium">— Founder, CommunionHub</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;