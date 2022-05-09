<script setup lang="ts">

  import {ref, reactive} from 'vue'
  import {useWorkspace, setWorkspace} from '../../composables'

  let emit = defineEmits(['next-page', 'prev-page'])
  const workspace = useWorkspace()

  let state = reactive({
      bloodType: "",
      heightCm: "",
      weightKg: "",
      diet: "",
      illnesses: "",
      previousSurgeries: "",
      allergies: "",
  })

  state = workspace.registration.medical

  const showError = ref(false)

  const errorText = ref("Sample Error Text")

  function nextPage() {
    saveChanges()
    if(checkInputs()) emit('next-page')
  }

  function backPage() {
    saveChanges()
    emit('prev-page')
  }

  function saveChanges() {
    const newWorkspace = useWorkspace()
    newWorkspace.registration.medical = state
    setWorkspace(newWorkspace)
  }

  function checkInputs() {
      if (
          state.bloodType === "" ||
          state.heightCm === "" ||
          state.weightKg === ""
      ){
          showError.value = true
          errorText.value = "Fill up all required fields."
          return false
      }

      if (!Number.isInteger(Number(state.heightCm))) {
        showError.value = true
        errorText.value = "Invalid Height"
        return false
      }

      if (!Number.isInteger(Number(state.weightKg))) {
        showError.value = true
        errorText.value = "Invalid Weight"
        return false
      }

      showError.value = false
      return true
  }


</script>

<style src="../../css/Register.css"> </style>

<template>

<div class="container ps-5 min-vh-100 d-flex align-items-center">
              <div class="me-5 mt-5">
                <h1>Medical Information</h1>
                <p>Input relevant medical information to assit your doctors. <span className="text-danger">Required fields*</span></p>
                <div className="row">
                  <div className="col-4">
                    <div class="form-floating">
                      <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="state.bloodType">
                        <option value="ap">A+</option>
                        <option value="am">A-</option>
                        <option value="bp">B+</option>
                        <option value="bm">B-</option>
                        <option value="op">O+</option>
                        <option value="om">O-</option>
                        <option value="abp">AB+</option>
                        <option value="abm">AB-</option>
                      </select>
                      <label for="floatingSelect">Blood Type<span className="text-danger">*</span></label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="form-floating mb-3">
                      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="state.heightCm"/>
                      <label for="floatingInput">Height (in cm)<span className="text-danger">*</span></label>
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="form-floating mb-3">
                      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="state.weightKg"/>
                      <label for="floatingInput">Weight (in kg)<span className="text-danger">*</span></label>
                    </div>
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <textarea class="form-control textarea-height" placeholder="Leave a comment here" id="floatingTextarea" v-model="state.diet" ></textarea>
                  <label for="floatingTextarea">Dietary Restrictions</label>
                </div>
                <div class="form-floating mb-3">
                  <textarea class="form-control textarea-height" placeholder="Leave a comment here" id="floatingTextarea" v-model="state.illnesses"></textarea>
                  <label for="floatingTextarea">Known Illnesses</label>
                </div>
                <div class="form-floating mb-3">
                  <textarea class="form-control textarea-height" placeholder="Leave a comment here" id="floatingTextarea" v-model="state.previousSurgeries" ></textarea>
                  <label for="floatingTextarea">Previous Surgeries</label>
                </div>
                <div class="form-floating mb-3">
                  <textarea class="form-control textarea-height" placeholder="Leave a comment here" id="floatingTextarea" v-model="state.allergies"></textarea>
                  <label for="floatingTextarea">Allergies</label>
                </div>

                <div :class="showError ? 'alert alert-danger' : 'alert alert-danger d-none'" role="alert">
                  {{errorText}}
                </div>
                <button type="button" class="btn btn-secondary me-3" @click="backPage">BACK</button>
                <button type="button" class="btn btn-primary" @click="nextPage">NEXT</button>
              </div>
            </div>

</template>