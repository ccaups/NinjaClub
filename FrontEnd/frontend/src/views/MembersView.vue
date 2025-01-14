<template>
  <h1>Members</h1>
  <MemberTable :members="members" @detailMember="detailMember" @editMember="editMember" @deleteMember="deleteMember" />
</template>

<script>
import MemberTable from '@/components/MemberTable.vue';

export default {
  components: {
    MemberTable,
  },
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
        const response = await fetch('http://localhost:3306/members');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.members = await response.json();
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    },
    detailMember(id) {
    // Ensure that the route name is correctly defined in your router configuration
    this.$router.push({ name: 'MemberDetail', params: { id } });
    console.log('Redirecting to details for MemberID:', id);
    },
    editMember(id) {
      // Ensure that the route name is correctly defined in your router configuration
      this.$router.push({ name: 'MemberEdit', params: { id } });
      console.log('Redirecting to edit for MemberID:', id);
    },
    deleteMember(id) {
      // Ensure that the route name is correctly defined in your router configuration
      this.$router.push({ name: 'MemberDelete', params: { id } });
      console.log('Redirecting to delete for MemberID:', id);
    },
  },
};
</script>