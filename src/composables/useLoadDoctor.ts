import { reactive } from 'vue'
import { PreferencesObject, Symptom, Recommendations} from '../types';
import { useWorkspace } from '../composables'
import { Ref } from 'vue';
import axios from 'axios';

// preferencesRef: Ref<PreferencesObject>, symptomsRef: Array
import { ref } from 'vue'

export async function useLoadDoctor() {
    const { symptoms, preference } = useWorkspace()

    console.log(symptoms)
    console.log(preference)
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
        const resp = await axios.post('http://localhost:3030/findMe', query)
        console.log(resp.data)
        return resp.data
    } catch (err) {
        console.log(err)
    }
}