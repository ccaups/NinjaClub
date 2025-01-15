<template>
  <div>
    <h1>Edit Event Attendee</h1>

    <!-- Event Attendee Edit Form -->
    <form @submit.prevent="updateEventAttendee">
      <label for="MemberID">Member ID:</label>
      <input v-model="eventAttendee.MemberID" type="number" id="MemberID" required />

      <label for="EventID">Event ID:</label>
      <input v-model="eventAttendee.EventID" type="number" id="EventID" required />

      <button type="submit">Update Event Attendee</button>
    </form>

    <button @click="goBack">Back</button>
  </div>
</template>

<script>
export default {
  props: ['id'], // Receives the `id` from the route
  data() {
    return {
      eventAttendeeId: this.id,
      eventAttendee: {
        EventAttendeesID: this.id,
        MemberID: '',
        EventID: '',
      },
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
        const data = await response.json();
        this.eventAttendee = data;
      } catch (error) {
        console.error('Error fetching event attendee details:', error);
      }
    },
    async updateEventAttendee() {
      try {
        const response = await fetch(`http://localhost:3306/eventattendees/${this.eventAttendeeId}`, {
          method: 'PUT', // HTTP method for update
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.eventAttendee), // Send the updated event attendee data
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        alert('Event Attendee updated successfully');
        this.$router.go(-1); // Go back to the previous page
      } catch (error) {
        console.error('Error updating event attendee:', error);
        alert('Failed to update event attendee');
      }
    },
    goBack() {
      this.$router.go(-1); // Navigate to the previous page
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  margin-bottom: 15px;
  padding: 8px;
  font-size: 1rem;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
