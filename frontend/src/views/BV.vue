<template>
  <div class="container">
    <h2>📷 Detect Incoming Boat</h2>

    <input type="file" @change="uploadImage" class="file-input" />

    <p v-if="boat" class="arrival">
      🚤 Boat Arrived: <strong>{{ boat.ime_broda }}</strong>
    </p>

    <p v-if="error" class="error">error {{ error }}</p>
  </div>
</template>

<script>
import socket from "@/socket";

export default {
  data() {
    return {
      boat: null,
      error: null,
    };
  },
  created() {
    socket.on("boat-arrival", (boat) => {
      this.boat = boat;
      this.error = null;

      // Auto-hide
      setTimeout(() => {
        this.boat = null;
      }, 5000);
    });
  },
  methods: {
    async uploadImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("boatImage", file);

      try {
        const res = await fetch("http://localhost:5001/api/image/identify", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok || !data.found) {
          this.boat = null;
          this.error = data.message || "Boat not found.";
        }
      } catch (err) {
        this.boat = null;
        this.error = "Error uploading image or contacting server.";
        console.error(err);
      }

      // Clear error
      setTimeout(() => {
        this.error = null;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 50px;
}

.file-input {
  padding: 10px;
  border: 1px solid #ccc;
  margin-top: 20px;
  cursor: pointer;
}

.arrival {
  margin-top: 30px;
  font-size: 18px;
  color: green;
}

.error {
  margin-top: 20px;
  font-size: 16px;
  color: red;
}
</style>
