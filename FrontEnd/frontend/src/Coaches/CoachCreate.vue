<template>
  <div>
    <h1>Create Coach</h1>
    <form @submit.prevent="createNewCoach">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" v-model="newCoach.FirstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" v-model="newCoach.LastName" required />
      </div>
      <div>
        <label for="address">Address:</label>
        <input type="text" v-model="newCoach.Address" required />
      </div>
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" v-model="newCoach.PhoneNumber" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="newCoach.Email" required />
      </div>
      <!-- <div>
        <label for="groupId">Group ID:</label>
        <input type="number" v-model="newCoach.GroupID" min="1" />
      </div> -->

      <button type="submit">Create Coach</button>
    </form>
    <button @click="goBack">Cancel</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCoach: {
        FirstName: '',
        LastName: '',
        Address: '',
        PhoneNumber: '',
        Email: '',
      },
    };
  },
  methods: {
    async createNewCoach() {
      try {
        const response = await fetch('http://localhost:3306/coaches', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newCoach),
        });

        if (response.ok) {
          alert('Coach created successfully!');
          this.$router.go(-1); // Go back to the previous page
        } else {
          alert('Failed to create coach');
        }
      } catch (error) {
        console.error('Error creating coach:', error);
        alert('Error creating coach');
      }
    },
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
}

div {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
}

button {
  margin-top: 20px;
  padding: 10px 50px;
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
