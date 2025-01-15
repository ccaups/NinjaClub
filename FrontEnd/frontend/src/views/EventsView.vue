<template>
  <h1>Events</h1>
  <EventTable :events="events" @detailEvent="detailEvent" @editEvent="editEvent" @deleteEvent="deleteEvent" />
</template>

<script>
import EventTable from '@/components/EventsTable.vue';

export default {
  components: {
    EventTable,
  },
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await fetch('http://localhost:3306/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.events = await response.json();
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    detailEvent(id) {
      this.$router.push({ name: 'EventDetail', params: { id } });
      console.log('Redirecting to details for EventID:', id);
    },
    editEvent(id) {
      this.$router.push({ name: 'EventEdit', params: { id } });
      console.log('Redirecting to edit for EventID:', id);
    },
    deleteEvent(id) {
      this.$router.push({ name: 'EventDelete', params: { id } });
      console.log('Redirecting to delete for EventID:', id);
    },
  },
};
</script>
