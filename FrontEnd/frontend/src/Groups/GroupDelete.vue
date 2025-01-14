<template>
    <div>
      <h1>Group Delete</h1>
      <p><strong>Group ID:</strong> {{ group.GroupID }}</p>
      <p><strong>Group Name:</strong> {{ group.GroupName }}</p>
      <p><strong>Coach ID:</strong> {{ group.CoachID }}</p>
      <p><strong>Member ID:</strong> {{ group.MemberID }}</p>
      <p><strong>Schedule:</strong> {{ group.Schedule }}</p>
  
      <!-- Back Button -->
      <button @click="goBack">Back</button>
  
      <!-- Delete Button -->
      <button @click="deleteGroup" style="background-color: red;">Delete Group</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'], // Receives the `id` from the route
    data() {
      return {
        groupId: this.id, // Store the `id` in a local data property
        group: {}, // Object to hold the group details
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
          const group = await response.json();
          this.group = group; // Store the fetched group data in the `group` object
        } catch (error) {
          console.error('Error fetching group details:', error);
        }
      },
      async deleteGroup() {
        try {
          const response = await fetch(`http://localhost:3306/groups/${this.groupId}`, {
            method: 'DELETE', // Set method to DELETE
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            // If deletion is successful, show a confirmation and navigate back
            alert('Group deleted successfully!');
            this.$router.go(-1); // Go back to the previous page
          } else {
            throw new Error('Failed to delete group');
          }
        } catch (error) {
          console.error('Error deleting group:', error);
          alert('Error deleting group');
        }
      },
      goBack() {
        // Navigate to the previous page in history (back button functionality)
        this.$router.go(-1);
      },
    },
  };
  </script>
  
  <style scoped>
  p {
    font-size: 1.2rem;
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
  