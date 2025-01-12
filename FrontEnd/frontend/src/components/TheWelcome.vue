<script setup>
import WelcomeItem from './WelcomeItem.vue'
import TrophyIcon from './icons/IconTrophy.vue' // Assuming you have an IconTrophy.vue component
</script>

<template>
  <div class="welcome-container">
    <h1>Welcome to Our Ninja Club!</h1>
    <p>
      For many years, we've been training and honing our skills, and our dedication has paid off! We're proud to announce that we recently achieved a remarkable feat - winning the coveted gold medal competition. 🏆
    </p>

    <p>
      But our journey doesn't stop here. We're constantly striving to improve, push our limits, and share our knowledge with others. Whether you're a seasoned ninja or just starting your path, we welcome you to join our vibrant community.
    </p>

    <WelcomeItem>
      <template #icon>
        <TrophyIcon />
      </template>
      <template #heading>Excellence Recognized</template>
      <p>Our commitment to excellence has been demonstrably rewarded.</p>
    </WelcomeItem>



    </div>
</template>

<style scoped>
.welcome-container {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}
</style>