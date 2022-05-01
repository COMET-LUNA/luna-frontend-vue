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

export interface Symptom {
    ID: number,
    Name: string,
}

export interface Doctor {
    birthyear: number,
    clinic_address: string,
    clinic_location: string,
    contact_number: string,
    email: string,
    med_school: string,
    name: string,
    price_range: string,
    sex: string,
    specialization: string,
    startyear: number,
}

export interface Recommendations {
    firstRecommendations: Array<Doctor>,
    secondRecommendations: Array<Doctor>,
    specRecommendations: Array<Doctor>,
    diagnosis: Array,
}