<template>
    <div>
      <h1>Group Edit</h1>
  
      <!-- Group Update Form -->
      <form @submit.prevent="updateGroup">
        <label for="GroupName">Group Name:</label>
        <input v-model="group.GroupName" type="text" id="GroupName" required />
  
        <label for="CoachID">Coach ID:</label>
        <input v-model="group.CoachID" type="text" id="CoachID" required />
  
        <label for="MemberID">Member ID:</label>
        <input v-model="group.MemberID" type="text" id="MemberID" required />
  
        <label for="Schedule">Schedule:</label>
        <input v-model="group.Schedule" type="text" id="Schedule" required />
  
        <button type="submit">Update Group</button>
      </form>
  
      <button @click="goBack">Back</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'], // Receives the `id` from the route
    data() {
      return {
        groupId: this.id,
        group: {
          GroupID: this.id,
          GroupName: '',
          CoachID: '',
          MemberID: '',
          Schedule: '',
        },
      };
    },
    mounted() {
      this.fetchGroupDetails();
    },
    methods: {
      async fetchGroupDetails() {
        try {
          const response = await fetch(`http://localhost:3306/groups/${this.groupId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          this.group = data;
        } catch (error) {
          console.error('Error fetching group details:', error);
        }
      },
      async updateGroup() {
        try {
          const response = await fetch(`http://localhost:3306/groups/${this.groupId}`, {
            method: 'PUT', // HTTP method for update
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.group), // Send the updated group data
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Optionally, you can handle success or show a confirmation message here
          alert('Group updated successfully');
          this.$router.go(-1);
        } catch (error) {
          console.error('Error updating group:', error);
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
  }
  
  label,
  input {
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
  ``
  