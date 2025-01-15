<template>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>CoachID</th>
            <th>MemberID</th>
            <th>GroupName</th>
            <th>Schedule</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groups" :key="groups.GroupID">
            <td style="width:2vh;">{{ group.GroupID }}</td>
            <td>{{ group.CoachID }}</td>
            <td>{{ group.MemberID }}</td>
            <td>{{ group.GroupName }}</td>
            <td>{{ group.Schedule }}</td>
            <td style="width:22vh;">
              <button @click="viewGroupByID(group.GroupID)">View</button>
              <button @click="editGroupByID(group.GroupID)">Edit</button>
              <button @click="deleteGroupByID(group.GroupID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
          <!-- Create Member Button -->
          <button id="createGroup" @click="createGroup">
        Create Group
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      groups: Array, // Expects an array of member objects
    },
    methods: {
      viewGroupByID(id) {
        console.log('Viewing details for GroupID:', id);
        this.$emit('viewGroup', id);
      },
      editGroupByID(id) {
        console.log('Viewing edit for GroupID:', id);
        this.$emit('editGroup', id);
      },
      deleteGroupByID(id) {
        console.log('Viewing delete for GroupID:', id);
        this.$emit('deleteGroup', id);
      },
      createGroup() {
        // Trigger logic to create a new Group
        console.log('Creating a new Group');
        this.$router.push({ name: 'GroupCreate' }); // Redirect to the Create Member page
      },
    },
  };
  </script>
  
  <style scoped>
  #createGroup{
    padding: 10px 20px;
    margin-left: 0px;
    margin-top:0.7rem;
    background-color: green;
    font-size:medium;
  
  }
  #createGroup:hover{
  background-color: rgb(0, 92, 0);
}

  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
  }
  
  button {
    margin: 0 5px;
    padding: 5px 10px;
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
  
  
  
  <!-- 
  <template>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members" :key="member.MemberID">
          <td>{{ member.MemberID }}</td>
          <td>{{ member.FirstName }}</td>
          <td>{{ member.LastName }}</td>
          <td>
            Detail and Update buttons
            <button @click="viewMemberByID(member.MemberID)">View</button>
            <button @click="updateMemberByID(member.MemberID)">Update</button>
            <button @click="deleteMemberByID(member.MemberID)">Delete</button>
            
            <button @click="handleMemberAction(member.MemberID, 'detail')">View</button>
            <button @click="handleMemberAction(member.MemberID, 'update')">Update</button>
            <button @click="handleMemberAction(member.MemberID, 'delete')">Delete</button>
  
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      members: Array, // Expects an array of member objects
    },
    methods: {
      viewMemberByID(id) {
        // Trigger detail view logic
        console.log('Viewing details for MemberID:', id);
        // Emit the event for parent component to handle
        this.$emit('detailMember', id);
      },
      updateMemberByID(id) {
        // Trigger detail view logic
        console.log('Viewing update for MemberID:', id);
        // Emit the event for parent component to handle
        this.$emit('updateMember', id);
      },
      deleteMemberByID(id) {
        // Trigger detail view logic
        console.log('Viewing delete for MemberID:', id);
        // Emit the event for parent component to handle
        this.$emit('deleteMember', id);
      },
    },
  
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
  }
  
  button {
    margin: 0 5px;
    padding: 5px 10px;
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
  
   methods: {
    handleMemberAction(id, action) {
      switch (action) {
        case 'detail':
          console.log('Viewing details for MemberID:', id);
          // Emit a custom event for detail view (optional)
          this.$emit('memberAction', id, action); 
          break;
        case 'update':
          console.log('Viewing update for MemberID:', id);
          // Emit a custom event for update view (optional)
          this.$emit('memberAction', id, action); 
          break;
        case 'delete':
          console.log('Viewing delete for MemberID:', id);
          this.$emit('memberAction', id,action); 
          break;
        default:
          console.warn('Invalid action type:', action);
      }
    },
  }, --> 
  