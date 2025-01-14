<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>CoachID</th>
          <th>MemberID</th>
          <th>GroupName</th>
          <th>Schedule</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.GroupID">
          <td>{{ group.GroupID }}</td>
          <td>{{ group.CoachID }}</td>
          <td>{{ group.MemberID }}</td>
          <td>{{ group.GroupName }}</td>
          <td>{{ group.Schedule }}</td>
          <td>
            <button @click="handleAction(group.GroupID, 'view')">View</button>
            <button @click="handleAction(group.GroupID, 'edit')">Edit</button>
            <button @click="handleAction(group.GroupID, 'delete')">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Create Group Button -->
    <button id="createGroup" @click="createGroup">Create Group</button>
  </div>
</template>

<script>
export default {
  props: {
    groups: Array, // Expects an array of group objects
  },
  methods: {
    handleAction(id, action) {
      console.log(`${action} GroupID:`, id);
      this.$emit(`${action}Group`, id);  // Emit custom events based on action
    },
    createGroup() {
      console.log('Creating a new Group');
      this.$router.push({ name: 'GroupCreate' }); // Redirect to the Create Group page
    },
  },
};
</script>

<style scoped>
#createGroup {
  margin-left: 0px;
  margin-top: 0.7rem;
  background-color: green;
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
