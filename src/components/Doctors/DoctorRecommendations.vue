<script setup lang="ts">
import DoctorRow from './DoctorRow.vue'
import { PropType, ref } from 'vue'
import { Doctor } from '../../types'

const props = defineProps({
    firstRecommendations: {
        type: Object as PropType<Array>,
        required: false
    },
    secondRecommendations: {
        type: Object as PropType<Array>,
        required: false
    },
    specRecommendations: {
        type: Object as PropType<Array>,
        required: false
    },
})

const { firstRecommendations, secondRecommendations, specRecommendations } = props

const showSpec = ref(false)
</script>

<template>
    
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
            <button class="btn btn-primary" v-on:click="() => {showSpec = false}">Hide</button>
        </div>
        <div v-else>
            <button class="btn btn-primary" v-on:click="() => {showSpec = true}">Show doctors</button>
        </div>
    </div>
</template>