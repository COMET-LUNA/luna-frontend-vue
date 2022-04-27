<script setup lang="ts">
import { ref } from "vue";
import router from "../routes";
import { useWorkspace } from "../composables";

let user:any = null
const userText = localStorage.getItem('user')
if (userText !== null) {
  user = JSON.parse(userText)
}

function logout() {
  localStorage.removeItem('user')
  router.push('/login')
  console.log(localStorage.getItem('user'))
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand ms-3" href="/">
        <img
          src="../assets/images/moon-full-moon-icon.png"
          className="me-3"
          alt="logo"
          style="width: 50px"
        />
        LUNA
      </a>
      <ul class="navbar-nav mx-auto mt-2 mt-lg-0">
        <!-- <li class="nav-item active mx-3">
          <a class="nav-link" href="/">Home</a>
        </li> -->
        <li class="nav-item mx-3">
          <a class="nav-link" href="/findMe">Find Me a Doctor</a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register">Register</a>
        </li> -->
        <!-- <li class="nav-item mx-3">
          <a class="nav-link" href="/doctors">Doctors</a>
        </li> -->
      </ul>
      <div class="dropdown">
        <button
          class="btn me-4"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ user.personal.firstName }} {{ user.personal.lastName }}
        </button>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownMenuButton"
        >
          <!-- <li><h6 class="dropdown-header">Account</h6></li>
          <li><a class="dropdown-item" href="#">Change account details</a></li> -->
          <li><h6 class="dropdown-header">Settings</h6></li>
          <li><a class="dropdown-item" @click="logout">Log out</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
