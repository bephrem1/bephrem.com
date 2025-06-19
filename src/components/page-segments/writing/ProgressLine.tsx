import { useEffect, useState } from 'react';
import { Progress } from '../../shared/shadcn/components/ui/progress';

const ProgressLine = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setProgress(Math.min(progress, 100));
    };

    // Calculate initial progress
    calculateProgress();

    // Add scroll listener
    window.addEventListener('scroll', calculateProgress);

    // Cleanup
    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);

  const opacity = progress < 5 ? 0 :
    progress > 95 ? 0 : 1;

  return (
    <div>
      <Progress
        value={progress}
        className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent transition-opacity duration-300"
        style={{ opacity }}
        indicatorStyle={{
          backgroundColor: 'rgb(163 163 163)', // neutral-400 in Tailwind
          transition: 'all 50ms'
        }}
      />
      <div
        className="fixed top-2 left-4 z-50 text-neutral-500 font-mono hidden md:block transition-opacity duration-300 select-none"
        style={{ opacity, fontSize: '0.65rem' }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default ProgressLine;
