<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps({
    user: {
        type: Object
    }
})
</script>

<template>
    <div class="home-card text-white mb-3">
        <div class="home-row g-0 d-flex h-100 align-items-center">
            <!-- <div class="ms-3">
                <img class="rounded-pill" src="/assets/logo.png" alt="logo">
            </div> -->
            <div class="ms-5">
                <div class="card-body">
                    <h5 class="wc card-title">Welcome to LUNA,</h5>
                    <p class="text-start name card-text">{{props.user.personal.firstName}} {{props.user.personal.lastName}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

