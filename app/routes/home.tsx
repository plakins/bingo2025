import { Home } from '@/views/home';

import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'BINGO 2025' },
    { name: 'description', content: 'Бинго по новогоднему обращению Путина 2025' },
  ];
}

export default function HomeRoute() {
  return <Home />;
}
