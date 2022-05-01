<script setup lang="ts">
import {ref} from 'vue'
import { useWorkspace } from '../../composables';
import Options from "../../data/options.json"

let emit = defineEmits(['add-pref', 'next-page', 'prev-page'])

let preferenceObj = ref({
    location: "na",
    age: -2,
    experience: -2,
    price: "na",
    sex: "na"
})

const workspace = useWorkspace()
preferenceObj = workspace.preferences


function assignPref(pref:string, val:any){
    switch(pref){
        case 'location':
            preferenceObj.value.location = val
            break;
        case 'age':
            preferenceObj.value.age = val
            break;
        case 'experience':
            preferenceObj.value.experience = val
            break;
        case 'price':
            preferenceObj.value.price = val
            break;
        case 'sex':
            preferenceObj.value.sex = val
            break;
    }
}

function bundlePreference() {
    emit('add-pref', preferenceObj.value)
    emit('next-page')
}

</script>

<style src="../../css/Preference.css"></style>


<template>

    <div className="m-0 p-0 d-flex flex-column">
        <div className="mt-5 ms-5">
            <h1>Doctor Preferences</h1>
            <span>Fill out the form below to identify your preferences in doctors</span>
        </div>
        <div class="mt-5 ms-5">
            <div>
                <h3><strong>Where would you prefer your doctor's clinic to be in?</strong></h3>
                <button v-for="(item, index) in Options.locations" @click="assignPref('location',item.val)" class="findMe-option-thicc" :class="preferenceObj.location === item.val && 'option-selected'">
                    {{item.act}}
                </button>

                <h3><strong>What age group do you prefer for your Doctor's age?</strong></h3>
                <button v-for="(item, index) in Options.ages" @click="assignPref('age', item.val)" class="findMe-option-thicc" :class="preferenceObj.age === item.val && 'option-selected'">
                    {{item.act}}
                </button>

                <h3><strong>How much years of experience do you prefer with your doctors? </strong></h3>
                <button v-for="(item, index) in Options.experiences" @click="assignPref('experience',item.val)" class="findMe-option-thicc" :class="preferenceObj.experience === item.val && 'option-selected'">
                    {{item.act}}
                </button>

                <h3><strong>How much can you budget for doctor consultations?</strong></h3>
                <button v-for="(item, index) in Options.prices" @click="assignPref('price',item.val)" class="findMe-option-thicc" :class="preferenceObj.price === item.val && 'option-selected'">
                    {{item.act}}
                </button>

                <h3><strong>What is your preferred sex in your doctors?</strong></h3>
                <button v-for="(item, index) in Options.genders" @click="assignPref('sex',item.val)" class="findMe-option-thicc" :class="preferenceObj.sex === item.val && 'option-selected'">
                    {{item.act}}
                </button>

                <div class="mb-5">
                    <button type="button" class="btn btn-secondary me-3" @click="$emit('prev-page')">BACK</button>
                    <button type="button" class="btn btn-primary" @click="bundlePreference">NEXT</button>
                </div>
            </div>
        </div>
    </div>

</template>