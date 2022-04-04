import { reactive } from 'vue'
import { queryDoctors } from '../api'
import { Recommendations } from '../types';

export async function useLoadDoctor(preferences: any, symptoms: any) {
    const doctors = reactive<Recommendations>(await queryDoctors(preferences, symptoms));
    
    return doctors
}