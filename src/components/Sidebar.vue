<script setup lang="ts">
import { PropType } from 'vue';

interface SideData {
  title: String;
  desc: String;
  progress: Number;
}

const props = defineProps({
 sideData: {
   type: Array as PropType<Array<SideData>>,
   default: () => [],
   required: true
 }
})

</script>

<style src="../css/Sidebar.css"></style>

<template>

  <div class="w-100">
    <div v-for="(item, index) in props.sideData" :key="index" class="w-100 mb-1 row">
      <div class="col-3">
          <img v-if="item.progress === 0" src="../assets/images/progress-toggle-notdone.png" alt="notdone" width='50'>
          <img v-if="item.progress === 1" src="../assets/images/progress-toggle-inprogress.png" alt="inprogress" width='50'>     
          <img v-if="item.progress === 2" src="../assets/images/progress-toggle-complete.png" alt="complete" width='50'>
          
          <img v-if="index < props.sideData.length-1" src="../assets/images/line.png" alt='line' width='50'/>
      </div>
      <div class="col-9">
        <div className="hover-effect cursor-pointer rounded-3 py-2 px-3 text-start">
          <span className="item-title">{{item.title}}</span> <br/>
          <span>{{item.desc}}</span>
        </div>  
      </div>
    </div>
  </div>
</template>