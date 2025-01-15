<template>
    <div>
      <h1>Member Update</h1>
      
      <!-- Member Update Form -->
      <form @submit.prevent="updateMember">
        <label for="FirstName">First Name:</label>
        <input v-model="member.FirstName" type="text" id="FirstName" required />
  
        <label for="LastName">Last Name:</label>
        <input v-model="member.LastName" type="text" id="LastName" required />
  
        <label for="Address">Address:</label>
        <input v-model="member.Address" type="text" id="Address" required />
  
        <label for="PhoneNumber">Phone Number:</label>
        <input v-model="member.PhoneNumber" type="text" id="PhoneNumber" required />
  
        <label for="Email">Email:</label>
        <input v-model="member.Email" type="email" id="Email" required />
  
        <label for="RegistrationDate">Registration Date:</label>
        <input v-model="member.RegistrationDate" type="date" id="RegistrationDate" required />
  
        <!-- <label for="Active">Active:</label>
        <input v-model="member.Active" type="checkbox" id="Active" />
  
        <label for="Level">Level:</label>
        <input v-model="member.Level" type="number" id="Level" required /> -->

        <div style="font-size: medium;padding: 5px;">
          <label for="Level">Level Type :</label>
          <select v-model="member.Level" type="number" id="Level" required style="margin-left: 20px; padding: 6px;">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
        </div>

        <div style="font-size: medium;padding: 5px;">
          <label for="Active">Active :</label>
          <select v-model="member.Active" type="checkbox" id="Active" style="margin-left: 20px; padding: 6px;">
            <option value="1">Yes</option>
            <option value="0">No</option>
            </select>
        </div>


  
        <button type="submit">Update Member</button>
      </form>
  
      <button @click="goBack">Back</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'], // Receives the `id` from the route
    data() {
      return {
        memberId: this.id,
        member: {
          MemberID: this.id,
          FirstName: '',
          LastName: '',
          Address: '',
          PhoneNumber: '',
          Email: '',
          RegistrationDate: '',
          Active: true,
          Level: 1,
        },
      };
    },
    mounted() {
      this.fetchMemberDetails();
    },
    methods: {
      async fetchMemberDetails() {
        try {
          const response = await fetch(`http://localhost:3306/members/${this.memberId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          this.member = data;
        } catch (error) {
          console.error('Error fetching member details:', error);
        }
      },
      async updateMember() {
        try {
          const response = await fetch(`http://localhost:3306/members/${this.memberId}`, {
            method: 'PUT', // HTTP method for update
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.member), // Send the updated member data
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Optionally, you can handle success or show a confirmation message here
          alert('Member updated successfully');
          this.$router.go(-1);
          // this.$router.push('/'); // Redirect back to the home page after successful update


        } catch (error) {
          console.error('Error updating member:', error);
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
  