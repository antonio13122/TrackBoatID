<template>
  <div>
    <h1>Boats List</h1>
    <ul>
      <li v-for="boat in boats" :key="boat._id">
        {{ boat.ime_broda }} - {{ boat.vrsta_broda }} - Length:
        {{ boat.duzina }}m
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  data() {
    return {
      boats: [],
    };
  },
  async created() {
    try {
      const response = await api.get("/boats/all");
      this.boats = response.data;
    } catch (error) {
      console.error("Error fetching boats:", error);
    }
  },
};
</script>
