export interface PreferencesObject {
    location: {
        val: string,
        act: string,
    },
    gender: {
        val: string,
        act: string,
    },
    age: {
        val: number,
        act: string,
    },
    experience: {
        val: number,
        act: string,
    },
    price: {
        val: string,
        act: string,
    },
}

export interface OptionsObject {

}

export interface Symptom {
    ID: number,
    Name: string,
}

export interface Doctor {
    sex: string,
    name: string,
    specialization: string,
    price_range: string,
    clinic_address: string,
    clinic_location: string,
    med_school: string,
    birthyear: number,
    startyear: number
}

export interface Recommendations {
    firstRecommendations: Array<Doctor>,
    secondRecommendations: Array<Doctor>,
    specRecommendations: Array<Doctor>,
    diagnosis: String,
}