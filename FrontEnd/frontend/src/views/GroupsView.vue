<template>
  <h1>Groups</h1>
  <GroupTable :groups="groups" @viewGroup="viewGroup" @editGroup="editGroup" @deleteGroup="deleteGroup" />
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
    this.fetchGroups();
  },
  methods: {
    async fetchGroups() {
      try {
        const response = await fetch('http://localhost:3306/groups/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.groups = await response.json();
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    },
    viewGroup(id) {
    // Ensure that the route name is correctly defined in your router configuration
    this.$router.push({ name: 'GroupDetail', params: { id } });
    console.log('Redirecting to details for GroupID:', id);
    },
    editGroup(id) {
      // Ensure that the route name is correctly defined in your router configuration
      this.$router.push({ name: 'GroupEdit', params: { id } });
      console.log('Redirecting to edit for GroupID:', id);
    },
    deleteGroup(id) {
      // Ensure that the route name is correctly defined in your router configuration
      this.$router.push({ name: 'GroupDelete', params: { id } });
      console.log('Redirecting to delete for GroupID:', id);
    },
  },
};
</script>