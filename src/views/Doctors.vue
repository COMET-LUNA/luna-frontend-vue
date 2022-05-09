<script setup lang="ts">
// logic
import { ref, unref, onMounted, toRaw } from "vue";
import { Doctor, PreferencesObject } from "../types";
import { useLoadDoctor, useWorkspace } from "../composables";
// components
import DoctorRow from "../components/Doctors/DoctorRow.vue";
import PreferencesBar from "../components/Doctors/PreferencesBar.vue";
import Navbar from "../components/Navbar.vue";
import axios from "axios";

const loading = ref(true);
const preferences = ref<PreferencesObject>();
const specialization = ref([]);
const firstRecommendations = ref([]);
const secondRecommendations = ref([]);
const specRecommendations = ref([]);
const showSpec = ref(false);
// @ts-ignore
const modalDoctor = ref<Doctor>({});
const showDoctor = ref(false);
const sortOrder = ref("Unsorted");

const workspace = useWorkspace();

async function addToHistory(diagnosis: any) {
  const userText = localStorage.getItem("user");
  let email = "";
  if (userText !== null) {
    const user = JSON.parse(userText);
    email = user.personal.emailAddress;
  }

  const { preferences, symptoms } = workspace;
  const prefVal = preferences.value;
  const symVal = symptoms.value;
  const historyObj = {
    diagnosis,
    preferences: prefVal,
    symptoms: symVal,
    email,
  };
  console.log("DATA", historyObj);

  const res = await axios.post(
    import.meta.env.VITE_BACKEND_URL + "addHistory",
    historyObj
  );
  console.log(res);
}

onMounted(async () => {
  const { symptoms, preferences } = useWorkspace();
  if (symptoms.length == 0) {
    const data = JSON.parse(localStorage.getItem("recommendations"));
    specialization.value = data.specialization.map((x) => x.Name);
    firstRecommendations.value = data.firstRecommendations.sort((a, b) => {
      return a.name < b.name;
    });
    secondRecommendations.value = data.secondRecommendations;
    specRecommendations.value = data.specRecommendations;
    loading.value = false;
    console.log(data);
  } else {
    const data = await useLoadDoctor();
    addToHistory(data.diagnosis);

    specialization.value = data.specialization.map((x) => x.Name);
    // if(data.diagnosis.length >= 2) specialization.value[1] = data.diagnosis[1].Specialisation[0].Name
    // if(data.diagnosis.length >= 3) specialization.value[2] = data.diagnosis[2].Specialisation[0].Name

    firstRecommendations.value = data.firstRecommendations;
    secondRecommendations.value = data.secondRecommendations;
    specRecommendations.value = data.specRecommendations;
    loading.value = false;
    localStorage.setItem("recommendations", JSON.stringify(data));
    localStorage.setItem("symptoms", JSON.stringify(unref(symptoms)));
    localStorage.setItem("preferences", JSON.stringify(unref(preferences)));
    console.log(localStorage.getItem("recommendations"));
  }
});

function showModal(doctor) {
  modalDoctor.value = unref(doctor);
  showDoctor.value = true;
}

function getImageUrl() {
  return modalDoctor.value.sex == "Female"
    ? "../assets/images/doctor_pic_female.jpeg"
    : "../assets/images/doctor_pic_male.png";
}

function sortLocationally() {
  sortOrder.value = "Location";
  specRecommendations.value.sort((a, b) => {
    return a.clinic_address.localeCompare(b.clinic_address);
  });
  console.log(specRecommendations.value);
}

function sortLastname(a, b) {
  var aLast = a.name.split(" ");
  var bLast = b.name.split(" ");
  aLast = aLast[aLast.length - 1];
  bLast = bLast[bLast.length - 1];
  return aLast.localeCompare(bLast);
}

function sortAlphabetically(reverse) {
  if (reverse) {
    specRecommendations.value.sort(sortLastname);
    specRecommendations.value.reverse();
    sortOrder.value = "Last Name Alphabetically (Z-A)";
  } else {
    specRecommendations.value.sort(sortLastname);
    sortOrder.value = "Last Name Alphabetically (A-Z)";
  }
}

function sortSpecialization() {
  specRecommendations.value.sort((a, b) => {
    return a.specialization.localeCompare(b.specialization);
  });
  sortOrder.value = "Specialization";
}

function searchDoctor() {
  
}
</script>

<style src="../css/FindMe.css"></style>

<template>
  <Navbar />
  <div class="row px-5">
    <div class="col-3">
      <PreferencesBar :specialization="specialization" />
    </div>
    <div
      class="col-9 m-0 py-5 d-flex flex-column align-items-center text-center"
      v-if="loading"
    >
      <h2>Finding you doctors...</h2>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="col-9" v-else>
      <div class="d-flex align-items-center mt-3">
        <span>
          <h5 class="me-3">Legend</h5>
        </span>
        <span class="me-3"
          ><span class="badge bg-primary">1st</span> - All preferences and best
          specialization match</span
        >
        <span class="me-3"
          ><span class="badge bg-primary">2nd</span> - Only specialization and
          location preference matched</span
        >
      </div>
      <div class="mt-4">
        <h3 v-if="firstRecommendations.length > 0" class="mb-3 text-start">
          Doctors that matches all your preferences and best specialization
        </h3>
        <h3 v-else class="mb-3 text-start">
          We couldn't find any doctors that match all your preferences and best specialization.
        </h3> 
        <DoctorRow
          v-for="(doctor, index) in firstRecommendations"
          :doctor="doctor"
          :isFirst="true"
          :key="index"
          @click="showModal(doctor)"
        />

        
      </div>
      <div class="mt-4">
        <h3 v-if="secondRecommendations.length > 0" class="mb-3 text-start">
          Doctors that matches your location preference and best specialization
        </h3>
        <h3 v-else class="mb-3 text-start">
          We couldn't find any doctors that match your location and best specialization.
        </h3> 
        <DoctorRow
          v-for="(doctor, index) in secondRecommendations"
          :doctor="doctor"
          :isFirst="false"
          :key="index"
          @click="showModal(doctor)"
        />
        
      </div>
      <div class="mt-4">
        <h3 class="mb-3 text-start">
          Doctors who specialize in {{ specialization.join(", ") }}
        </h3>
        <div v-if="showSpec">
          <div class="row my-3">
            <div class="col-6 d-flex align-items-center">
              <input
                type="text"
                class="form-control"
                placeholder="Search Doctors"
                aria-label="doctors"
              />
            </div>
            <div class="col-6 d-flex justify-content-end align-items-center">
              <span class="fw-bold me-5">Sort Results by</span>
              <!-- <button type="button" class="btn btn-outline-primary" @click="sortLocationally()">Location</button>
                <button type="button" class="btn btn-outline-primary" @click="sortAlphabetically(false)">Alphabetically (A-Z)</button>
                <button type="button" class="btn btn-outline-primary" @click="sortAlphabetically(true)">Alphabetically (Z-A)</button> -->
              <div class="dropdown">
                <button
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ sortOrder }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <a class="dropdown-item" @click="sortLocationally()"
                      >Location</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" @click="sortAlphabetically(false)"
                      >Last Name Alphabetically (A-Z)</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" @click="sortAlphabetically(true)"
                      >Last Name Alphabetically (Z-A)</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" @click="sortSpecialization()"
                      >Specialization</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <DoctorRow
            v-for="doctor in specRecommendations"
            :doctor="doctor"
            :isFirst="false"
            :isSpec="true"
            :key="doctor.name"
            @click="showModal(doctor)"
          />
          <button
            class="btn btn-primary"
            @click="
              () => {
                showSpec = false;
              }
            "
          >
            Hide
          </button>
        </div>
        <div v-else>
          <button
            class="btn btn-primary"
            @click="
              () => {
                showSpec = true;
              }
            "
          >
            Show doctors
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal modal-background"
    :class="showDoctor && 'show d-block'"
    tabindex="-1"
    role="dialog"
    aria-labelledby="doctorModalCenter"
    aria-hidden="true"
    @click="showDoctor = false"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body text-start">
          <div class="row">
            <div class="col-4">
              <img :src="getImageUrl()" style="width: 100px" />
            </div>
            <div class="col-8">
              <div class="d-flex row">
                <h3>{{ modalDoctor.name }}</h3>
                <span>{{ modalDoctor.specialization }}</span>
              </div>
            </div>
          </div>
          <div class="mt-3 row">
            <h5 class="fw-bold">Doctor Information</h5>
            <span
              ><span class="fw-bold">Med School:</span>
              {{ modalDoctor.med_school }}</span
            >
            <span
              ><span class="fw-bold">Consultation Fee Range:</span>
              {{ modalDoctor.price_range }}</span
            >
          </div>
          <div class="mt-3 row">
            <span class="fw-bold">Clinic Location</span>
            <span
              >{{ modalDoctor.clinic_location }},
              {{ modalDoctor.clinic_address }}</span
            >
          </div>
          <div class="mt-3 row">
            <span class="fw-bold">Contact Information</span>
            <span
              ><i class="fa-solid fa-phone-alt px-3"></i
              >{{ modalDoctor.contact_number }}</span
            >
            <span
              ><i class="fa-solid fa-envelope px-3"></i
              >{{ modalDoctor.email }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
