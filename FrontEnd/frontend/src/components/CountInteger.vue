<script>
export default {
    data() {
        return {
            counter : 0
        };
    }
}
</script>

<template>
    <button @click="counter++">Click Me: {{ counter }} closer to being broken.</button>
</template>