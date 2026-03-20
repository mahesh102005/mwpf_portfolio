import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export function FormSection() {
  const submitContact = useMutation(api.contacts.submit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    state: "",
    message: "",
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.state) {
      newErrors.state = "Please select a state";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
  ];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Submit to Convex (Database)
      await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        state: formData.state,
        message: formData.message.trim(),
        type: "booking",
      });

      // 2. Submit to Google Sheets
      try {
        const scriptURL = "scrip";
        
        // The script expects a JSON string in the body with specific keys
        const sheetData = {
          fullname: formData.name,
          email: formData.email,
          mobile: formData.phone,
          service: formData.service,
          state: formData.state,
          message: formData.message
        };

        await fetch(scriptURL, {
          method: "POST",
          body: JSON.stringify(sheetData),
          mode: "no-cors", // Required for Google Apps Script webhooks to avoid CORS errors
          headers: {
            "Content-Type": "text/plain;charset=utf-8", // Send as text to avoid preflight, script parses JSON
          },
        });
      } catch (sheetError) {
        console.error("Google Sheets submission failed:", sheetError);
        // Continue execution even if sheets fails
      }

      // 3. Submit to Web3Forms (Email)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "21bc3102-255e-4051-a954-57fa6f74d9c4",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          state: formData.state,
          message: formData.message,
          subject: `New Inquiry from ${formData.name} - MWP Glass`,
          from_name: "MWP Glass Website",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          state: "",
          message: "",
        });
        setErrors({});
      } else {
        console.error("Web3Forms error:", result);
        // Still show success if DB save worked, but maybe warn or just log
        toast.success("Request saved! (Email notification may be delayed)");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="form" className="py-20 bg-white relative overflow-hidden">
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
                    src="/assets/logo-form.png" 
                    alt="MWP Logo" 
                    className="w-10 h-10 object-contain"
                 />
              </div>
              <h2 className="text-2xl font-bold mb-1 uppercase tracking-wide">MAULI WEDDING PHOTOGRAPHY AND FILMS</h2>
              <p className="text-white/70 text-sm">We capture amazing moments worldwide.</p>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-primary blur-[100px]" />
            </div>
          </div>

          <div className="p-8 pt-2">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">Full Name</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Enter your full name" 
                  className={`h-12 bg-white ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email Address</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address" 
                  className={`h-12 bg-white ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="font-medium">Mobile Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your mobile number" 
                  className={`h-12 bg-white ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-medium">Service</Label>
                    <Select 
                      value={formData.service} 
                      onValueChange={(val) => handleSelectChange("service", val)}
                    >
                      <SelectTrigger className={`h-12 bg-white ${errors.service ? "border-red-500 focus:ring-red-500" : ""}`}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding-photo-video">Wedding Photography & Videography</SelectItem>
                        <SelectItem value="wedding-cinematic">Wedding Cinematic</SelectItem>
                        <SelectItem value="pre-wedding">Pre-Wedding photo Shoot</SelectItem>
                        <SelectItem value="maternity">Maternity Photoshoot</SelectItem>
                        <SelectItem value="birthday">Birthday Photography</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service && <p className="text-red-500 text-xs">{errors.service}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">State</Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(val) => handleSelectChange("state", val)}
                    >
                      <SelectTrigger className={`h-12 bg-white ${errors.state ? "border-red-500 focus:ring-red-500" : ""}`}>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                            {state}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                  </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="font-medium">Message (Optional)</Label>
                <Textarea 
                    id="message"
                    name="message"
                    placeholder="Any specific requirements?" 
                    className="min-h-[80px] bg-white resize-none" 
                    value={formData.message}
                    onChange={handleChange}
                />
              </div>

              <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium bg-black hover:bg-black/90 text-white rounded-lg mt-4"
                  disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
