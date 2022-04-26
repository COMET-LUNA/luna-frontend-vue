<script setup lang="ts">
import "../../css/Home.css"
</script>

<template>
   <div class="p-0 m-0" @click="$router.push('/findMe')">
        <div class="col-card card ms-2">
            <div class="icon">
                <i class="fa-solid fa-magnifying-glass fa-2xl"></i>
            </div>
            <div class="info card-body">
                <h5 class="card-title">Find Me a Doctor</h5>
                <p class="card-text">
                <small class="text-muted">
                    Find the perfect doctor for you.
                </small>
                </p>
            </div>
        </div>
    </div>
</template>
