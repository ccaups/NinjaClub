<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coach in coaches" :key="coach.CoachID">
          <td style="width:2vh;">{{ coach.CoachID }}</td>
          <td>{{ coach.FirstName }}</td>
          <td>{{ coach.LastName }}</td>
          <td style="width:22vh;">
            <button @click="viewCoachByID(coach.CoachID)">View</button>
            <button @click="editCoachByID(coach.CoachID)">Edit</button>
            <button @click="deleteCoachByID(coach.CoachID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Create Coach Button -->
    <button id="createCoach" @click="createCoach">Create Coach</button>
  </div>
</template>

<script>
export default {
  props: {
    coaches: Array, // Expects an array of coach objects
  },
  methods: {
    viewCoachByID(id) {
      console.log('Viewing details for CoachID:', id);
      this.$emit('detailCoach', id);
    },
    editCoachByID(id) {
      console.log('Editing details for CoachID:', id);
      this.$emit('editCoach', id);
    },
    deleteCoachByID(id) {
      console.log('Deleting CoachID:', id);
      this.$emit('deleteCoach', id);
    },
    createCoach() {
      console.log('Creating a new coach');
      this.$router.push({ name: 'CoachCreate' });
    },
  },
};
</script>

<style scoped>
#createCoach {
  padding: 10px 20px;
    margin-left: 0px;
    margin-top:0.7rem;
    background-color: green;
    font-size:medium;
}
#createCoach:hover{
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
}

button:hover {
  background-color: #0056b3;
}
</style>
