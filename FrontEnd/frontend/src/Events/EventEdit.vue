<template>
  <div>
    <h1>Event Update</h1>

    <!-- Event Update Form -->
    <form @submit.prevent="updateEvent">
      <label for="Name">Event Name:</label>
      <input v-model="event.Name" type="text" id="Name" required />

      <label for="CoachID">Coach ID:</label>
      <input v-model="event.CoachID" type="number" id="CoachID" required />

      <label for="Date">Date:</label>
      <input v-model="event.Date" type="date" id="Date" required />

      <label for="Location">Location:</label>
      <input v-model="event.Location" type="text" id="Location" required />

      <label for="Description">Description:</label>
      <textarea v-model="event.Description" id="Description" rows="4"></textarea>

      <button type="submit">Update Event</button>
    </form>

    <button @click="goBack">Back</button>
  </div>
</template>

<script>
export default {
  props: ['id'], // Receives the `id` from the route
  data() {
    return {
      eventId: this.id,
      event: {
        EventID: this.id,
        Name: '',
        CoachID: '',
        Date: '',
        Location: '',
        Description: '',
      },
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
          throw new Error('Failed to fetch event details.');
        }
        const data = await response.json();
        this.event = data;
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    },
    async updateEvent() {
      try {
        const response = await fetch(`http://localhost:3306/events/${this.eventId}`, {
          method: 'PUT', // HTTP method for update
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.event), // Send the updated event data
        });
        if (!response.ok) {
          throw new Error('Failed to update event.');
        }
        alert('Event updated successfully!');
        this.$router.go(-1); // Go back to the previous page
      } catch (error) {
        console.error('Error updating event:', error);
      }
    },
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

label, input, textarea {
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
