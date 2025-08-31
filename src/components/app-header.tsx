import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { AnimatedCounter } from '@/components/animated-counter';
import { Button } from '@/components/ui/button';

type AppHeaderProps = {
  totalPoints: number;
};

export default function AppHeader({ totalPoints }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight text-primary font-headline">
            Finance Daily
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-lg font-bold text-primary">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <AnimatedCounter value={totalPoints} />
            <span className="text-sm font-medium">Points</span>
          </div>
          <Button asChild>
            <Link href="/publish">Publish App</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
