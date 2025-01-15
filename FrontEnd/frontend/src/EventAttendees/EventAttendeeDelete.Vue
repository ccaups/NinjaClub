<template>
  <div>
    <h1>Event Attendee Details</h1>
    <p><strong>Event Attendee ID:</strong> {{ eventAttendee.EventAttendeesID }}</p>
    <p><strong>Member ID:</strong> {{ eventAttendee.MemberID }}</p>
    <p><strong>Event ID:</strong> {{ eventAttendee.EventID }}</p>

    <!-- Back Button -->
    <button @click="goBack">Back</button>

    <!-- Delete Button -->
    <button @click="deleteEventAttendee" style="background-color: red;">Delete Event Attendee</button>
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
        this.eventAttendee = eventAttendee; // Store the fetched event attendee data
      } catch (error) {
        console.error('Error fetching event attendee details:', error);
      }
    },
    async deleteEventAttendee() {
      try {
        const response = await fetch(`http://localhost:3306/eventattendees/${this.eventAttendeeId}`, {
          method: 'DELETE', // Set method to DELETE
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // If deletion is successful, show a confirmation and navigate back
          alert('Event attendee deleted successfully!');
          this.$router.go(-1); // Go back to the previous page
        } else {
          throw new Error('Failed to delete event attendee');
        }
      } catch (error) {
        console.error('Error deleting event attendee:', error);
        alert('Error deleting event attendee');
      }
    },
    goBack() {
      // Navigate to the previous page in history (back button functionality)
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
