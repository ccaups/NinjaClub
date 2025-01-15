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
        <label for="coachID">Coach:</label>
          <select v-model="newGroup.CoachID" required>
            <option disabled value="">-- Select a Coach --</option> <!-- Placeholder -->
            <option v-for="coach in coaches" :key="coach.CoachID" :value="coach.CoachID">
            {{ coach.FirstName }} {{ coach.LastName }}
            </option>
        </select>
      </div>

      <div>
        <label for="memberID">Member:</label>
          <select v-model="newGroup.MemberID" required>
            <option disabled value="">-- Select a Member --</option> <!-- Placeholder -->
            <option v-for="member in members" :key="member.MemberID" :value="member.MemberID">
            {{ member.FirstName }} {{ member.LastName }}
            </option>
          </select>
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
        GroupID: 1,  // Default values can be adjusted
        CoachID: 1,
        MemberID: 1,
        GroupName: '',
        Schedule: '',
      },
      members: [], // List of members
      coaches: [], // List of coaches
    };
  },
    async created() {
      // Fetch the list of members and coaches from the server when the component is created
      await this.fetchMembers();
      await this.fetchCoaches();
    },
    methods: {
      async fetchMembers() {
    try {
      const response = await fetch('http://localhost:3306/members');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched members:', data); // Logi andmed, et kontrollida
        this.members = data;
      } else {
        console.error('Failed to fetch members');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  },

    async fetchCoaches() {
      try {
        const response = await fetch('http://localhost:3306/coaches');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched coaches:', data); // Logi andmed, et kontrollida
          this.coaches = data; // Store coaches in the data property
        } else {
          console.error('Failed to fetch coaches');
        }
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }
    },
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
          const errorDetails = await response.json();
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
  max-width: none;
  margin: auto;
}

div {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input,
select {
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
