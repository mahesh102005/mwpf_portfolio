import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, ImageIcon, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const photoIds = [
  "1f3XRLKQA_hYvQTpzrNeCKrmGNe8u6X_J",
  "1QHmldFZhzqchFxDH4dP4PHONkPZj9oHJ",
  "1MEF5-n3aj26A5wE0PLcGtrwfrI1A71cM",
  "1lsN8lAbqopRUl-RlZjRFje1oiczRe-Ju",
  "1QiJfVhlHihkuBsjtaxX53g6p4-bFhAC3",
  "1_JH_ixZM4jDeEQy0LhvmRmCcUe4UKLlA",
  "1Fd-2zNtEp2tw3VUN7AEpjUMnJ5A-zPjo",
  "1xWacB9P7vu0b8KVAXNMfBqZR23c-Y2Ms",
  "1A4vtfaDoZS5F6cvJeo5qVwDIeHBEG2pA",
  "1Nmpv2bfkmgdMCIUs2hSqvlHCpOIo6ERO",
  "1an1s6NqHEubmuoug3q-eAyXtyMdJk5BS",
  "10LbCS3RUuBDm2WBJlKPqaTSpjW15queh",
  "1ftwA1ZC8usqlV3edlsC3NuzokZ29NSg9",
  "1L6FgjwfOe7aFGl0gS71plKopqZrs79h_",
  "1fAQpQLxgO6khesdWcJ5vMMCdiLEfOfnL",
  "1tDbpk4KiMmTImqkUgE6uxExtaxkAw-Yx",
  "1RBmw_jmN6VRfxfPjN97PL56WYJwYW3CB",
  "1L-S-mtWvhkKw0WmPtidY4SDLTYigeHXp",
  "1zYmrOm9xWUMzYDqvadlQ9N0GZ1TRNHp4",
  "1FHon3cLMb4HLxsl1rykBXQe3aaeCpzoN",
  "1zQbBiyi34JcN7iNgyuYCw1QWvVfBGFUP",
  "191bhFYG-F5BbEFBjW4LGA-SQ6gWWdbmn",
  "13QPE-Ssffcbx2hBkMVrqaQFH6L3mE-QZ",
  "17tIiOnH-Jlw0CW02Zi_KLnwhYKHKbLAD",
  "1F6OcXLCQ0BGambWkyJiGT4D67IJtiqAu",
  "1aPhVL1teddAj9GY_fjZI9U5ijoHoUraC",
  "17zfOqSPZDA1PK0dLpcymbnm1jPhov5A6",
  "1ptDQdhUa8EtFDa1NdgJTDhUKtZtxvdbM",
  "1Tf7M1VQB_s8EzvvmHPhjE6dah-DEjlcy",
  "1oSOhZSKPJkj4DpLpjHIVPqGfhvx0lX7F",
  "1UeyHMdXF9rU2NDPlbDIjgNkK44ydQYPm",
  "18g5BEwRH3DEIAPYnQ-8ay22WaXaDfoTr",
  "1q5T5Dxsdlb8nuojgsgrQvlcPtaXcwrKd",
  "1T-bfGnzVdeOWOY2xdPlOvXURlLkg0TUM",
  "1C-rfNFhjmZ4LgYiv5G-O5m69ruONUjph",
  "1DuV_H5CTrbUmiechLvbEN1zFpe1FFpLU",
  "1R45GXR836OcTDjJi_DuvjQXg33pwtllM",
  "1kwB6tyvBWdyzd7PWoc00bjnfM9geBHmn",
  "10E8RRdGjp_E5xkRceB6XfCtMY-CSdZhQ",
  "1Ws48yVn8T-GNw1WQR7QwAoplQvh2U8vK",
  "1nzoqmRdn0tz04HtQDijorB9XSa3MLfpB",
  "1NJ8PDEiV8x82hwVBD2xRqQUmxYIHsz5g",
  "19YigKZpHfoJW1YuzjZXUk41ZklgM0QCV",
  "1kGmVg0OA4Izl6g6jmUeenwJYBr-ZaRUp",
  "1QlrfVx3id5Cgxfdm2vTIZztyOBjEEfp3",
  "12J1Lw-aH_TiF2UnpO1IGLfnNo6ACnsEl",
  "1yxEMXLr0r6NBEThETJJ5Abfzc_JjADuV",
  "15ogz0mydD12GUstTco1YcAcIBrIKU5LH",
  "1kvWkxuHZc9pMO4IC-ZJ-rWdtzIU_373t",
  "12dv_--ZA6Y41HbkujIvg3CElcO6whsoP",
  "17OQ992WHAyIq8MVD6UgXGqCy_9aZ_cOP",
  "1-HF5UIrr0Yjsqg9CLddPX7vyHK69pCI5",
  "1R6n-UOvbKMZb38s2vyqLQFzRLLTKQLr2",
  "17HLpjHjG0XM_N5tFnnKJLhXSdSA_bL81",
  "1tb9QilD1F24T93C592SNBBOnSs21jtFy",
  "1yFQIV6_t9o83eeuBG6lnS8hA-pVZYLSC",
  "1W7Un_ocZFCMorSf0C052pgfxXisb9Uv1",
  "151yN-B-RpKyrQC7TpEf4XLd7CD-4dFY0",
  "1jYfg_MxorPxXtlciA2NAgfQGS_xT49XU",
  "1W6YN7L6tkYOo_8VRFjQnbonCfbX5tUE1",
  "1Jzt8_-kHYjnFVAfzvSYj2dNCUmT1JMci",
  "1CapBvYsHwJIBNlmWf6Dy6emBTGvKQ6v6",
  "1nu8dW_JJLxpXZt_zVzFKRelB9UmbRHDb",
  "15Sb5xGjxKG-BVF7bvHjw5MhPq1B71qXL",
  "1cb6R6DNqTsm_-GagOiDx6-Xs4wHQWYnR",
  "1itd8sPhD8gllJToAtUaXH0e0mb2zosbW",
  "1JKZQQ4D6-WxQkPu-u25PvBeR88n9BoLC",
  "13RDMoXzC1UO45O6FpUxyzB8BMdFdAc8g",
  "1xbCpoLZxYCmbM0SpN1zSsVOD3uZ75YcD",
  "1ebGqvVMQElfZna_Qyfv8PLzyCTh1p077",
  "1UKAdnl-RLG508JqR_7qjyEU6rPupUna9",
  "1WrMrGkC2D1ifm-nhTfay8QbMlwDs4T9p",
  "1zQ0OqXIspeNRgn0Gk8VnIuYkkB2NfAZ2",
  "1LcSpCsuqrCCgXm0cVSty4uDnr_xryIrJ",
  "1bgC-SLATSL8O30m7ZH49RS-xE7H6nMdC",
  "1R3xH8SICCqulmWV1UW7GeTwNXSwGOukW",
  "1RMPJE6Fb11Q-Eo9wWY6Fjny5Mp7YRU6N",
  "1fquTFhFgGI3sifsv37GRfdbZrrIzefAN",
  "1ql7MOEnGdWhW4yIBE_fOTu8HIFLOLwfE",
  "1RU8W6oDtRVfsgkgkiE_msa7F3FONPnSt",
  "1iZ0JhFj0fEAHhg7Ht4gOk-CpBSwz_FdV",
  "1o4iaQTp97gr5GI2vhP6gsZw7vF3dtzlc"
];

const photos = photoIds.map((id, index) => ({
  id: index + 1,
  src: `https://drive.google.com/uc?export=view&id=${id}`,
  category: ["Wedding", "Portrait", "Event", "Celebration", "Candid"][index % 5],
  title: `Gallery Photo ${index + 1}`
}));

export function PhotoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [userStopped, setUserStopped] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextPhoto = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, []);

  const prevPhoto = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  const handleManualNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    nextPhoto();
    setIsAutoPlaying(false);
    setUserStopped(true);
  };

  const handleManualPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    prevPhoto();
    setIsAutoPlaying(false);
    setUserStopped(true);
  };

  const handleImageClick = () => {
    setIsFullScreen(true);
    setIsAutoPlaying(false);
    setUserStopped(true);
  };

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || isFullScreen) return;

    const timer = setInterval(() => {
      nextPhoto();
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, [isAutoPlaying, isFullScreen, nextPhoto]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleManualNext();
      if (e.key === "ArrowLeft") handleManualPrev();
      if (e.key === "Escape") setIsFullScreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPhoto, prevPhoto]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.2,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    })
  };

  return (
    <section id="photo" className="py-24 px-4 bg-white relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-zinc-50 to-zinc-100 opacity-80" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col items-center gap-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight"
          >
            PHOTOS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-lg mx-auto"
          >
            Capturing moments that last forever
          </motion.p>
        </div>

        {/* Main Photo Panel */}
        <motion.div 
          className="relative group w-full max-w-5xl mx-auto aspect-video rounded-[2rem] overflow-hidden bg-white/30 border-2 border-zinc-300 md:border md:border-white/50 shadow-2xl backdrop-blur-md"
          onMouseEnter={() => !userStopped && setIsAutoPlaying(false)}
          onMouseLeave={() => !userStopped && setIsAutoPlaying(true)}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Glass Overlay & Vignette */}
          <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] rounded-[2rem]" />
          
          {/* Image Slider */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={photos[currentIndex].src}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={handleImageClick}
                alt={photos[currentIndex].title}
                loading="lazy"
              />
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-0 z-30 flex items-center justify-between px-4 md:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleManualPrev}
              className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10 pointer-events-auto transition-transform hover:scale-110"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleManualNext}
              className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10 pointer-events-auto transition-transform hover:scale-110"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="flex items-end justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="pointer-events-auto text-white/80 hover:text-white hover:bg-white/10 gap-2"
                onClick={handleImageClick}
              >
                <Expand className="w-4 h-4" />
                Full Screen
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="h-12 px-8 rounded-full bg-white/80 border-zinc-200 text-zinc-900 hover:bg-white hover:text-primary backdrop-blur-md transition-all hover:scale-105 shadow-sm"
            onClick={handleManualNext}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change Photo
          </Button>
        </div>

      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 z-50 text-white/50 hover:text-white hover:bg-white/10 rounded-full h-12 w-12"
              onClick={() => setIsFullScreen(false)}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentIndex}
                  src={photos[currentIndex].src}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="max-w-full max-h-full object-contain shadow-2xl"
                />
              </AnimatePresence>
            </div>

            {/* Floating Controls Panel */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleManualPrev}
                className="text-white hover:bg-white/10 rounded-full"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              
              <div className="h-8 w-[1px] bg-white/10" />
              
              <Button
                variant="ghost"
                onClick={handleManualNext}
                className="text-white hover:bg-white/10 rounded-full px-6"
              >
                Change Photo
              </Button>

              <div className="h-8 w-[1px] bg-white/10" />

              <Button
                variant="ghost"
                size="icon"
                onClick={handleManualNext}
                className="text-white hover:bg-white/10 rounded-full"
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}