<template>
    <div class="member-layout">
      <header>
        <!-- Your member-related header or navigation here -->
        <h1>Member Dashboard</h1>
      </header>
      
      <main>
        <!-- This will render the child route's view -->
        <router-view></router-view>
      </main>
  
      <footer>
        <!-- Your footer here -->
        <p>&copy; 2025 Member Portal</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MemberLayout',
  };
  </script>
  
  <style scoped>
  /* Add layout-specific styles */
  .member-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  header {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
  }
  
  main {
    flex: 1;
    padding: 20px;
  }
  
  footer {
    background-color: #f1f1f1;
    padding: 10px;
    text-align: center;
  }
  </style>
  