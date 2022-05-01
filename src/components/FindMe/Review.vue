<script setup lang="ts">
import {ref} from 'vue'
import { useWorkspace, setWorkspace, symptomLocationDict, sexDict, agesDict, experiencesDict, pricesDict } from '../../composables';


const workspace = useWorkspace()

let symptoms:any = ref(workspace.symptoms)
let preferences:any = ref(workspace.preferences)

const props = defineProps({
    symptoms: {
        type: Array
    }
})


</script>

<style src="../../css/FindMe.css"></style>

<template>
    <div className="pt-5 px-5">
        <h1>Confirm Input</h1>
        <span>Verify if the information below is correct</span>
        <div className="mt-5 rounded-3">
            <h3>Symptom List</h3>
            <div v-for="(item, index) in symptoms">
                <span class="symptom">{{item.symptom.Name}} - {{item.frequency}}</span> <br />
                <span class="fst-italic">{{symptomLocationDict[item.location]}}</span> <br />
                <span class="tet-secondary">{{item.details === "" ? 'No more details specified.' : item.details}}</span>
            </div>
        </div>
        <div className="mt-5 rounded-3">
            <h3>Doctor Preferences</h3>
            <table class="table">
                <col style="width: '30%'" />
                <col style="width: '70%'"  />
                <tbody>
                    <tr>
                    <th>Doctor Location</th>
                    <td>{{preferences.location}}</td>
                    </tr>
                    <tr>
                    <th>Doctor Age</th>
                    <td>{{agesDict[preferences.age]}}</td>
                    </tr>
                    <tr>
                    <th>Doctor Experience</th>
                    <td>{{experiencesDict[preferences.experience]}}</td>
                    </tr>
                    <tr>
                    <th>Consultation Fee</th>
                    <td>{{pricesDict[preferences.price]}}</td>
                    </tr>
                    <tr>
                    <th>Doctor Sex</th>
                    <td>{{preferences.sex}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button type="button" class="btn btn-secondary me-3" @click="$emit('prev-page')">BACK</button>
            <button type="button" class="btn btn-primary" @click="$emit('find-me')" :disabled="props.symptoms.length === 0">Find me a Doctor!</button>
        </div>
    </div>
</template>