<script setup lang="ts">
</script>

<template>
    <div className="pt-5 px-5">
        <h1>Confirm Input</h1>
        <span>Verify if the information below is correct</span>
        <div className="mt-5 rounded-3">
            <h3>Symptom List</h3>
        </div>
        <div className="mt-5 rounded-3">
            <h3>Doctor Preferences</h3>
            <table class="table">
                <col style="width: '30%'" />
                <col style="width: '70%'"  />
                <tbody>
                    <tr>
                    <th>Doctor Location</th>
                    <td>{this.state.preferences.location.act}</td>
                    </tr>
                    <tr>
                    <th>Doctor Age</th>
                    <td>{this.state.preferences.age.act}</td>
                    </tr>
                    <tr>
                    <th>Doctor Experience</th>
                    <td>{this.state.preferences.experience.act}</td>
                    </tr>
                    <tr>
                    <th>Consultation Fee</th>
                    <td>{this.state.preferences.price.act}</td>
                    </tr>
                    <tr>
                    <th>Doctor Sex</th>
                    <td>{this.state.preferences.gender.act}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button type="button" class="btn btn-secondary me-3" @click="$emit('prev-page')">BACK</button>
            <button type="button" class="btn btn-primary" @click="$emit('find-me')">Find me a Doctor!</button>
        </div>
    </div>
</template>