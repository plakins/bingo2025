import { ClientOnly } from '@/components/client-only';

import { Footer } from './footer';
import { Game } from './game';
import { Header } from './header';

export const Home = () => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center">
      <Header />
      <ClientOnly fallback={<div className="flex-1" />}>
        <Game />
      </ClientOnly>
      <Footer />
    </div>
  );
};
