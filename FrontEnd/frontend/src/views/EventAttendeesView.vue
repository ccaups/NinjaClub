<template>

  <EventAttendeeTable :eventAttendees="eventAttendees" @detailEventAttendee="detailEventAttendee" @editEventAttendee="editEventAttendee" @deleteEventAttendee="deleteEventAttendee" />
</template>

<script>
import EventAttendeeTable from '@/components/EventAttendeesTable.vue';

export default {
  components: {
    EventAttendeeTable,
  },
  data() {
    return {
      eventAttendees: [],
    };
  },
  mounted() {
    this.fetchEventAttendees();
  },
  methods: {
    async fetchEventAttendees() {
      try {
        const response = await fetch('http://localhost:3306/eventattendees');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.eventAttendees = await response.json();
      } catch (error) {
        console.error('Error fetching event attendees:', error);
      }
    },
    detailEventAttendee(id) {
      this.$router.push({ name: 'EventAttendeeDetail', params: { id } });
      console.log('Redirecting to details for EventAttendeeID:', id);
    },
    editEventAttendee(id) {
      this.$router.push({ name: 'EventAttendeeEdit', params: { id } });
      console.log('Redirecting to edit for EventAttendeeID:', id);
    },
    deleteEventAttendee(id) {
      this.$router.push({ name: 'EventAttendeeDelete', params: { id } });
      console.log('Redirecting to delete for EventAttendeeID:', id);
    },
  },
};
</script>
