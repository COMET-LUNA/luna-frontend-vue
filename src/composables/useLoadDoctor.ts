import { reactive } from 'vue'
import { PreferencesObject, Symptom} from '../types';
import { useWorkspace } from '../composables'
import { Ref, unref, ref, toRaw } from 'vue';
import axios from 'axios';

// preferencesRef: Ref<PreferencesObject>, symptomsRef: Array


export async function useLoadDoctor() {
    const { symptoms, preferences } = useWorkspace()

    const querySymptoms = symptoms.value.map((symptom) => {
            return symptom.symptomid
    }).join(',');
    const user = JSON.parse(localStorage.getItem("user"))

    const query = {
        querySymptoms: querySymptoms,
        usersex: user.personal.sex,
        useryearbirth: user.personal.birthYear,
        location: preferences.value.location,
        age: preferences.value.age,
        experience: preferences.value.experience,
        price: preferences.value.price,
        sex: preferences.value.sex,
        teleconsult: preferences.value.teleconsult
    }
    console.log(query)
    
    try {
        const resp = await axios.post(import.meta.env.VITE_BACKEND_URL+'findMe', query)
        // console.log(resp.data)
        return resp.data
    } catch (err) {
        console.log(err)
    }
}