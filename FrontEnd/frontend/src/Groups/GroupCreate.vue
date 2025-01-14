<template>
    <div>
      <h1>Create Group</h1>
      <form @submit.prevent="createNewGroup">
        <div>
          <label for="groupName">Group Name:</label>
          <input type="text" v-model="newGroup.GroupName" required />
        </div>
        <div>
          <label for="schedule">Schedule:</label>
          <input type="text" v-model="newGroup.Schedule" required />
        </div>
        <div>
          <label for="groupID">Group ID:</label>
          <input type="number" v-model="newGroup.GroupID" required />
        </div>
        <div>
          <label for="coachID">Coach ID:</label>
          <input type="number" v-model="newGroup.CoachID" required />
        </div>
        <div>
          <label for="memberID">Member ID:</label>
          <input type="number" v-model="newGroup.MemberID" required />
        </div>
        <button type="submit">Create Group</button>
      </form>
      <button @click="goBack">Cancel</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newGroup: {
          GroupID: 1,       // Default values can be adjusted
          CoachID: 1,
          MemberID: 1,
          GroupName: '',
          Schedule: '',
        },
      };
    },
    methods: {
      async createNewGroup() {
        try {
          const response = await fetch('http://localhost:3306/groups', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.newGroup),
          });
  
          if (response.ok) {
            alert('Group created successfully!');
            this.$router.go(-1);
          } else {
            const errorDetails = await response.json(); // Optional: Log server error if available
            console.error('Server error:', errorDetails);
            throw new Error(`Failed to create group. Status: ${response.status}`);
          }
        } catch (error) {
          console.error('Error creating group:', error.message);
          alert('Error creating group: ' + error.message);
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
  