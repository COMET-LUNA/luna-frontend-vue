<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue'
import Personal from '../components/Register/Personal.vue'
import Security from '../components/Register/Security.vue'
import Medical from '../components/Register/Medical.vue'

var sampleData = ref([
  {
    title: 'Sample Title 1',
    desc: 'Sample Description to this title.',
    progress: 1
  },
  {
    title: 'Sample Title 2',
    desc: 'Sample Description to this title.',
    progress: 0
  },
  {
    title: 'Sample Title 3',
    desc: 'Sample Description to this title.',
    progress: 0
  }
])

const progressIndex = ref(0)

function nextPage() {
  progressIndex.value += 1

  for(var i = 0; i <= progressIndex.value; i++) {
    const item = sampleData.value[i]
    if(item.progress < 2) item.progress += 1
    console.log(item.progress)
  }
}

function prevPage() {
  progressIndex.value -= 1

  for(var i = sampleData.value.length-1; i >= progressIndex.value; i--) {
    const item = sampleData.value[i]
    if(item.progress > 0) item.progress -= 1
    console.log(item.progress)
  }
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
      <Sidebar :sideData="sampleData" />
    </div>
    <div className="col-9 m-0 p-0">
      <Personal v-if="progressIndex === 0" @next-page="nextPage"/>
      <Security v-if="progressIndex === 1" @next-page="nextPage" @prev-page="prevPage"/>
      <Medical v-if="progressIndex === 2" @next-page="nextPage" @prev-page="prevPage"/>

      <!-- <button class="btn btn-primary" @click="nextPage">Next</button>
      <button class="btn btn-primary" @click="prevPage">Back</button> -->
    </div>
  </div>

</template>