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
      component: () => import('@/Members/MemberDetail.vue'),
      props: true,
    },
    {
      path: '/members/create',
      name: 'MemberCreate',
      component: () => import('@/Members/MemberCreate.vue'),
    },
    {
      path: '/members/edit/:id',  // Path for updating member
      name: 'MemberEdit',
      component: () => import('@/Members/MemberEdit.vue'),
      props: true,
    },
    {
      path: '/members/delete/:id',  // Path for deleting member
      name: 'MemberDelete',
      component: () => import('@/Members/MemberDelete.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',  // Catch-all route for not found pages
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
    {
      path: '/coaches/:id',  // Path for coach details
      name: 'CoachDetail',
      component: () => import('@/Coaches/CoachDetail.vue'),
      props: true,
    },
    {
      path: '/coaches/create',
      name: 'CoachCreate',
      component: () => import('@/Coaches/CoachCreate.vue'),
    },
    {
      path: '/coaches/edit/:id',  // Path for updating coach
      name: 'CoachEdit',
      component: () => import('@/Coaches/CoachEdit.vue'),
      props: true,
    },
    {
      path: '/coaches/delete/:id',  // Path for deleting coach
      name: 'CoachDelete',
      component: () => import('@/Coaches/CoachDelete.vue'),
      props: true,
    },
    {
      path: '/grouptraining/:id',
      name: 'GroupDetail',
      component: () => import('@/Groups/GroupDetail.vue'),
      props: true,
    },
    {
      path: '/grouptraining/create',
      name: 'GroupCreate',
      component: () => import('@/Groups/GroupCreate.vue'),
    },
    {
      path: '/grouptraining/edit/:id',
      name: 'GroupEdit',
      component: () => import('@/Groups/GroupEdit.vue'),
      props: true,
    },
    {
      path: '/grouptraining/delete/:id',
      name: 'GroupDelete',
      component: () => import('@/Groups/GroupDelete.vue'),
      props: true,
    },
  ],
});

export default router;
