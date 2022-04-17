<script setup lang="ts">

    import {ref, reactive} from 'vue'
    import {useWorkspace, setWorkspace} from '../../composables'

    const workspace = useWorkspace()

    let emit = defineEmits(['next-page', 'prev-page'])

    let state = reactive({
        password: "",
        confPassword: "",
    })

    if (workspace.registration.security.password !== "") {
        state = workspace.registration.security
    }

    const showError = ref(false)

    const errorText = ref("Sample Error Text")

    function nextPage() {
        saveChanges()
        if(checkInputs()) emit('next-page')
    }

    function backPage() {
        saveChanges()
        emit('prev-page')
    }

    function saveChanges() {
        const newWorkspace = useWorkspace()
        newWorkspace.registration.security = state
        setWorkspace(newWorkspace)
    }

    function checkInputs() {
        if (
            state.password === undefined ||
            state.confPassword === undefined
        ){
            showError.value = true
            errorText.value = "Fill up all required fields."
            return false
        }

        if (state.password.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")) {
            showError.value = true
            errorText.value = "Password must have at least one letter and one number and must be at least 8 characters."
            return false
        }

        if (state.password !== state.confPassword) {
            showError.value = true
            errorText.value = "Password doesn't match."
            return false
        }


        showError.value = false
        return true
    }

</script>

<template>

    <div class="container ps-5 min-vh-100 d-flex align-items-center">
        <div class="me-5 mt-5">
            <h1>Security</h1>
            <p>Input an 8 character password with at least one character and one number. <span className="text-danger">Required fields*</span></p>
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
            <button type="button" class="btn btn-secondary me-3" @click="backPage">BACK</button>
            <button type="button" class="btn btn-primary" @click="nextPage">NEXT</button>
        </div>
    </div>

</template>