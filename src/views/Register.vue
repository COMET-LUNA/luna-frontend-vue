<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue'
import Personal from '../components/Register/Personal.vue'
import Security from '../components/Register/Security.vue'
import Medical from '../components/Register/Medical.vue'
import Review from '../components/Register/Review.vue'
import router from '../routes';

var sideData = ref([
  {
    title: 'Personal Details',
    desc: 'Provide your name, age, and email',
    progress: 1
  },
  {
    title: 'Security',
    desc: 'Enter in a secure password to protect your account',
    progress: 0
  },
  {
    title: 'Medical Information',
    desc: 'Input your medical information to be used by your doctors.',
    progress: 0
  },
  {
    title: 'Confirm Account Details',
    desc: 'Confirm account details to complete register process',
    progress: 0
  }
])

const progressIndex = ref(0)

function nextPage() {
  if (progressIndex.value < sideData.value.length) {
    progressIndex.value += 1

    for(var i = 0; i <= progressIndex.value; i++) {
      const item = sideData.value[i]
      if(item.progress < 2) item.progress += 1
      console.log(item.progress)
    }
  }
}

function prevPage() {
  if (progressIndex.value > 0) {

    progressIndex.value -= 1

    for(var i = sideData.value.length-1; i >= progressIndex.value; i--) {
      const item = sideData.value[i]
      if(item.progress > 0) item.progress -= 1
      console.log(item.progress)
    }

  }
}

function register() {
  // add register logic here


  // redirect
  window.location.href = "/"
}

</script>

<style src="../css/Sidebar.css"></style>

<template>

  <div className="row vh-100 p-0 m-0">
    <div className='vh-100 col-3 p-5 sidebar'>
      <div className='w-100 d-flex mb-4'>
          <img className='me-3' src="../assets/images/moon-full-moon-icon.png" alt='logo' width="75"/>
          <span className="sidebar-title">LUNA</span>
      </div>
      <Sidebar :sideData="sideData" />
    </div>
    <div className="col-9 m-0 p-0">
      <Personal v-if="progressIndex === 0" @next-page="nextPage"/>
      <Security v-if="progressIndex === 1" @next-page="nextPage" @prev-page="prevPage"/>
      <Medical v-if="progressIndex === 2" @next-page="nextPage" @prev-page="prevPage"/>
      <Review v-if="progressIndex === 3" @register="register" @prev-page="prevPage"/>

      <!-- <button class="btn btn-primary" @click="nextPage">Next</button>
      <button class="btn btn-primary" @click="prevPage">Back</button> -->
    </div>
  </div>

</template>