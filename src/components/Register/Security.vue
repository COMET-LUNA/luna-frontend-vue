<script setup lang="ts">

import {ref, reactive} from 'vue'

const state = reactive({
    password: "",
    confPassword: "",
})

const showError = ref(true)

const errorText = ref("Sample Error Text")


</script>

<template>

    <div class="container ps-5 min-vh-100 d-flex align-items-center">
        <div class="me-5 mt-5">
            <h1>Security</h1>
            <p>Input an 8 character password. <span className="text-danger">Required fields*</span></p>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="state.password"/>
                <label for="floatingInput">Password<span className="text-danger">*</span></label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="state.confPassword"/>
                <label for="floatingInput">Confirm Password<span className="text-danger">*</span></label>
            </div>

            <div :class="showError ? 'alert alert-danger' : 'alert alert-danger d-none'" role="alert">
                {{errorText}}
            </div>
            <button type="button" class="btn btn-secondary me-3" @click="$emit('prev-page')">BACK</button>
            <button type="button" class="btn btn-primary" @click="$emit('next-page')">NEXT</button>
        </div>
    </div>

</template>