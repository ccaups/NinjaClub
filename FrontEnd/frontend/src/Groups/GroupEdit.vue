<template>
  <div>
    <h1>Edit Group</h1>
    <form @submit.prevent="editGroup">
      <div>
        <label for="groupName">Group Name:</label>
        <input v-model="group.GroupName" type="text" id="groupName" required />
      </div>
      <div>
        <label for="schedule">Schedule:</label>
        <input v-model="group.Schedule" type="text" id="schedule" required />
      </div>
      <button type="submit">Save Changes</button>
    </form>
    <button @click="goBack">Cancel</button>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      group: {
        GroupName: '',
        Schedule: '',
      },
    };
  },
  mounted() {
    this.fetchGroup();
  },
  methods: {
    async fetchGroup() {
      try {
        const response = await fetch(`http://localhost:3306/grouptraining/${this.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch group');
        }
        this.group = await response.json();
      } catch (error) {
        console.error('Error fetching group:', error);
      }
    },
    async editGroup() {
  try {
    const response = await fetch(`http://localhost:3306/grouptraining/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.group),
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to update group: ${errorDetails}`);
    }
    alert('Group updated successfully!');
    this.$router.push('/grouptraining');
  } catch (error) {
    console.error('Error updating group:', error.message);
  },
},

</script>
