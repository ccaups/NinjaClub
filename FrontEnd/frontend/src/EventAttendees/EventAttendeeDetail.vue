<template>
  <div>
    <h1>Event Attendee Details</h1>
    <p><strong>Event Attendee ID:</strong> {{ eventAttendee.EventAttendeesID }}</p>
    <p><strong>Member ID:</strong> {{ eventAttendee.MemberID }}</p>
    <p><strong>Event ID:</strong> {{ eventAttendee.EventID }}</p>
    <p><strong>RSVP Status:</strong> {{ eventAttendee.RSVPStatus }}</p>

    <!-- Back Button -->
    <button @click="goBack">Back</button>
  </div>
</template>

<script>
export default {
  props: ['id'], // Receives the `id` from the route
  data() {
    return {
      eventAttendeeId: this.id, // Store the `id` in a local data property
      eventAttendee: {}, // Object to hold the event attendee details
    };
  },
  mounted() {
    this.fetchEventAttendeeDetails();
  },
  methods: {
    async fetchEventAttendeeDetails() {
      try {
        const response = await fetch(`http://localhost:3306/eventattendees/${this.eventAttendeeId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const eventAttendee = await response.json();
        this.eventAttendee = eventAttendee; // Store the fetched event attendee data in the `eventAttendee` object
      } catch (error) {
        console.error('Error fetching event attendee details:', error);
      }
    },
    goBack() {
      // Navigates to the previous page in history (back button functionality)
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
p {
  font-size: 1.2rem;
}

button {
  margin: 25px 0;
  padding: 10px 75px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
