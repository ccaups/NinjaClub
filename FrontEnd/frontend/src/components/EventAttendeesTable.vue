<template>
  <div>
    <h1>Event Attendees</h1>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Member ID</th>
          <th>Event ID</th>
          <th>RSVP Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendee in eventAttendees" :key="attendee.EventAttendeesID">
          <td style="width: 2vh;">{{ attendee.EventAttendeesID }}</td>
          <td>{{ attendee.MemberID }}</td>
          <td>{{ attendee.EventID }}</td>
          <td>{{ attendee.RSVPStatus }}</td>
          <td style="width: 22vh;">
            <button @click="viewAttendeeByID(attendee.EventAttendeesID)">View</button>
            <button @click="editAttendeeByID(attendee.EventAttendeesID)">Edit</button>
            <button @click="deleteAttendeeByID(attendee.EventAttendeesID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Create Event Attendee Button -->
    <button id="createAttendee" @click="createEventAttendee">
      Add Event Attendee
    </button>
  </div>
</template>

<script>
export default {
  props: {
    eventAttendees: Array, // Expects an array of event attendee objects
  },
  methods: {
    viewAttendeeByID(id) {
      console.log('Viewing details for EventAttendeesID:', id);
      this.$emit('detailEventAttendee', id);
    },
    editAttendeeByID(id) {
      console.log('Editing EventAttendeesID:', id);
      this.$emit('editEventAttendee', id);
    },
    deleteAttendeeByID(id) {
      console.log('Deleting EventAttendeesID:', id);
      this.$emit('deleteEventAttendee', id);
    },
    createEventAttendee() {
      console.log('Creating a new event attendee');
      this.$router.push({ name: 'EventAttendeeCreate' });
    },
  },
};
</script>

<style scoped>
#createAttendee {
  padding: 10px 20px;
  margin-left: 0px;
  margin-top: 0.7rem;
  background-color: green;
  font-size: medium;
}
#createAttendee:hover {
  background-color: rgb(0, 92, 0);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: small;
}

button:hover {
  background-color: #0056b3;
}
</style>
