<script setup lang="ts">



</script>

<template>
    <div class="container ps-5 min-vh-100 d-flex align-items-center">
    <div class="me-5 mt-5">
        <h1>Account Details</h1>
        <p>Confirm account details to complete registration process</p>
        <table class='table table-bordered'>
        <tbody>
            <tr>
            <th>Name</th>
            <td>{firstname} {lastname}</td>
            </tr>
            <tr>
            <th>Birthdate</th>
            <td>{dateDict[birthMonth]} {birthDay}, {birthYear}</td>
            </tr>
            <tr>
            <th>Sex</th>
            <td>{sex === 1 ? "Male" : "Female"}</td>
            </tr>
            <tr>
            <th>Email Address</th>
            <td>{email}</td>
            </tr>
            <tr>
            <th>Blood Type</th>
            <td>{bloodTypeDict[bloodType]}</td>
            </tr>
            <tr>
            <th>Weight in kg</th>
            <td>{weightKg}</td>
            </tr>
            <tr>
            <th>Height in cm</th>
            <td>{heightCm}</td>
            </tr>
            <tr>
            <th>Dietary Restrictions</th>
            <td>{diet}</td>
            </tr>
            <tr>
            <th>Known Illnesses</th>
            <td>{illnesses}</td>
            </tr>
        </tbody>
        </table>
                <button type="button" class="btn btn-secondary me-3" @click="$emit('prev-page')">BACK</button>
                <button type="button" class="btn btn-primary" @click="$emit('register')">REGISTER ACCOUNT</button>
    </div>
    </div>

</template>