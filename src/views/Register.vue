<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue'
import logo from '../images/moon-full-moon-icon.png'

import Personal from '../components/Register/Personal.vue'

const sampleData = [
  {
    title: 'Sample Title 1',
    desc: 'Sample Description to this title.'
  },
  {
    title: 'Sample Title 2',
    desc: 'Sample Description to this title.'
  }
]

const progressIndex = ref(0)

console.log("main" + sampleData)

</script>

<style src="../css/Sidebar.css"></style>

<template>

  <div className="row h-100 p-0 m-0">
    <div className='h-100 col-3 p-5 sidebar'>
      <div className='w-100 d-flex mb-4'>
          <img className='me-3' :src="logo" alt='logo' width='75px'/>
          <span>LUNA</span>
      </div>
      <Sidebar :sideData="sampleData" />
    </div>
    <div className="col-9 m-0 p-0">
      <Personal v-if="progressIndex === 0"/>
    </div>
  </div>

</template>