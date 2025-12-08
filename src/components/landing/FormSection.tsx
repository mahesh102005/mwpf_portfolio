import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function FormSection() {
  const submitContact = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await submitContact({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        type: "booking",
      });
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Book a Session</h2>
          <p className="text-muted-foreground">Ready to start your project? Fill out the form below.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium ml-1 text-white">Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                  className="bg-white/5 border-white/10 focus:border-primary/50 h-12 rounded-xl text-white placeholder:text-white/30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium ml-1 text-white">Email</label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required 
                  className="bg-white/5 border-white/10 focus:border-primary/50 h-12 rounded-xl text-white placeholder:text-white/30"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium ml-1 text-white">Message</label>
              <Textarea 
                id="message" 
                name="message" 
                placeholder="Tell me about your project..." 
                required 
                className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[150px] rounded-xl resize-none text-white placeholder:text-white/30"
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-12 rounded-xl text-lg font-bold bg-primary text-black hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>Send Message <Send className="ml-2 w-4 h-4" /></>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
