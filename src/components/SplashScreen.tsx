import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center gradient-eco transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center space-y-6 px-4 animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold text-white animate-glow">
          DREAMCLEAN
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-light">
          Let's Dream Together for a Cleaner Tomorrow
        </p>
        <div className="mt-8 space-y-2 text-white/80 text-sm">
          <p>Created by Vivek Singh & Mansi Somani</p>
          <p>Directed by Dr. Anil Pawar</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
