<template>
  <div>
    <h1>Edit Group</h1>
    <form @submit.prevent="updateGroup">
      <div>
        <label for="groupName">Group Name:</label>
        <input type="text" v-model="group.GroupName" required />
      </div>
      <div>
        <label for="schedule">Schedule:</label>
        <input type="text" v-model="group.Schedule" required />
      </div>

      <div>
        <label for="coachID">Coach:</label>
        <select v-model="group.CoachID" required>
          <option disabled value="">-- Select a Coach --</option>
          <option v-for="coach in coaches" :key="coach.CoachID" :value="coach.CoachID">
            {{ coach.FirstName }} {{ coach.LastName }}
          </option>
        </select>
      </div>

      <div>
        <label for="memberID">Member:</label>
        <select v-model="group.MemberID" required>
          <option disabled value="">-- Select a Member --</option>
          <option v-for="member in members" :key="member.MemberID" :value="member.MemberID">
            {{ member.FirstName }} {{ member.LastName }}
          </option>
        </select>
      </div>

      <button type="submit">Save Changes</button>
    </form>
    <button @click="goBack">Cancel</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      group: {
        GroupID: null,
        CoachID: null,
        MemberID: null,
        GroupName: '',
        Schedule: '',
      },
      members: [], // List of members
      coaches: [], // List of coaches
    };
  },
  async created() {
    // Fetch group details by ID and populate the form
    await this.fetchGroupDetails();
    await this.fetchMembers();
    await this.fetchCoaches();
  },
  methods: {
    async fetchGroupDetails() {
      try {
        const response = await fetch(`http://localhost:3306/groups/${this.$route.params.id}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched group:', data);
          this.group = data; // Populate form with group data
        } else {
          console.error('Failed to fetch group details');
        }
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    },
    async fetchMembers() {
      try {
        const response = await fetch('http://localhost:3306/members');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched members:', data);
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
          console.log('Fetched coaches:', data);
          this.coaches = data;
        } else {
          console.error('Failed to fetch coaches');
        }
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }
    },
    async updateGroup() {
      try {
        const response = await fetch(`http://localhost:3306/groups/${this.group.GroupID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.group),
        });

        if (response.ok) {
          alert('Group updated successfully!');
          this.$router.push('/groups'); // Redirect to the groups list
        } else {
          const errorDetails = await response.json();
          console.error('Server error:', errorDetails);
          throw new Error(`Failed to update group. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error updating group:', error.message);
        alert('Error updating group: ' + error.message);
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
