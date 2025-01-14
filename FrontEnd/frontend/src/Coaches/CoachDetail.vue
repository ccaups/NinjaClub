<template>
  <div>
    <h1>Coach Details</h1>
    <p><strong>Coach ID:</strong> {{ coach.CoachID }}</p>
    <p><strong>First Name:</strong> {{ coach.FirstName }}</p>
    <p><strong>Last Name:</strong> {{ coach.LastName }}</p>
    <p><strong>Address:</strong> {{ coach.Aadress }}</p>
    <p><strong>Phone Number:</strong> {{ coach.PhoneNumber }}</p>
    <p><strong>Email:</strong> {{ coach.Email }}</p>
    <p><strong>Group ID:</strong> {{ coach.GroupID }}</p>

    <!-- Back Button -->
    <button @click="goBack">Back</button>
  </div>
</template>

<script>
export default {
  props: ['id'], // Receives the `id` from the route
  data() {
    return {
      coachId: this.id, // Store the `id` in a local data property
      coach: {}, // Object to hold the coach details
    };
  },
  mounted() {
    this.fetchCoachDetails();
  },
  methods: {
    async fetchCoachDetails() {
      try {
        const response = await fetch(`http://localhost:3306/coaches/${this.coachId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const coach = await response.json();
        this.coach = coach; // Store the fetched coach data in the `coach` object
      } catch (error) {
        console.error('Error fetching coach details:', error);
      }
    },
    goBack() {
      // Navigates to the previous page in history (back button functionality)
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

p {
  font-size: 1.2rem;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

button {
  margin: 25px 0px;
  padding: 10px 75px;
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
