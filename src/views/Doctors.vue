<script setup lang="ts">
import { queryDoctors } from '../api';
import { ref, reactive, onMounted } from 'vue'
import { Doctor, PreferencesObject } from '../types';
import { assertForStatement } from '@babel/types';
import Recommendations from '../components/Doctors/Recommendations.vue'
import PreferencesBar from '../components/Doctors/PreferencesBar.vue';
import Navbar from '../components/Navbar.vue';
import { useLoadDoctor } from '../composables';
import { useWorkspace } from '../composables/useWorkspace';

const preferences = reactive<PreferencesObject>({
    location: {
        val: "",
        act: "",
    },
    gender: {
        val: "",
        act: "",
    },
    age: {
        val: 0,
        act: "",
    },
    experience: {
        val: 0,
        act: "",
    },
    price: {
        val: "",
        act: "",
    }
})
const loaded = ref(false)
const symptoms = ref([""])
const firstRecommendations = ref<Array<Doctor>>()
const secondRecommendations = ref<Array<Doctor>>()
const specRecommendations = ref<Array<Doctor>>()
const diagnosis = ref<String>("")
const { user } = useWorkspace()

onMounted(async () => {
    const query = reactive(await useLoadDoctor(preferences, symptoms));
    firstRecommendations.value = query.firstRecommendations
    secondRecommendations.value = query.secondRecommendations
    specRecommendations.value = query.specRecommendations
    diagnosis.value = query.diagnosis
    loaded.value = true
})
console.log(user)
</script>

<template>
    <Navbar/>
    <div class="row m-0 p-0">
        <div class="col-3 m-0 p-0">
            <PreferencesBar :specialization = "'Specialization'" :diagnosis= "diagnosis.toString()"/>
        </div>
        <div class="col-9 m-0 p-0">
            <Recommendations 
            :firstRecommendations="firstRecommendations" 
            :secondRecommendations="secondRecommendations" 
            :specRecommendations="specRecommendations"
            />
        </div>
    </div>
</template>