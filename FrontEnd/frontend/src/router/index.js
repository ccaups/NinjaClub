import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MembersView from '../views/MembersView.vue';
import CoachesView from '../views/CoachesView.vue';
import AboutView from '../views/AboutView.vue';
import GroupsView from '../views/GroupsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/members',
      name: 'members',
      component: MembersView,
    },
    {
      path: '/coaches',
      name: 'coaches',
      component: CoachesView,
    },
    {
      path: '/groups',
      name: 'groups',
      component: GroupsView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/members/:id',  // Path for member details
      name: 'MemberDetail',
      component: () => import('@/views/MemberDetail.vue'),
      props: true,
    },
    {
      path: '/members/create',
      name: 'MemberCreate',
      component: () => import('@/views/MemberCreate.vue'),
    },
    {
      path: '/members/update/:id',  // Path for updating member
      name: 'MemberUpdate',
      component: () => import('@/views/MemberUpdate.vue'),
      props: true,
    },
    {
      path: '/members/delete/:id',  // Path for deleting member
      name: 'MemberDelete',
      component: () => import('@/views/MemberDelete.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',  // Catch-all route for not found pages
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

export default router;
