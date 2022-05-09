<script setup lang="ts">
import { ref } from "vue";
import { useWorkspace, birthMonthDict, bloodTypeDict } from "../../composables";

const workspace = useWorkspace();

let registration: any = ref(workspace.registration);

const props = defineProps({
  firebaseError: { type: Boolean },
  firebaseErrorText: { type: String },
});
</script>

<template>
  <div class="container ps-5 min-vh-100 d-flex align-items-center">
    <div class="me-5 mt-5">
      <h1>Account Details</h1>
      <p>Confirm account details to complete registration process</p>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th>Name</th>
            <td>
              {{ registration.personal.firstName }}
              {{ registration.personal.lastName }}
            </td>
          </tr>
          <tr>
            <th>Birthdate</th>
            <td>
              {{ birthMonthDict[registration.personal.birthMonth] }}
              {{ registration.personal.birthDay }},
              {{ registration.personal.birthYear }}
            </td>
          </tr>
          <tr>
            <th>Sex</th>
            <td>{{ registration.personal.sex == 1 ? "Male" : "Female" }}</td>
          </tr>
          <tr>
            <th>Email Address</th>
            <td>{{ registration.personal.emailAddress }}</td>
          </tr>
          <tr>
            <th>Blood Type</th>
            <td>{{ bloodTypeDict[registration.medical.bloodType] }}</td>
          </tr>
          <tr>
            <th>Weight in kg</th>
            <td>{{ registration.medical.weightKg }}</td>
          </tr>
          <tr>
            <th>Height in cm</th>
            <td>{{ registration.medical.heightCm }}</td>
          </tr>
          <tr>
            <th>Dietary Restrictions</th>
            <td>{{ registration.medical.diet }}</td>
          </tr>
          <tr>
            <th>Known Illnesses</th>
            <td>{{ registration.medical.illnesses }}</td>
          </tr>
          <tr>
            <th>Previous Surgeries</th>
            <td>{{ registration.medical.previousSurgeries }}</td>
          </tr>
          <tr>
            <th>Allergies</th>
            <td>{{ registration.medical.allergies }}</td>
          </tr>
        </tbody>
      </table>
      <div
        :class="
          props.firebaseError
            ? 'alert alert-danger'
            : 'alert alert-danger d-none'
        "
        role="alert"
      >
        {{ props.firebaseErrorText }}
      </div>
      <button
        type="button"
        class="btn btn-secondary me-3"
        @click="$emit('prev-page')"
      >
        BACK
      </button>
      <button type="button" class="btn btn-primary" @click="$emit('register')">
        REGISTER ACCOUNT
      </button>
    </div>
  </div>
</template>
