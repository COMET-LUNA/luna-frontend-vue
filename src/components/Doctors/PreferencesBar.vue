<script setup lang="ts">
import { reactive, ref } from 'vue'
import { PreferencesObject } from '../../types';
import Options from '../../data/options.json' 
import { useWorkspace, sexDict, agesDict, experiencesDict, pricesDict, teleconsultDict } from '../../composables'

const editmode = ref(false)
// const {locations, genders, prices, ages, experiences } = Options
let { preferences, symptoms } = useWorkspace()

if ( symptoms.length == 0) {
    symptoms = JSON.parse(localStorage.getItem("symptoms"))
    preferences = JSON.parse(localStorage.getItem("preferences"))
    console.log(symptoms)
    console.log(preferences)
} 

defineProps({
    specialization: {
        type: Array,
        required: true
    }
})

</script>

<template>
    <div class="sticky-top">
        <div class="container rounded-3 p-3 mt-3 text-white text-start" style="backgroundColor: #3B4AD0">
            <h4 class="text-center fw-bold">Symptoms</h4>
                Based on your Symptoms:
            <ul class="mb-3">
                <li class="fw-bold" v-for="symptom in symptoms" :key="symptom.symptomid">
                    {{ symptom.symptom.Name }}
                </li>
            </ul>
            <div v-if="specialization.length > 0">
                The best specialization we found for you is: 
                <div class="fs-5 fw-bold text-center mb-3">{{specialization[0]}}</div>
                The other specializations that could be appropriate as well:
                <div v-for="(item, index) in specialization">
                <li v-if="index != 0" class="fw-bold">{{item}}</li>
                </div>
            </div>
            <div v-else>
                We couldn't find a specialization that matches your symptoms.
            </div>
        </div>
        <div class="container rounded-3 p-3 mt-3 text-white" style="backgroundColor: #3B4AD0">
            <h4 class="text-center fw-bold">Preferences</h4>
            <table class="table table-borderless text-white" v-if="!editmode">
                <tbody>
                <tr>
                    <th class="text-start">Doctor Location</th>
                    <td class="text-end" v-if="preferences.location === ''">No preference</td>
                    <td class="text-end" v-else>{{ preferences.location }}</td>
                </tr>
                <tr>
                    <th class="text-start">Doctor Age</th>
                    <td class="text-end">{{ agesDict[preferences.age] }}</td>
                </tr>
                <tr>
                    <th class="text-start">Doctor Experience</th>
                    <td class="text-end">{{ experiencesDict[preferences.experience] }}</td>
                </tr>
                <tr>
                    <th class="text-start">Consultation Fee</th>
                    <td class="text-end">{{ pricesDict[preferences.price] }}</td>
                </tr>
                <tr>
                    <th class="text-start">Doctor Sex</th>
                    <td class="text-end">{{ preferences.sex }}</td>
                </tr>
                <tr>
                    <th class="text-start">Does doctor teleconsult?</th>
                    <td class="text-end">{{ teleconsultDict[preferences.teleconsult] }}</td>
                </tr>
                </tbody>
            </table> 
        </div>
    </div>
    
</template>