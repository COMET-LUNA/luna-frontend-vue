<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useWorkspace, setWorkspace } from "../composables";
import router from "../routes";

const workspace = useWorkspace();
let errorText = ref(
  "The email and password combination is wrong or the user doesn't exist in the system."
);
let error = ref(false);
let loading = ref(false);

let login = ref({
  email: "",
  password: "",
});

function loginUser() {
    loading.value = true
    const url = import.meta.env.VITE_BACKEND_URL+"login"
    console.log(import.meta.env)
  axios
    .post(url, {
      ...login.value,
    })
    .then((res) => {
      error.value = false;
      const newWorkspace = useWorkspace();
      newWorkspace.user = res.data.userData;
      setWorkspace(newWorkspace);
      // window.location.href = "/";
      localStorage.setItem('user', JSON.stringify(res.data.userData))
      console.log(localStorage.getItem('user'))
      router.push('/')
    })
    .catch((e) => {
      const errorCode = e.response.data.errorCode;
      error.value = true;
      console.log(errorCode);
      loading.value = false
    });
}
</script>

<style src="../css/Login.css"></style>

<template>
  <div className="row min-vh-100 m-0 p-0 text-start dark-purple-bg">
    <div
      className="mx-auto col-xl-7 col-lg-9 d-flex flex-column justify-content-center px-5"
    >
      <div className="card p-5 mb-2">
        <div className="row">
          <div className="col-6 d-flex flex-column justify-content-center">
            <img
              src="../assets/images/moon-full-moon-icon.png"
              alt="LUNA Logo"
              width="150"
            />
            <h1 className="">LUNA</h1>
            <h5>Finding the best doctors for you.</h5>
          </div>
          <div className="col-6 row">
            <h1>Welcome to LUNA!</h1>
            <p className="mb-3">
              To access the system, input your login details
            </p>

            <h3>Email</h3>
            <input
              type="text"
              className="form-control mb-3"
              v-model="login.email"
            />

            <h3>Password</h3>
            <input
              type="password"
              className="form-control mb-3"
              v-model="login.password"
            />

            <span v-if="error" class="text-danger ps-0 mb-2">{{
              errorText
            }}</span>
            <button
              type="button"
              class="btn btn-primary mb-3"
              @click="loginUser"
            >
              <span v-if="!loading">Sign In</span>
              <div v-if="loading" class="spinner-grow spinner-grow-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>

            <div className="d-flex p-0">
              <i className="me-2">Don't have an account?</i>
              <a href="/register">Register an account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
