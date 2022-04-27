<script setup lang="ts">
import { reactive, ref } from 'vue'
import { PreferencesObject } from '../../types';
import Options from '../../data/options.json' 
import { useWorkspace, sexDict, agesDict, experiencesDict, pricesDict } from '../../composables'

const editmode = ref(false)
// const {locations, genders, prices, ages, experiences } = Options
const { preferences, symptoms } = useWorkspace()

defineProps({
    specialization: {
        type: String,
        required: true
    }
})

</script>

<template>
    <div class="sticky-top">
        <div class="container rounded-3 p-3 m-3 text-white" style="backgroundColor: #3B4AD0">
            <h5>Symptoms</h5>
            <div>
                Based on your Symptoms, the best specialization to contact is: <span className="fw-bold">{{specialization}}</span>
            </div>
            <div v-for="symptom in symptoms" :key="symptom.symptomid">
                <div>{{ symptom.symptom.Name }}</div>
                <div>{{ symptom.location }}</div>
            </div>
        </div>
        <div class="container rounded-3 p-3 m-3 text-white" style="backgroundColor: #3B4AD0">
            <h5>Preferences</h5>
            <table class="table table-borderless text-white" v-if="!editmode">
                <tbody>
                <tr>
                    <th>Doctor Location</th>
                    <td>{{ preferences.location }}</td>
                </tr>
                <tr>
                    <th>Doctor Age</th>
                    <td>{{ agesDict[preferences.age] }}</td>
                </tr>
                <tr>
                    <th>Doctor Experience</th>
                    <td>{{ experiencesDict[preferences.experience] }}</td>
                </tr>
                <tr>
                    <th>Consultation Fee</th>
                    <td>{{ pricesDict[preferences.price] }}</td>
                </tr>
                <tr>
                    <th>Doctor Sex</th>
                    <td>{{ preferences.sex }}</td>
                </tr>
                </tbody>
            </table> 
            <!-- <table class="table table-borderless text-white" v-else>
                <tbody>
                <tr>
                    <th>Doctor Location</th>
                    <td>
                        <select class="form-select" id="location" v-bind="preferences.location">
                            <option v-for="location in locations" 
                                value="{{location.val}}">
                                {{location.act}}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Doctor Age</th>
                    <td>
                        <select class="form-select" id="age" v-bind="preferences.age">
                            <option v-for="age in ages" 
                                value="{{age.val}}">
                                {{age.act}}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Doctor Experience</th>
                    <td>
                        <select class="form-select" id="experience" v-bind="preferences.experience">
                            <option v-for="experience in experiences" 
                                value="{{experience.val}}">
                                {{experience.act}}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Doctor Fee</th>
                    <td>
                        <select class="form-select" id="price" v-bind="preferences.price">
                            <option v-for="price in prices" 
                                value="{{price.val}}">
                                {{price.act}}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Doctor Sex</th>
                    <td>
                        <select class="form-select" id="gender" v-bind="preferences.gender">
                            <option v-for="gender in genders" 
                                value="{{gender.val}}">
                                {{gender.act}}
                            </option>
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>  -->
        </div>
    </div>
    
</template>