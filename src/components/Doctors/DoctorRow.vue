<script setup lang="ts">
import { Doctor } from '../../types'
import { PropType } from 'vue'

const props = defineProps({
    doctor: {
        type: Object as PropType<Doctor>,
        required: true
    },
    isFirst: {
        type: Boolean,
        required: false
    },
    isSpec: {
        type: Boolean,
        required: false
    }
})

const { doctor, isFirst, isSpec } = props

function getImageUrl() {
    let femaleUrl = "https://firebasestorage.googleapis.com/v0/b/luna-doctor-finder.appspot.com/o/doctor_pic_female.jpeg?alt=media&token=1c279909-7f2e-4070-a4a1-a79c45c7e726"
    let maleUrl = "https://firebasestorage.googleapis.com/v0/b/luna-doctor-finder.appspot.com/o/doctor_pic_male.png?alt=media&token=7dd1b81c-0ae4-4e37-9b7f-3c756b8f0be7"
    return (doctor.sex == 'Female') ? femaleUrl : maleUrl;
}

</script>

<template>
     <div class="row mb-2 cursor-pointer hover-effect-grey rounded-3">
        <div class="col-1">
            <img :src="getImageUrl()"
                alt="doctor_pic" 
                style="width:50px"/>
        </div>
        <div class='col-4 ps-4'>
            <span class="d-flex h-100 align-items-center">Dr. {{doctor.name}}
                <span v-if="isSpec == false" class="badge bg-primary ms-2">{{isFirst ? "1st" : "2nd"}}</span>
            </span>
        </div>
        <div class='col-3'><span class="d-flex h-100 align-items-center">{{doctor.specialization}}</span></div>
        <div class='col-4'><span class="d-flex h-100 align-items-center float-end">{{doctor.clinic_address}}</span></div>
    </div>
</template>