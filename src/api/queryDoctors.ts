import axios from 'axios'
import { Symptom, PreferencesObject } from "../types"

export function queryDoctors (preferences: PreferencesObject, symptoms: any) {
    // const {sex, birthDate} = JSON.parse(sessionStorage.getItem("userData"))

    const sex = "male"
    const birthDate = "October 21, 1990"

    console.log(preferences, symptoms)
    var symptomString = ""
    var symptomCount = 0
    for(var symptom of symptoms){
        console.log(symptom.symptomid)
    symptomString = symptomString + symptom.symptomid
    if (symptomCount !== symptoms.length-1)
        symptomString += ","
        symptomCount++
    }

    console.log(preferences)
    let body = {
        "querySymptoms": symptomString,
        "usersex": sex,
        "useryearbirth": new Date(birthDate).getFullYear(),
        "location": preferences.location.val,
        "age": preferences.age.val,
        "experience": preferences.experience.val,
        "price": preferences.price.val,
        "sex": preferences.gender.val
    }

    console.log(body)

    return axios.post(
    'https://luna-backend-thesis.herokuapp.com/findMe',
    {
        ...body
    }
    ).then((res) => {
        return res.data
    }).catch(e => {
        console.log('Error lol')
    })
}