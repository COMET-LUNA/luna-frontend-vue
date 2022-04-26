<script setup lang="ts">
import "../css/Home.css"
import { useRouter } from 'vue-router'

const router = useRouter()

function findMe(){
    router.push('/findme')
}

</script>

<template>
   <div class="col-sm-6 p-0 m-0" @click="findMe">
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
