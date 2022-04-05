<script setup lang="ts">

  import { reactive,ref } from 'vue'

  const state = reactive({
    firstName: "",
    lastName: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    emailAddress: "",
    sex: "",
  })

  const showError = ref(true)

  const errorText = ref("Sample Error Message")

</script>

<template>

  <div class="container ps-5 min-vh-100 d-flex align-items-center">
    <div>
      <h1>Personal Details</h1>
      <p>Provide your name, age, and email. <span className="text-danger">Required fields*</span></p>
      <div className="row">
        <div className="col-6">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" v-model="state.firstName"/>
            <label for="floatingInput">First Name<span className="text-danger">*</span></label>
          </div>
        </div>
        <div className="col-6">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" v-model="state.lastName"/>
            <label for="floatingInput">Last Name<span className="text-danger">*</span></label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div class="form-floating mb-3">
            <select class="form-select" id="validationDefault04" required v-model="state.birthMonth">
              <option selected disabled value="">Choose...</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <label for="floatingInput">Birth Month<span className="text-danger">*</span></label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <input type="email" class="form-control" id="floatingInput" v-model="state.birthDay"/>
            <label for="floatingInput">Birth Day<span className="text-danger">*</span></label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <input type="email" class="form-control" id="floatingInput" v-model="state.birthYear"/>
            <label for="floatingInput">Birth Year<span className="text-danger">*</span></label>
          </div>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" v-model="state.emailAddress"/>
        <label for="floatingInput">Email Address<span className="text-danger">*</span></label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="state.sex">
          <option selected value="">Choose Sex</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
        </select>
        <label for="floatingSelect">Sex<span className="text-danger">*</span></label>
      </div>
      <div :class="showError ? 'alert alert-danger' : 'alert alert-danger d-none'" role="alert">
        {{ errorText }}
      </div>
      <button type="button" class="btn btn-primary" @click="$emit('next-page')">NEXT</button>
    </div>
  </div>

</template>