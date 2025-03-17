import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertEventSchema } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddEventButtonProps {
  children: React.ReactNode;
}

const formSchema = insertEventSchema.extend({
  date: z.coerce.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),
  // Convert image URL to string
  image: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddEventModal = ({ children }: AddEventButtonProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const categories = [
    { id: 'religious', name: 'Religious' },
    { id: 'social', name: 'Social' },
    { id: 'charity', name: 'Charity' },
    { id: 'educational', name: 'Educational' },
    { id: 'community', name: 'Community' },
  ];

  const defaultValues: Partial<FormValues> = {
    title: '',
    date: new Date(),
    location: '',
    description: '',
    category: '',
    image: '',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      // Ensure date is a valid Date object before converting to ISO string
      let dateValue: Date;

      if (data.date instanceof Date) {
        dateValue = data.date;
      } else {
        // If it's somehow not a Date object, create one (fallback)
        dateValue = new Date(data.date);
      }

      // Prepare data for API with the validated date
      const apiData = {
        ...data,
        date: dateValue.toISOString(),
      };

      const response = await apiRequest('POST', '/api/events', apiData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Event Created!",
        description: "Your event has been successfully created.",
      });
      form.reset(defaultValues);
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create event. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    createEventMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50 shadow-xl border-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Create New Event</DialogTitle>
          <DialogClose className="absolute right-4 top-4 opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date and Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        value={field.value instanceof Date ? field.value.toISOString().slice(0, 16) : field.value || ''}
                        min={new Date().toISOString().slice(0, 16)}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.name}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your event"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input 
                        placeholder="Enter image URL for your event" 
                        {...field} 
                        className="focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                      <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 transition-all duration-300">
                        {field.value ? (
                          <img
                            src={field.value}
                            alt="Event preview"
                            className="w-full h-full object-cover transition-opacity duration-300"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94';
                            }}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p>Add an image URL to preview</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button" className="hover:bg-gray-100 transition-colors duration-200">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={createEventMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
              >
                {createEventMutation.isPending ? "Creating..." : "Create Event"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;