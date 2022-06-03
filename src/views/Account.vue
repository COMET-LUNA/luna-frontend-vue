<script setup lang="ts">
import axios from "axios";
import { reactive, ref } from "vue";
import { useWorkspace, setWorkspace } from "../composables";

import Navbar from "../components/Navbar.vue";

// Get user information
let user: any = null;
const userText = localStorage.getItem("user");
if (userText !== null) {
  user = JSON.parse(userText);
}

let isSuccess = ref(false)

let state = reactive({
  personal: user.personal,
  medical: user.medical,
});

function saveChanges() {
  const url = import.meta.env.VITE_BACKEND_URL + "update";
  const userData = state
  axios.post(url, {userData}).then((res) => {
      const newWorkspace = useWorkspace();
      newWorkspace.user = res.data.userData;
      setWorkspace(newWorkspace);
      localStorage.setItem('user', JSON.stringify(res.data.userData))
      console.log(localStorage.getItem('user'))
      isSuccess.value = true
      setTimeout(() => {
        isSuccess.value = false
      }, 5000)
    })
    .catch((e) => {
      const errorCode = e.response.data.errorCode;
      console.log(errorCode);
    });
}
</script>

<template>
  <Navbar />
  <div class="container text-start p-5">
    <h1>Manage account</h1>
    <div>
      <h3 class="mt-5">Personal Details</h3>
      <div className="row">
        <div className="col-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              v-model="state.personal.firstName"
            />
            <label for="floatingInput">First Name</label>
          </div>
        </div>
        <div className="col-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              v-model="state.personal.lastName"
            />
            <label for="floatingInput">Last Name</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="validationDefault04"
              required
              v-model="state.personal.birthMonth"
              disabled
            >
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
            <label for="floatingInput">Birth Month</label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              v-model="state.personal.birthDay"
              disabled
            />
            <label for="floatingInput">Birth Day</label>
          </div>
        </div>
        <div className="col-3">
          <div className="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              v-model="state.personal.birthYear"
              disabled
            />
            <label for="floatingInput">Birth Year</label>
          </div>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          v-model="state.personal.emailAddress"
          disabled
        />
        <label for="floatingInput">Email Address</label>
      </div>
      <div class="form-floating mb-3">
        <select
          class="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          v-model="state.personal.sex"
        >
          <option value="1">Male</option>
          <option value="2">Female</option>
        </select>
        <label for="floatingSelect">Sex</label>
      </div>
    </div>
    <div class="mt-5">
      <h3>Medical Information</h3>
      <div className="row">
        <div className="col-4">
          <div class="form-floating">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="state.medical.bloodType"
              disabled
            >
              <option value="ap">A+</option>
              <option value="am">A-</option>
              <option value="bp">B+</option>
              <option value="bm">B-</option>
              <option value="op">O+</option>
              <option value="om">O-</option>
              <option value="abp">AB+</option>
              <option value="abm">AB-</option>
            </select>
            <label for="floatingSelect"
              >Blood Type<span className="text-danger">*</span></label
            >
          </div>
        </div>
        <div className="col-4">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-model="state.medical.heightCm"
            />
            <label for="floatingInput"
              >Height (in cm)<span className="text-danger">*</span></label
            >
          </div>
        </div>
        <div className="col-4">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-model="state.medical.weightKg"
            />
            <label for="floatingInput"
              >Weight (in kg)<span className="text-danger">*</span></label
            >
          </div>
        </div>
      </div>
      <div class="form-floating mb-3">
        <textarea
          class="form-control textarea-height"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          v-model="state.medical.diet"
        ></textarea>
        <label for="floatingTextarea">Dietary Restrictions</label>
      </div>
      <div class="form-floating mb-3">
        <textarea
          class="form-control textarea-height"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          v-model="state.medical.illnesses"
        ></textarea>
        <label for="floatingTextarea">Known Illnesses</label>
      </div>
      <div class="form-floating mb-3">
        <textarea
          class="form-control textarea-height"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          v-model="state.medical.previousSurgeries"
        ></textarea>
        <label for="floatingTextarea">Previous Surgeries</label>
      </div>
      <div class="form-floating mb-3">
        <textarea
          class="form-control textarea-height"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          v-model="state.medical.allergies"
        ></textarea>
        <label for="floatingTextarea">Allergies</label>
      </div>
    </div>
    <div class="alert alert-success" role="alert" v-if="isSuccess">
      Successfully updated account details.
    </div>
    <button type="button" class="btn btn-primary" @click="saveChanges">
      Save changes
    </button>
  </div>
</template>
