<template>
    <div class="not-found">
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <router-link to="/">Go back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    
  }
  
  .not-found h1 {
    font-size: 2.0rem;
    color: #ff0000;
    margin-bottom: 20px;
  }
  
  .not-found p {
    font-size: 1.25rem;
    margin-bottom: 20px;
  }
  
  .not-found a {
    font-size: 1.25rem;
    color: #007bff;
    text-decoration: none;
  }
  
  .not-found a:hover {
    text-decoration: underline;
  }
  </style>
  