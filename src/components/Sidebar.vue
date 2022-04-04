<script setup lang="ts">
import { PropType } from 'vue';

interface SideData {
  title: String;
  desc: String;
}

const props = defineProps({
 sideData: {
   type: Array as PropType<Array<SideData>>,
   default: () => [],
   required: true
 }
})

console.log(props.sideData)

</script>

<style src="../css/Sidebar.css"></style>

<template>

  <div class="w-100">
    <div v-for="(item, index) in props.sideData" :key="index" class="w-100 mb-1 row">
      <div class="col-3">
                
      </div>
      <div class="col-9">
        <div className="hover-effect cursor-pointer rounded-3 py-2 px-3">
          <span>{{item.title}}</span> <br/>
          <span>{{item.desc}}</span>
        </div>  
      </div>
    </div>
  </div>
</template>