<script setup lang="ts">
import { ref } from 'vue'

let firstName = "Sean"
let lastName = "Pe"

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand ms-3" href="/">
              <img className='me-3' alt="logo" style="width:50px"/>
              LUNA
            </a>
            <ul class="navbar-nav mx-auto mt-2 mt-lg-0">
              <li class="nav-item active mx-3">
                  <a class="nav-link" href="/">Home</a>
              </li>
              <li class="nav-item mx-3">
                  <a class="nav-link" href="/findMe">Find Me a Doctor</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/login">Login</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/register">Register</a>
              </li>
              <li class="nav-item mx-3">
                  <a class="nav-link" href="/doctors">Doctors</a>
              </li>
            </ul>
            <a class="float-end me-3 nav-link text-black" href="/">
              {{firstName}} {{lastName}}
              <img className='ms-3 rounded-pill'/>
            </a>
        </div>
    </nav>
</template>