<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import logo from '../images/moon-full-moon-icon.png'

</script>

<template>

  <div className="row h-100 p-0 m-0">
    <div className='h-100 col-3 p-5'>
      <div className='w-100 d-flex mb-4'>
          <img className='me-3' :src="logo" alt='logo' width='75px'/>
          <span>LUNA</span>
      </div>
      <Sidebar sidedata={this.state.sidedata} />
    </div>
    <div className="col-9 m-0 p-0">
      Content goes here.
    </div>
  </div>

</template>