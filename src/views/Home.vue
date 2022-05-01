<script setup lang="ts">
import {ref} from 'vue'
import HomeCardComponent from "../components/Home/HomeCardComponent.vue";
import FindMeComponent from "../components/Home/FindMeComponent.vue";
import HistoryCardComponent from "../components/Home/HistoryCardComponent.vue";
import Navbar from "../components/Navbar.vue";
import { useWorkspace, setWorkspace } from "../composables";
import Footer from "../components/Footer.vue";
import axios from 'axios'
import { onMounted } from "vue";

const workspace = useWorkspace();
let userText = localStorage.getItem("user");
let user:any = {};
let history = ref([])

if (userText != null) {
  user = JSON.parse(userText);
  const newWorkspace = useWorkspace();
  newWorkspace.user = user;
  setWorkspace(newWorkspace);
  console.log(user);
}

onMounted(async () => {
  let email = user.personal.emailAddress
  const res = await axios.post(import.meta.env.VITE_BACKEND_URL+'history', {
    email
  })
  history.value = res.data.historyData
})
</script>

<style scoped>
.card {
  background-color: #cdd1f9;
  margin-top: 0px;
  margin-bottom: 0px;
}
.row {
  margin-top: 0px;
}
</style>

<template>
  <Navbar />
  <div class="container">
    <!-- Home Card -->
    <HomeCardComponent :user="user" />
    <h1 class="my-5">About LUNA</h1>
    <div class="card border-0 p-5 m-0">
      <p class="m-0">
        LUNA is a healthcare website application designed to minimize the cost
        of patients looking for a doctor that is best suited for them. Some
        patients do not know which specialization of doctors to consult or which
        doctors they are more comfortable with. Well, LUNA gives a solution to
        that problem. It connects patients with doctors in a single platform to
        provide them with better healthcare services. Join us in making
        healthcare more accessible to people.
      </p>
    </div>
    <div className="row my-5">
      <h1 class="mb-3">LUNA Services</h1>
      <!-- Find Me Card -->
      <FindMeComponent class="col-5 mx-auto" />
      <!-- History Card -->
      <HistoryCardComponent class="col-5 mx-auto" :history="history" />
    </div>
  </div>
  <Footer />
</template>
