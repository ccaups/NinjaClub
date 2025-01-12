<template>
    <div>
      <h1>Members</h1>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.MemberID">
            <td>{{ member.MemberID }}</td>
            <td>{{ member.FirstName }}</td>
            <td>{{ member.LastName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MembersView',
    data() {
      return {
        members: [],
      };
    },
    mounted() {
      this.fetchMembers();
    },
    methods: {
      async fetchMembers() {
        try {
          const response = await fetch('http://localhost:3306/members'); // Assuming your backend endpoint is at this URL
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          this.members = await response.json();
        } catch (error) {
          console.error('Error fetching members:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>