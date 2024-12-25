import { Header } from './Header';
import { Game } from './game/game';

export const Main = () => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center">
      <Header />
      <Game />
    </div>
  );
};
