import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertUserSchema } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";

// Extend the schema to add validation
const loginSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

// Only include the fields that are in the database schema
const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { user, loginMutation, registerMutation } = useAuth();

  // Login form
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  // Register form
  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: ""
    }
  });

  // Handle login form submission
  const onLoginSubmit = (data: LoginValues) => {
    loginMutation.mutate(data);
  };

  // Handle register form submission
  const onRegisterSubmit = (data: RegisterValues) => {
    const { confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
  };

  // If user is already logged in, redirect to home
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary/5 via-white to-background">
      {/* Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-gradient-to-br from-white via-white/98 to-white/95 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Welcome to CommunionHub</CardTitle>
            <CardDescription>
              Connect with different faith communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="login" 
              value={activeTab} 
              onValueChange={(v) => setActiveTab(v as "login" | "register")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full mt-6"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Choose a username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Create a password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full mt-6"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            {activeTab === "login" ? (
              <div className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <Button variant="link" className="p-0" onClick={() => setActiveTab("register")}>
                  Register
                </Button>
              </div>
            ) : (
              <div className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Button variant="link" className="p-0" onClick={() => setActiveTab("login")}>
                  Login
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
      
      {/* Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 flex-col justify-center p-12 relative">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-6">Join Our Diverse Community</h1>
          <p className="text-lg mb-8">
            CommunionHub brings together people of different faiths to learn from each other, 
            celebrate diversity, and build stronger communities through shared events and experiences.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Find Events</h3>
              <p className="text-sm">
                Discover interfaith gatherings, community service opportunities, and educational workshops.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Connect with Others</h3>
              <p className="text-sm">
                Meet people from diverse backgrounds and faith traditions in your community.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Share Perspectives</h3>
              <p className="text-sm">
                Exchange ideas and learn about different spiritual practices and beliefs.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Create Community</h3>
              <p className="text-sm">
                Help build a more inclusive and understanding society through meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;