<template>
  <h1>Groups</h1>
  <GroupTable :groups="groups" @detailGroup="detailGroup" @editGroup="editGroup" @deleteGroup="deleteGroup" />
</template>

<script>
import GroupTable from '@/components/GroupTable.vue';

export default {
  components: {
    GroupTable,
  },
  data() {
    return {
      groups: [],
    };
  },
  mounted() {
    this.fetchGroups();  // Fetch groups when the component is mounted
  },
  methods: {
    async fetchGroups() {
      try {
        const response = await fetch('http://localhost:3306/grouptraining');  // Adjust the API URL as needed
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Network response was not ok: ${errorDetails}`);
        }
        this.groups = await response.json();
      } catch (error) {
        console.error('Error fetching groups:', error.message);
      }
    }, // <-- Fixed missing comma here

    detailGroup(id) {
      this.$router.push({ name: 'GroupDetail', params: { id } });
      console.log('Redirecting to details for GroupID:', id);
    },
    editGroup(id) {
      this.$router.push({ name: 'GroupEdit', params: { id } });
      console.log('Redirecting to edit for GroupID:', id);
    },
    deleteGroup(id) {
      this.$router.push({ name: 'GroupDelete', params: { id } });
      console.log('Redirecting to delete for GroupID:', id);
    },
  },
};
</script>
