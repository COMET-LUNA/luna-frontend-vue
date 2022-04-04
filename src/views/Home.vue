<template>
    <Navbar/>
    <div class="container">
        <!-- Home Card -->
        
        <HomeCardComponent/>
        <div class="card border-0 p-5 mx-0 row my-5">
            <h1 class="mb-2"> About LUNA</h1>
            <p>LUNA is a healthcare website application designed to minimize the cost of patients looking for a doctor that is best suited for them. Some patients do not know which specialization of doctors to consult or which doctors they are more comfortable with. Well, LUNA gives a solution to that problem. It connects patients with doctors in a single platform to provide them with better healthcare services. Join us in making healthcare more accessible to people. </p>
        </div>
        <div className="row pb-5 p-0">
            <!-- Find Me Card -->
            <FindMeComponent/>
            <!-- History Card -->
            <HistoryCardComponent/>
            
        </div>
    </div>
</template>

<script setup lang="ts">
    import HomeCardComponent from '../components/HomeCardComponent.vue'
    import FindMeComponent from '../components/FindMeComponent.vue'
    import HistoryCardComponent from '../components/HistoryCardComponent.vue'
    // const hello = ref(sayHello())

    // hello.value = "changing the hello"

</script>

<style scoped>
.card{
    background-color: #cdd1f9;
    margin-top: 0px;
    margin-bottom: 0px;
}
.row{
    margin-top: 0px;
}
</style>
