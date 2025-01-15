<template>
  <div>
    <h1>Create Event Attendee</h1>
    <form @submit.prevent="createNewEventAttendee">
      <div>
        <label for="memberId">Member ID:</label>
        <input type="number" v-model="newEventAttendee.MemberID" id="memberId" required />
      </div>
      <div>
        <label for="eventId">Event ID:</label>
        <input type="number" v-model="newEventAttendee.EventID" id="eventId" required />
      </div>
      <div>
        <label for="rsvpStatus">RSVP Status:</label>
        <select v-model="newEventAttendee.RSVPStatus" id="rsvpStatus" required>
          <option value="" disabled>Please select</option>
          <option value="Accepted">Accepted</option>
          <option value="Declined">Declined</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <button type="submit">Create Event Attendee</button>
    </form>
    <button @click="goBack">Cancel</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newEventAttendee: {
        MemberID: null, // Default value
        EventID: null,  // Default value
        RSVPStatus: "", // Default value for RSVP Status
      },
    };
  },
  methods: {
    async createNewEventAttendee() {
      try {
        const response = await fetch('http://localhost:3306/eventattendees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newEventAttendee),
        });

        if (response.ok) {
          alert('Event Attendee created successfully!');
          this.$router.go(-1); // Go back to the previous page
        } else {
          const errorDetails = await response.json();
          alert(`Failed to create event attendee: ${errorDetails.error}`);
        }
      } catch (error) {
        console.error('Error creating event attendee:', error.message);
        alert('Error creating event attendee');
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

input, select {
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
</style>
