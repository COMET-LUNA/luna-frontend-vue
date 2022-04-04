<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue'
import Personal from '../components/Register/Personal.vue'

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

function nextPage() {
  for(var item of sampleData.value) {
    if(item.progress < 2) item.progress += 1
    console.log(item.progress)
  }
}

const progressIndex = ref(0)

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
      <Personal v-if="progressIndex === 0"/>
      <button class="btn btn-primary" @click="nextPage">Test</button>
    </div>
  </div>

</template>