import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MembersView from '../views/MembersView.vue';
import CoachesView from '../views/CoachesView.vue';
import AboutView from '../views/AboutView.vue';
import GroupsView from '../views/GroupsView.vue';
import EventsView from '../views/EventsView.vue';
import EventAttendeesView from '../views/EventAttendeesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/members',
      name: 'members',
      component: MembersView,
    },
    {
      path: '/members/:id',  // Path for member details
      name: 'MemberDetail',
      component: () => import('@/Members/MemberDetail.vue'),
      props: true,
    },
    {
      path: '/members/create', // Path for create member
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
      path: '/groups',
      name: 'groups',
      component: GroupsView,
    },
    {
      path: '/groups/create', // Path for updating group
      name: 'GroupCreate',
      component: () => import('@/Groups/GroupCreate.vue'),
    },
    {
      path: '/groups/:id',  // Path for member details
      name: 'GroupDetail',
      component: () => import('@/Groups/GroupDetail.vue'),
      props: true,
    },
    {
      path: '/groups/edit/:id',  // Path for updating member
      name: 'GroupEdit',
      component: () => import('@/Groups/GroupEdit.vue'),
      props: true,
    },
    {
      path: '/groups/delete/:id',  // Path for deleting member
      name: 'GroupDelete',
      component: () => import('@/Groups/GroupDelete.vue'),
      props: true,
    },

    {
      path: '/coaches',
      name: 'coaches',
      component: CoachesView,
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
      path: '/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/events/:id',  // Path for event details
      name: 'EventDetail',
      component: () => import('@/Events/EventDetail.vue'),
      props: true,
    },
    {
      path: '/events/create',  // Path for creating a new event
      name: 'EventCreate',
      component: () => import('@/Events/EventCreate.vue'),
    },
    {
      path: '/events/edit/:id',  // Path for updating an event
      name: 'EventEdit',
      component: () => import('@/Events/EventEdit.vue'),
      props: true,
    },
    {
      path: '/events/delete/:id',  // Path for deleting an event
      name: 'EventDelete',
      component: () => import('@/Events/EventDelete.vue'),
      props: true,
    },
    {
      path: '/eventattendees',
      name: 'eventattendees',
      component: EventAttendeesView,
    },
    {
      path: '/eventattendees/:id',  // Path for event attendee details
      name: 'EventAttendeeDetail',
      component: () => import('@/EventAttendees/EventAttendeeDetail.vue'),
      props: true,
    },
    {
      path: '/eventattendees/create',  // Path for creating a new event attendee
      name: 'EventAttendeeCreate',
      component: () => import('@/EventAttendees/EventAttendeeCreate.vue'),
    },
    {
      path: '/eventattendees/edit/:id',  // Path for updating an event attendee
      name: 'EventAttendeeEdit',
      component: () => import('@/EventAttendees/EventAttendeeEdit.vue'),
      props: true,
    },
    {
      path: '/eventattendees/delete/:id',  // Path for deleting an event attendee
      name: 'EventAttendeeDelete',
      component: () => import('@/EventAttendees/EventAttendeeDelete.vue'),
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
