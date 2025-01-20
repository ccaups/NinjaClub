<template>
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createNewEvent">
      <div>
        <label for="name">Event Name:</label>
        <input type="text" v-model="newEvent.Name" required />
      </div>
      <div>
        <label for="coachId">Coach ID:</label>
        <input type="number" v-model="newEvent.CoachID" required />
      </div>
      <div>
        <label for="date">Date:</label>
        <input type="date" v-model="newEvent.Date" id="Date" required />
      </div>
      <div>
        <label for="location">Location:</label>
        <input type="text" v-model="newEvent.Location" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="newEvent.Description"></textarea>
      </div>
      <button type="submit">Create Event</button>
    </form>
    <button @click="goBack">Cancel</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newEvent: {
        Name: '',
        CoachID: '',
        Date: '',
        Location: '',
        Description: '',
      },
    };
  },
  methods: {
    async createNewEvent() {
      try {
        const response = await fetch('http://localhost:3306/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newEvent),
        });

        if (response.ok) {
          alert('Event created successfully!');
          this.$router.go(-1);
        } else {
          const errorDetails = await response.json(); // Log server error if available
          console.error('Server error:', errorDetails);
          alert('Failed to create event');
        }
      } catch (error) {
        console.error('Error creating event:', error.message);
        alert('Error creating event: ' + error.message);
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
  max-width: none;
  margin: auto;
}

div {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
}

button {
  margin-top: 20px;
  padding: 10px 50px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

textarea {
  resize: vertical;
  min-height: 80px;
}
</style>
