<template>
  <header id="headertop"> 
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/members">Members</RouterLink>
    <RouterLink to="/coaches">Coaches</RouterLink>
    <RouterLink to="/groups">Groups</RouterLink>
    <RouterLink to="/events">Events</RouterLink>
    <RouterLink to="/eventattendees">Event Attendees</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </header>

  <main style="margin-top: 250px;"> 
    <RouterView /> 
  </main>

  <footer> 

  </footer>
</template>

<script>
import './assets/navigation.css';
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink,
    RouterView,
  },
}
</script>