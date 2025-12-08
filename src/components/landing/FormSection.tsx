import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  service: z.string().min(1, { message: "Please select a service." }),
  state: z.string().optional(),
  message: z.string().optional(),
});

export function FormSection() {
  const submitContact = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      state: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await submitContact({
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: values.service,
        state: values.state,
        message: values.message || "",
        type: "booking",
      });
      toast.success("Request submitted successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="form" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-background rounded-2xl shadow-xl overflow-hidden border border-border/50"
        >
          {/* Header Section */}
          <div className="bg-black text-white p-8 text-center relative overflow-hidden m-4 rounded-xl">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
                 <img 
                    src="https://harmless-tapir-303.convex.cloud/api/storage/12f3af3e-9161-4b2f-bfd5-081de370261e" 
                    alt="MWP Logo" 
                    className="w-10 h-10 object-contain"
                 />
              </div>
              <h2 className="text-2xl font-bold mb-1">MWP Glass</h2>
              <p className="text-white/70 text-sm">We capture amazing moments worldwide.</p>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-primary blur-[100px]" />
            </div>
          </div>

          <div className="p-8 pt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" className="h-12 bg-muted/20" {...field} />
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
                      <FormLabel className="font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" type="email" className="h-12 bg-muted/20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your mobile number" type="tel" className="h-12 bg-muted/20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Service</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-muted/20">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="wedding">Wedding Photography</SelectItem>
                              <SelectItem value="pre-wedding">Pre-Wedding Shoot</SelectItem>
                              <SelectItem value="event">Event Coverage</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-muted/20">
                                <SelectValue placeholder="Select your state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="maharashtra">Maharashtra</SelectItem>
                              <SelectItem value="delhi">Delhi</SelectItem>
                              <SelectItem value="karnataka">Karnataka</SelectItem>
                              <SelectItem value="gujarat">Gujarat</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                            placeholder="Any specific requirements?" 
                            className="min-h-[80px] bg-muted/20 resize-none" 
                            {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-medium bg-black hover:bg-black/90 text-white rounded-lg mt-4"
                    disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}