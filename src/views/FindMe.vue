<script setup lang="ts">
import { ref } from 'vue';

import Sidebar from '../components/Sidebar.vue'
import Symptom from '../components/FindMe/Symptom.vue'
import Preference from '../components/FindMe/Preference.vue'
import Review from '../components/FindMe/Review.vue'

import { useWorkspace, setWorkspace } from '../composables';

var sideData = ref([
  {
    title: 'Symptoms',
    desc: 'Input the symptoms you are currently experiencing',
    progress: 1
  },
  {
    title: 'Preference',
    desc: 'List what types of doctors you prefer',
    progress: 0
  },
  {
    title: 'Confirm Inputs',
    desc: 'Confirm your inputs to generate the most appropriate list of doctors to consult with',
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

// user data
let symptoms:any = ref([])
let preference:any = ref({})

function addSymptom(symptomObj : any){
  symptoms.value.push(Object.assign({},symptomObj))
  saveToWorkspace()
}

function deleteSymptom(symptomId: number) {
    symptoms.value = symptoms.value.filter((item: { symptomid: number; }) => item.symptomid !== symptomId)
}

function addPreference(preferenceObj : any){
  preference.value = preferenceObj
  alert(preference.value.sex)
}

function saveToWorkspace() {
  const newWorkspace = useWorkspace()
  newWorkspace.symptoms = symptoms
  setWorkspace(newWorkspace)
}

function findMe() {
  alert("findme")
}

</script>

<style src="../css/FindMe.css"></style>

<template>
  <div className="row"></div>
  <div className="row min-vh-100 mx-0">
    <div className='min-vh-100 col-3 pt-5 ps-5 sidebar'>
      <div className='w-100 d-flex mb-4' @click="window.location.href = '/'">
        <img className='me-3' src="../assets/images/moon-full-moon-icon.png" alt='logo' width="75"/>
        <span className="sidebar-title">LUNA</span>
      </div>
      <Sidebar :sideData="sideData"/>
      <div class="card mt-4 text-dark text-start overflow-auto symptoms">
        <div class="card-body">
          <h5 class="card-title">Symptoms</h5>
            <div v-if="symptoms.length > 0" v-for="(item, index) in symptoms">
              <span class="fw-bolder">{{item.symptom.Name}}</span>
              <span className="text-decoration-none fw-bold text-danger cursor-pointer ms-2"  @click="deleteSymptom(item.symptomid)">🗑️</span> <br />
              <span>{{item.location}}</span><br />
            </div>

            <p v-if="symptoms.length === 0" class="card-text text-secondary">
              No symptoms inputted
            </p>
        </div>
      </div>
      <button className="btn btn-secondary rounded-circle show-modal-btn">?</button>
    </div>
    <div class='col-9 text-start'>
      <Symptom v-if="progressIndex === 0" @add-symptom="addSymptom" @next-page="nextPage"/>
      <Preference v-if="progressIndex === 1" @add-pref="addPreference" @next-page="nextPage" @prev-page="prevPage"/>
      <Review v-if="progressIndex === 2" @find-me="findMe" @prev-page="prevPage"/>
    </div>
  </div>
</template>