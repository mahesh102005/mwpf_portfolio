import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", 
  "Lakshadweep", "Puducherry"
];

export function FormSection() {
  const submitContact = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    state: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (formData.name.length < 2) throw new Error("Name is too short");
      if (!formData.email.includes("@")) throw new Error("Invalid email address");
      if (formData.phone.length < 10) throw new Error("Invalid phone number");
      if (!formData.service) throw new Error("Please select a service");

      await submitContact({
        ...formData,
        type: "booking"
      });

      toast.success("Request submitted successfully!", {
        description: "We'll get back to you shortly."
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        state: "",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to submit request", {
        description: error instanceof Error ? error.message : "Please try again later"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-zinc-50 to-zinc-100 opacity-80" />
      
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-100"
        >
          {/* Header */}
          <div className="bg-black p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 mx-auto bg-white rounded-full p-1 mb-6">
                <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                MAULI WEDDING PHOTOGRAPHY AND FILMS
              </h2>
              <p className="text-zinc-400">
                We capture amazing moments worldwide.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-12 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-900">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-900">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-zinc-900">Mobile Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-zinc-900">Service</Label>
                  <Select 
                    value={formData.service} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
                  >
                    <SelectTrigger className="bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-primary/50 focus:ring-primary/20">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding Photography</SelectItem>
                      <SelectItem value="pre-wedding">Pre-Wedding Shoot</SelectItem>
                      <SelectItem value="cinematography">Cinematography</SelectItem>
                      <SelectItem value="candid">Candid Photography</SelectItem>
                      <SelectItem value="drone">Drone Services</SelectItem>
                      <SelectItem value="album">Album Designing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-900">State</Label>
                  <Select 
                    value={formData.state} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger className="bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-primary/50 focus:ring-primary/20">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-zinc-900">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Any specific requirements?"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="min-h-[100px] bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-black hover:bg-zinc-900 text-white text-lg font-medium transition-all hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}