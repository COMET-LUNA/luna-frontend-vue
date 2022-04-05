<script setup lang="ts">

import {ref, reactive} from 'vue'

const state = reactive({
    bloodType: "",
    heightCm: "",
    weightKg: "",
    diet: "",
    illnesses: "",
})

const showError = ref(true)

const errorText = ref("Sample Error Text")


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
                        <option selected value="">Choose Blood Type</option>
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

                <div :class="showError ? 'alert alert-danger' : 'alert alert-danger d-none'" role="alert">
                  {{errorText}}
                </div>
                <button type="button" class="btn btn-secondary me-3" @click="$emit('prev-page')">BACK</button>
                <button type="button" class="btn btn-primary" @click="$emit('next-page')">NEXT</button>
              </div>
            </div>

</template>