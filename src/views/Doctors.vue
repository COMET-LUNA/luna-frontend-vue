<script setup lang="ts">
import { useLoadDoctor } from '../composables';
import { ref, reactive } from 'vue'
const preferences = {}
const symptoms = {}
const loading = ref(false)


const {
    loaded, 
    firstRecommendations, 
    secondRecommendations, 
    specRecommendations, 
    diagnosis
} = reactive(await useLoadDoctor(preferences, symptoms));

loading.value = loaded
</script>

<template>
    <div id="doctor-container" className='mt-4'>
        <h3 className='mb-3'>Doctors that matches all your preferences and best specialization</h3>
        
        <div className="row mb-2 cursor-pointer hover-effect-grey rounded-3" key={index} onClick={() => showDoctorInfo(doctor)}>
            <div className="col-1">
            <img src={doctor.sex === "Male" ? DoctorMale : DoctorFemale} alt="doctor_pic" style={{width: '50px'}}/>
            </div>
            <div className='col-4 ps-4'><span className="d-flex h-100 align-items-center">Dr. {doctor.name}<span class="badge bg-primary ms-2">{doctor.isFirst ? "1st" : "2nd"}</span> </span></div>
            <div className='col-3'><span className="d-flex h-100 align-items-center">{doctor.specialization}</span></div>
            <div className='col-4'><span className="d-flex h-100 align-items-center float-end">{doctor.clinic_address}</span></div>
        </div>
    </div>
    <div id="doctor-container" className='mt-4'>
        <h3 className='mb-3'>Doctors that matches your location preference and best specialization</h3>
        <div className="row mb-2 cursor-pointer hover-effect-grey rounded-3" onClick={() => showDoctorInfo(doctor)}>
            <div className="col-1">
                <img src={doctor.sex === "Male" ? DoctorMale : DoctorFemale} alt="doctor_pic" style={{width: '50px'}}/>
            </div>
            <div className='col-4 ps-4'><span className="d-flex h-100 align-items-center">Dr. {doctor.name}<span class="badge bg-primary ms-2">{doctor.isFirst ? "1st" : "2nd"}</span> </span></div>
            <div className='col-3'><span className="d-flex h-100 align-items-center">{doctor.specialization}</span></div>
            <div className='col-4'><span className="d-flex h-100 align-items-center float-end">{doctor.clinic_address}</span></div>
        </div>
    </div>
    <div id="doctor-container" className='mt-4'>
        <h3 className='mb-3'>Doctors based on best specialization only</h3>
            <Doctors />
        <button className="btn btn-primary" onClick={() => {setShowMore(true)}}>Show doctors</button>
    </div>
</template>