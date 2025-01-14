<template>
  <h1>Coaches</h1>
  <CoachTable :coaches="coaches" @detailCoach="detailCoach" @editCoach="editCoach" @deleteCoach="deleteCoach" />
</template>

<script>
import CoachTable from '@/components/CoachTable.vue';

export default {
  components: {
    CoachTable,
  },
  data() {
    return {
      coaches: [], // Initialize as an empty array
    };
  },
  mounted() {
    this.fetchCoaches(); // Fetch the list of coaches on component mount
  },
  methods: {
    async fetchCoaches() {
      try {
        const response = await fetch('http://localhost:3306/coaches'); // API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.coaches = await response.json(); // Populate the coaches array
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }
    },
    detailCoach(id) {
      this.$router.push({ name: 'CoachDetail', params: { id } });
      console.log('Redirecting to details for CoachID:', id);
    },
    editCoach(id) {
      this.$router.push({ name: 'CoachEdit', params: { id } });
      console.log('Redirecting to edit for CoachID:', id);
    },
    deleteCoach(id) {
      this.$router.push({ name: 'CoachDelete', params: { id } });
      console.log('Redirecting to delete for CoachID:', id);
    },
  },
};
</script>
