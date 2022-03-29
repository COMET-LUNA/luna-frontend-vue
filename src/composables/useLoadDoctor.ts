import { reactive } from 'vue'
import { queryDoctors } from '../api'

export async function useLoadDoctor(preferences: any, symptoms: any) {
    const doctors = reactive(await queryDoctors(preferences, symptoms));
    
    return doctors
}