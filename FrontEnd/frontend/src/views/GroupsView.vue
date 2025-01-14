<template>
  <h1>Members</h1>
  <GrouprTable :groups="groups" @detailgroup="detailgroup" @editgroup="editgroup" @deletegroup="deletegroup" />
</template>

<script>
import GroupTable from '@/components/GroupTable.vue';

export default {
  components: {
    GroupTable,
  },
  data() {
    return {
      groups: [],
    };
  },
  mounted() {
    this.fetchGroups();
  },
  methods: {
    async fetchGroups() {
      try {
        const response = await fetch('http://localhost:3306/groups');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.members = await response.json();
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    },
    detailGroup(id) {
    // Ensure that the route name is correctly defined in your router configuration
    this.$router.push({ name: 'GroupDetail', params: { id } });
    console.log('Redirecting to details for GroupID:', id);
    },
    editGroup(id) {
      // Ensure that the route name is correctly defined in your router configuration
      this.$router.push({ name: 'GroupEdit', params: { id } });
      console.log('Redirecting to edit for GroupID:', id);
    },
    deleteGroup(id) {
      // Ensure that the route name is correctly defined in your router configuration
      this.$router.push({ name: 'GroupDelete', params: { id } });
      console.log('Redirecting to delete for GroupID:', id);
    },
  },
};
</script>

<!-- Teine võimalus -->
<!-- <template>
  <h1>Members</h1>
  Pass members to the MemberTable and listen to 'memberAction' event
  <MemberTable :members="members" @memberAction="handleMemberAction" />
</template> -->

<!-- memberAction(id, action) {
  switch (action) {
    case 'detail':
      console.log('Redirecting to details for MemberID:', id);
      this.$router.push({ name: 'MemberDetail', params: { id } });
      break;
    case 'update':
      console.log('Redirecting to update for MemberID:', id);
      this.$router.push({ name: 'MemberUpdate', params: { id } });
      break;
    case 'delete':
      console.log('Redirecting to delete for MemberID:', id);
      this.$router.push({ name: 'MemberDelete', params: { id } });
      break;
    default:
      console.warn('Invalid action type:', action);
  }
},    
mounted() {
  // Listen to the event from MemberTable
  this.$on('memberAction', this.memberAction);
} -->