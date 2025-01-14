<template>
  <div>
    <h1>Coach Update</h1>

    <!-- Coach Update Form -->
    <form @submit.prevent="updateCoach">
      <label for="FirstName">First Name:</label>
      <input v-model="coach.FirstName" type="text" id="FirstName" required />

      <label for="LastName">Last Name:</label>
      <input v-model="coach.LastName" type="text" id="LastName" required />

      <label for="Aadress">Address:</label>
      <input v-model="coach.Aadress" type="text" id="Aadress" required />

      <label for="PhoneNumber">Phone Number:</label>
      <input v-model="coach.PhoneNumber" type="text" id="PhoneNumber" required />

      <label for="Email">Email:</label>
      <input v-model="coach.Email" type="email" id="Email" required />

      <label for="GroupID">Group ID:</label>
      <input v-model="coach.GroupID" type="number" id="GroupID" />

      <button type="submit">Update Coach</button>
    </form>

    <button @click="goBack">Back</button>
  </div>
</template>

<script>
export default {
  props: ['id'],  // Receives the `id` from the route
  data() {
    return {
      coachId: this.id,
      coach: {
        CoachID: this.id,
        FirstName: '',
        LastName: '',
        Aadress: '',  // Correct field name for the database
        PhoneNumber: '',
        Email: '',
        GroupID: null,
      },
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
        const data = await response.json();
        this.coach = data;
      } catch (error) {
        console.error('Error fetching coach details:', error);
      }
    },
    async updateCoach() {
      try {
        const response = await fetch(`http://localhost:3306/coaches/${this.coachId}`, {  // Ensure correct backend port
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.coach),  // Send the updated coach data
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        alert('Coach updated successfully');
        this.$router.go(-1);  // Go back to the previous page after successful update
      } catch (error) {
        console.error('Error updating coach:', error);
      }
    },
    goBack() {
      this.$router.go(-1);  // Go back to the previous page
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

label, input {
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
