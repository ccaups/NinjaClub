<template>
  <div>
    <h1>Create Member</h1>
    <form @submit.prevent="createNewMember">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" v-model="newMember.FirstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" v-model="newMember.LastName" required />
      </div>
      <div>
        <label for="address">Address:</label>
        <input type="text" v-model="newMember.Address" required />
      </div>
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" v-model="newMember.PhoneNumber" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="newMember.Email" required />
      </div>
      <div>
        <label for="registrationDate">Registration Date:</label>
        <input type="date" v-model="newMember.RegistrationDate" id="RegistrationDate" placeholder="DD.MM.YYYY" required />
      </div>
      <!-- <div>
        <label for="level">Level:</label>
        <input type="number" v-model="newMember.Level" min="1" max="10" required />
      </div> -->
      <div style="font-size: medium;">
          <label for="newMember.Level">Level Type :</label>
          <select v-model="newMember.Level" style="margin-left: 20px; padding: 6px;">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
        </div>
      <!-- <div>
        <label for="checkbox" style=";">Active: {{ newMember.Active }}</label>
        <input type="checkbox" id="checkbox" v-model="newMember.Active"/>
      </div> -->
      <div style="font-size: medium;">
          <label for="newMember.Active">Active :</label>
          <select v-model="newMember.Active" style="margin-left: 20px; padding: 6px;">
            <option value="1">Yes</option>
            <option value="0">No</option>
            </select>
        </div>

      <button type="submit">Create Member</button>
    </form>
    <button @click="goBack">Cancel</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMember: {
        FirstName: '',
        LastName: '',
        Address: '',
        PhoneNumber: '',
        Email: '',
        RegistrationDate: '',
        Active: true, // Default active status
        Level: 1,     // Default level (can be adjusted)
      },
    };
  },
  methods: {
    async createNewMember() {
      try {
        const response = await fetch('http://localhost:3306/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newMember),
        });

        if (response.ok) {
          alert('Member created successfully!');
          this.$router.go(-1)
        //   this.$router.push({ name: 'MemberTable' }); // Redirect back to the Member Table
        } else {
          alert('Failed to create member');
        }
      } catch (error) {
        console.error('Error creating member:', error);
        alert('Error creating member');
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
  max-width: none;
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



<!-- async createNewMember() {
    try {
      const response = await fetch('http://localhost:3306/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newMember),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json(); // Log server error if available
        console.error('Server error:', errorDetails);
        throw new Error(`Failed to create member. Status: ${response.status}`);
      }
  
      alert('Member created successfully!');
      this.$router.push({ name: 'MemberTable' }); // Redirect back to the Member Table
    } catch (error) {
      console.error('Error creating member:', error.message);
      alert('Error creating member: ' + error.message);
    }
  } -->
  