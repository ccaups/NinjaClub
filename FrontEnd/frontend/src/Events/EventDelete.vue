<template>
  <div>
    <h1>Event Details</h1>
    <p><strong>Event ID:</strong> {{ event.EventID }}</p>
    <p><strong>Coach ID:</strong> {{ event.CoachID }}</p>
    <p><strong>Name:</strong> {{ event.Name }}</p>
    <p><strong>Date:</strong> {{ event.Date }}</p>
    <p><strong>Location:</strong> {{ event.Location }}</p>
    <p><strong>Description:</strong> {{ event.Description }}</p>

    <!-- Back Button -->
    <button @click="goBack">Back</button>

    <!-- Delete Button -->
    <button @click="deleteEvent" style="background-color: red;">Delete Event</button>
  </div>
</template>

<script>
export default {
  props: ['id'], // Receives the `id` from the route
  data() {
    return {
      eventId: this.id, // Store the `id` in a local data property
      event: {}, // Object to hold the event details
    };
  },
  mounted() {
    this.fetchEventDetails();
  },
  methods: {
    async fetchEventDetails() {
      try {
        const response = await fetch(`http://localhost:3306/events/${this.eventId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const event = await response.json();
        this.event = event; // Store the fetched event data in the `event` object
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    },
    async deleteEvent() {
      try {
        const response = await fetch(`http://localhost:3306/events/${this.eventId}`, {
          method: 'DELETE', // Set method to DELETE
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // If deletion is successful, show a confirmation and navigate back
          alert('Event deleted successfully!');
          this.$router.go(-1); // Go back to the previous page
        } else {
          throw new Error('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event');
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
.table {
  width: 100%;
  border-collapse: collapse;
}

p {
  font-size: 1.2rem;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

button {
  margin: 25px 0px;
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
