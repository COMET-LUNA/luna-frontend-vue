<script setup lang="ts">
import { sayHello } from '../api'
import Navbar from '../components/Navbar.vue'
import { ref } from 'vue'

const hello = ref(sayHello())

hello.value = "changing the hello"

</script>

<template>
    <Navbar/>
    <div class="container">

    </div>
</template>