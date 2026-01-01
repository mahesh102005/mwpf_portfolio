// ...
      <Suspense fallback={<div className="h-screen w-full bg-white md:bg-black flex items-center justify-center"><Spinner size="lg" className="text-black md:text-white" /></div>}>
        <PhotoSection />
      </Suspense>
</initial_code>

<edits_to_apply>
// ... keep existing code (imports)
import { Spinner } from "@/components/ui/spinner";

// ... keep existing code (desktopHeroImages and mobileHeroImages arrays)

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
// ...

</edits_to_apply>