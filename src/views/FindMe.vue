<script setup lang="ts">
import { ref } from "vue";

import Sidebar from "../components/Sidebar.vue";
import Symptom from "../components/FindMe/Symptom.vue";
import Preference from "../components/FindMe/Preference.vue";
import Review from "../components/FindMe/Review.vue";

import {
  useWorkspace,
  setWorkspace,
  symptomLocationDict,
} from "../composables";
import { useRouter } from 'vue-router'

var sideData = ref([
  {
    title: "Symptoms",
    desc: "Input the symptoms you are currently experiencing",
    progress: 1,
  },
  {
    title: "Preference",
    desc: "List what types of doctors you prefer",
    progress: 0,
  },
  {
    title: "Confirm Inputs",
    desc: "Confirm your inputs to generate the most appropriate list of doctors to consult with",
    progress: 0,
  },
]);

let showIntro = ref(true);
const progressIndex = ref(0);
const router = useRouter()
console.log(router)

function nextPage() {
  if (progressIndex.value < sideData.value.length) {
    progressIndex.value += 1;

    for (var i = 0; i <= progressIndex.value; i++) {
      const item = sideData.value[i];
      if (item.progress < 2) item.progress += 1;
      console.log(item.progress);
    }
  }
}

function prevPage() {
  if (progressIndex.value > 0) {
    progressIndex.value -= 1;

    for (var i = sideData.value.length - 1; i >= progressIndex.value; i--) {
      const item = sideData.value[i];
      if (item.progress > 0) item.progress -= 1;
      console.log(item.progress);
    }
  }
}

// user data
let symptoms: any = ref([]);
let preference: any = ref({});

function addSymptom(symptomObj: any) {
  symptoms.value.push(Object.assign({}, symptomObj));
  saveToWorkspace();
}

function deleteSymptom(symptomId: number) {
  symptoms.value = symptoms.value.filter(
    (item: { symptomid: number }) => item.symptomid !== symptomId
  );
}

function addPreference(preferenceObj: any) {
  preference.value = preferenceObj;
}

function saveToWorkspace() {
  const newWorkspace = useWorkspace();
  newWorkspace.symptoms = symptoms;
  newWorkspace.preferences = preference;
  setWorkspace(newWorkspace);
}

function findMe(){
  router.push('/doctors')
}

function toggleIntro() {
  showIntro.value = !showIntro.value;
}
</script>

<style src="../css/FindMe.css"></style>

<template>
  <div className="row"></div>
  <div className="row min-vh-100 mx-0">
    <div className="min-vh-100 col-3 pt-5 ps-5 sidebar">
      <div className="w-100 d-flex mb-4 cursor-pointer" @click="$router.push('/')">
        <img
          className="me-3"
          src="/assets/images/moon-full-moon-icon.png"
          alt="logo"
          width="75"
        />
        <span className="sidebar-title">LUNA</span>
      </div>
      <Sidebar :sideData="sideData" />
      <div class="card mt-4 text-dark text-start overflow-auto symptoms">
        <div class="card-body">
          <h5 class="card-title">Symptoms</h5>
          <div v-if="symptoms.length > 0" v-for="(item, index) in symptoms">
            <span class="fw-bolder">{{ item.symptom.Name }}</span>
            <span
              className="text-decoration-none fw-bold text-danger cursor-pointer ms-2"
              @click="deleteSymptom(item.symptomid)"
              >🗑️</span
            >
            <br />
            <span>{{ symptomLocationDict[item.location] }}</span
            ><br />
          </div>

          <p v-if="symptoms.length === 0" class="card-text text-secondary">
            No symptoms inputted
          </p>
        </div>
      </div>
      <button
        className="btn btn-secondary rounded-circle show-modal-btn"
        @click="toggleIntro"
      >
        ?
      </button>
    </div>
    <div class="col-9 text-start">
      <Symptom
        v-if="progressIndex === 0"
        @add-symptom="addSymptom"
        @next-page="nextPage"
        :symptoms="symptoms"
      />
      <Preference
        v-if="progressIndex === 1"
        @add-pref="addPreference"
        @next-page="nextPage"
        @prev-page="prevPage"
      />
      <Review
        v-if="progressIndex === 2"
        @find-me="findMe"
        @prev-page="prevPage"
        :symptoms="symptoms"
      />
    </div>
    <div
      role="dialog"
      aria-modal="true"
      class="modal modal-background"
      :class="showIntro && 'show d-block'"
      tabindex="-1"
      aria-labelledby="contained-modal-title-vcenter"
      id="exampleModal"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title h4" id="contained-modal-title-vcenter">
              Welcome to LUNA Find me a Doctor! 👋
            </div>
          </div>
          <div class="modal-body">
            <h5 class="text-primary">What is going to happen?</h5>
            <p>
              You will go through a 3-step process to find your doctor. We will
              be collecting your <b>Symptoms</b> and
              <b>Doctor Preferences.</b> After, we will serve you a list of
              doctors based on those two.
            </p>
            <p>
              <b class="text-primary">1. Symptom Input:</b> You can
              <b>click any body part</b> that will be shown on the page and a
              list of symptoms will appear. You can
              <b>choose multiple symptoms</b> that may apply to them as well as
              the frequency of the symptom and additional information that can
              detail their symptoms more. You can also select symptoms from the
              <b>'Skins, Joints, and General Symptoms'</b> button for more
              general symptoms.
            </p>
            <p>
              <b class="text-primary">2. Doctor Preferences:</b> You have
              multiple options to narrow down the doctor of their choice such as
              the
              <b
                >location of the doctor, age, years of experience, consultation
                fee, and gender</b
              >
              of the doctor. These options will match a doctor that is best
              suited for you.
            </p>
            <p>
              <b class="text-primary">3. Doctor List:</b> After, you will be
              served with doctors that match all your preferences, doctors that
              match only your symptoms and locations, and doctors that match
              your symptoms only.
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="toggleIntro">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
