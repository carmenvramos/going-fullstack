<template>
    <ul  v-if="superfoods">
      <li class="superfoods" v-for="superfood in superfoods" :key="superfood.id">
        <RouterLink class="name" :to="`/superfoods/${superfood.id}`"> {{superfood.name}}</RouterLink>
        is good for your 
        <span class="category"> {{superfood.health_category}} </span> health
      </li>
    </ul>
</template>

<script>
export default {
  props: {
    superfoods: null
  }
};
</script>

<style scoped>
a {
  color: green;
  font-size: 1.00em;
}
.name {
  font-size: 1.1em;
  font-weight: bolder;
}

.category {
  font-weight: bolder;
}

</style>
