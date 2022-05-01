<script setup lang="ts">
// logic
import { ref, unref, onMounted } from 'vue'
import { Doctor, PreferencesObject } from '../types';
import { useLoadDoctor, usePreferences } from '../composables';
// components
import DoctorRow from '../components/Doctors/DoctorRow.vue'
import PreferencesBar from '../components/Doctors/PreferencesBar.vue';
import Navbar from '../components/Navbar.vue';

const loading = ref(true)
const preferences = ref<PreferencesObject>()
const specialization = ref("")
const firstRecommendations = ref([])
const secondRecommendations = ref([])
const specRecommendations = ref([])
const showSpec = ref(false)
const modalDoctor = ref<Doctor>({})
const showDoctor = ref(false)

onMounted(async() => {
    const data = await useLoadDoctor()
    
    specialization.value = data.diagnosis[0].Specialisation[0].Name
    firstRecommendations.value = data.firstRecommendations
    secondRecommendations.value = data.secondRecommendations
    specRecommendations.value = data.specRecommendations
    loading.value = false
})

function showModal(doctor) {
    modalDoctor.value = unref(doctor)
    showDoctor.value = true
}
</script>

<style src="../css/FindMe.css"></style>

<template>
    <Navbar/>
    <div class="row px-5">
        <div class="col-3">
            <PreferencesBar :specialization="specialization"/>
        </div>
        <div class="col-9 m-0 py-5 d-flex flex-column align-items-center text-center"
            v-if="loading">
            <h2>Finding you doctors...</h2>
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="col-9" v-else>
            <div class='mt-4'>
                <h3 class='mb-3 text-start'>Doctors that matches all your preferences and best specialization</h3>
                <DoctorRow v-for="doctor, index in firstRecommendations" 
                    :doctor="doctor" 
                    :isFirst="true" 
                    :key="index"
                    @click="showModal(doctor)"
                />
            </div>
            <div class='mt-4'>
                <h3 class='mb-3 text-start'>Doctors that matches your location preference and best specialization</h3>
                <DoctorRow v-for="doctor, index in secondRecommendations" 
                    :doctor="doctor" 
                    :isFirst="false" 
                    :key="index"
                    @click="showModal(doctor)"
                />
            </div>
            <div class='mt-4'>
                <h3 class='mb-3 text-start'>Doctors who specialize in {{ specialization }}</h3>
                <div v-if="showSpec">
                    <DoctorRow v-for="doctor, index in specRecommendations" 
                        :doctor="doctor" 
                        :isFirst="false" 
                        :key="index"
                        @click="showModal(doctor)"
                    />
                    <button class="btn btn-primary" @click="() => {showSpec = false}">Hide</button>
                </div>
                <div v-else>
                    <button class="btn btn-primary" @click="() => {showSpec = true}">Show doctors</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-background"
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
                            <img src="../images/doctor_pic_female.jpg" style="width: 100px"/>
                        </div>
                        <div class="col-8">
                            <div class="d-flex row">
                                <h3>{{modalDoctor.name}}</h3>
                                <span>{{modalDoctor.specialization}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 row">
                        <h5 class="fw-bold">Doctor Information</h5>
                        <span><span class="fw-bold">Med School:</span> {{modalDoctor.med_school}}</span>
                        <span><span class="fw-bold">Consultation Fee Range:</span> {{modalDoctor.price_range}}</span>
                    </div>
                    <div class="mt-3 row">
                        <span class="fw-bold">Clinic Location</span>
                        <span>{{modalDoctor.clinic_location}}, {{modalDoctor.clinic_address}}</span>
                    </div>
                    <div class="mt-3 row">
                        <span class="fw-bold">Contact Information</span>
                        <span><i class="fa-solid fa-phone-alt px-3"></i>{{modalDoctor.contact_number}}</span>
                        <span><i class="fa-solid fa-envelope px-3"></i>{{modalDoctor.email}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>