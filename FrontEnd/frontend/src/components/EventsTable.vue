<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Event ID</th>
          <th>Coach ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Location</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.EventID">
          <td>{{ event.EventID }}</td>
          <td>{{ event.CoachID }}</td>
          <td>{{ event.Name }}</td>
          <td>{{ event.Date }}</td>
          <td>{{ event.Location }}</td>
          <td>{{ event.Description }}</td>
          <td>
            <button @click="$emit('detailEvent', event.EventID)">Details</button>
            <button @click="$emit('editEvent', event.EventID)">Edit</button>
            <button @click="$emit('deleteEvent', event.EventID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Create Event Button -->
    <button id="createEvent" @click="createEvent">Create Event</button>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  methods: {
    createEvent() {
      console.log('Creating a new event');
      this.$router.push({ name: 'EventCreate' }); // Redirect to the Create Event page
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
