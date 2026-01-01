import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { Suspense, lazy } from "react";

// Lazy load below-the-fold sections to improve initial load time
const AboutSection = lazy(() => import("@/components/landing/AboutSection").then(module => ({ default: module.AboutSection })));
const ContactSection = lazy(() => import("@/components/landing/ContactSection").then(module => ({ default: module.ContactSection })));
const FormSection = lazy(() => import("@/components/landing/FormSection").then(module => ({ default: module.FormSection })));
const PhotoSection = lazy(() => import("@/components/landing/PhotoSection").then(module => ({ default: module.PhotoSection })));
const VideoSection = lazy(() => import("@/components/landing/VideoSection").then(module => ({ default: module.VideoSection })));

export default function Landing() {
  return (
    <div className="min-h-screen font-sans text-foreground selection:bg-primary/30 bg-white md:bg-black overflow-x-hidden">
      <Navbar />

      <HeroSection />

      <Suspense fallback={<div className="h-screen w-full bg-white md:bg-black flex items-center justify-center"></div>}>
        <PhotoSection />
      </Suspense>

      <Suspense fallback={<div className="h-screen w-full bg-white md:bg-black flex items-center justify-center"></div>}>
        <VideoSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[50vh] w-full bg-white md:bg-black flex items-center justify-center"></div>}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[50vh] w-full bg-white md:bg-black flex items-center justify-center"></div>}>
        <FormSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[20vh] w-full bg-white md:bg-black flex items-center justify-center"></div>}>
        <ContactSection />
      </Suspense>
    </div>
  );
}