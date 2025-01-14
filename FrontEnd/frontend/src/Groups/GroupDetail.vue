<template>
  <div>
    <h1>Group Details</h1>
    <p><strong>Group ID:</strong> {{ group.GroupID }}</p>
    <p><strong>Group Name:</strong> {{ group.GroupName }}</p>
    <p><strong>Schedule:</strong> {{ group.Schedule }}</p>
    <button @click="goBack">Back</button>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      group: {}, // Holds the group details
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
          const errorDetails = await response.text();
          throw new Error(`Failed to fetch group details: ${errorDetails}`);
        }
        this.group = await response.json();
      } catch (error) {
        console.error('Error fetching group details:', error.message);
      }
    },
    goBack() {
      this.$router.go(-1); // Navigates back to the previous page
    },
  },
};
</script>
