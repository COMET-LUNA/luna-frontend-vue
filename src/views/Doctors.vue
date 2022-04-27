<script setup lang="ts">
// logic
import { ref, onMounted } from 'vue'
import { Doctor, PreferencesObject } from '../types';
import { useLoadDoctor, usePreferences } from '../composables';
// components
import DoctorRecommendations from '../components/Doctors/DoctorRecommendations.vue'
import DoctorRow from '../components/Doctors/DoctorRow.vue'
import PreferencesBar from '../components/Doctors/PreferencesBar.vue';
import Navbar from '../components/Navbar.vue';

const loaded = ref(false)
const preferences = ref<PreferencesObject>()
const specialization = ref("")
const firstRecommendations = ref([])
const secondRecommendations = ref([])
const specRecommendations = ref([])
const showSpec = ref(false)

onMounted(async() => {
    const data = await useLoadDoctor()
    
    specialization.value = data.diagnosis[0].Specialisation[0].Name
    firstRecommendations.value = data.firstRecommendations
    secondRecommendations.value = data.secondRecommendations
    specRecommendations.value = data.specRecommendations
})
</script>

<template>
    <Navbar/>
    <div class="row m-0 p-0">
        <div class="col-3 m-0 p-0">
            <PreferencesBar :specialization="specialization"/>
        </div>
        <div class="col-9 m-0 p-0">
            <div class='mt-4'>
                <h3 class='mb-3'>Doctors that matches all your preferences and best specialization</h3>
                <DoctorRow v-for="doctor, index in firstRecommendations" :doctor="doctor" :isFirst="true" :key="index"/>
            </div>
            <div class='mt-4'>
                <h3 class='mb-3'>Doctors that matches your location preference and best specialization</h3>
                <DoctorRow v-for="doctor, index in secondRecommendations" :doctor="doctor" :isFirst="false" :key="index"/>
            </div>
            <div class='mt-4'>
                <h3 class='mb-3'>Doctors that match the best specialization</h3>
                <div v-if="showSpec">
                    <DoctorRow v-for="doctor, index in specRecommendations" :doctor="doctor" :isFirst="false" :key="index"/>
                    <button class="btn btn-primary" @click="() => {showSpec = false}">Hide</button>
                </div>
                <div v-else>
                    <button class="btn btn-primary" @click="() => {showSpec = true}">Show doctors</button>
                </div>
            </div>
        </div>
    </div>
</template>