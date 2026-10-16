import { createFileRoute } from '@tanstack/react-router';
import { DashboardPage } from './dashboard';

export const Route = createFileRoute('/admin')({
  head: () => ({
    meta: [{ title: 'لوحة التحكم | Roussi Mode' }],
  }),
  component: DashboardPage,
});
