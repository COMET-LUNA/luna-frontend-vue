import { reactive } from 'vue'
import { PreferencesObject, Symptom} from '../types';
import { useWorkspace } from '../composables'
import { Ref, unref, ref } from 'vue';
import axios from 'axios';

// preferencesRef: Ref<PreferencesObject>, symptomsRef: Array


export async function useLoadDoctor() {
    const { symptoms, preferences } = useWorkspace()

    const symptomsUnwrap = unref(symptoms)
    const preferencesUnwrap = unref(preferences)
    console.log(unref(symptomsUnwrap))
    console.log(preferencesUnwrap)
    // const query = {
    //     querySymptoms: 
    // }

    const query = {
        "querySymptoms": "10,17",
        "usersex": "Male",
        "useryearbirth": 1950,
        "location": "Quezon City",
        "age": 46,
        "experience": 20,
        "price": "1001-2000",
        "sex": "Female"
    }
    
    try {
        const resp = await axios.post(import.meta.env.VITE_BACKEND_URL+'findMe', query)
        // console.log(resp.data)
        return resp.data
    } catch (err) {
        console.log(err)
    }
}