import { Navbar } from "@/components/Navbar";
import { AboutSection } from "@/components/landing/AboutSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { FormSection } from "@/components/landing/FormSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PhotoSection } from "@/components/landing/PhotoSection";
import { VideoSection } from "@/components/landing/VideoSection";
import { useEffect } from "react";

export default function Landing() {
  return (
    <div className="min-h-screen font-sans text-foreground selection:bg-primary/30 bg-black overflow-x-hidden">
      <Navbar />

      <HeroSection />

      <PhotoSection />

      <VideoSection />

      <AboutSection />

      <FormSection />

      <ContactSection />
    </div>
  );
}