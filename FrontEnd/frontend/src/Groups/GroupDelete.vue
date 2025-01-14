<template>
  <div>
    <h1>Delete Group</h1>
    <p>Are you sure you want to delete the group "{{ group.GroupName }}"?</p>
    <button @click="deleteGroup">Yes, Delete</button>
    <button @click="goBack">Cancel</button>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      group: {},
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
    async deleteGroup() {
      try {
        const response = await fetch(`http://localhost:3306/grouptraining/${this.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Group deleted successfully!');
          this.$router.push('/groups');
        } else {
          throw new Error('Failed to delete group');
        }
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
