<template>
  <div>
    <h1>Member Details</h1>
    <p><strong>Member ID:</strong> {{ member.MemberID }}</p>
    <p><strong>First Name:</strong> {{ member.FirstName }}</p>
    <p><strong>Last Name:</strong> {{ member.LastName }}</p>
    <p><strong>Address:</strong> {{ member.Address }}</p>
    <p><strong>Phone Number:</strong> {{ member.PhoneNumber }}</p>
    <p><strong>Email:</strong> {{ member.Email }}</p>
    <p><strong>Registration Date:</strong> {{ member.RegistrationDate }}</p>
    <p><strong>Status:</strong> {{ member.Active ? 'Active' : 'Inactive' }}</p>
    <p><strong>Level:</strong> {{ member.Level }}</p>

    <!-- Back Button -->
    <button @click="goBack">Back</button>

    <!-- Delete Button -->
    <button @click="deleteMember" style="background-color: red;">Delete Member</button>
  </div>
</template>

<script>
export default {
  props: ['id'],  // Receives the `id` from the route
  data() {
    return {
      memberId: this.id,  // Store the `id` in a local data property
      member: {},  // Object to hold the member details
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
        const member = await response.json();
        this.member = member;  // Store the fetched member data in the `member` object
      } catch (error) {
        console.error('Error fetching member details:', error);
      }
    },
    async deleteMember() {
      try {
        const response = await fetch(`http://localhost:3306/members/${this.memberId}`, {
          method: 'DELETE',  // Set method to DELETE
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // If deletion is successful, show a confirmation and navigate back
          alert('Member deleted successfully!');
          this.$router.go(-1); // Go back to the previous page
        } else {
          throw new Error('Failed to delete member');
        }
      } catch (error) {
        console.error('Error deleting member:', error);
        alert('Error deleting member');
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
