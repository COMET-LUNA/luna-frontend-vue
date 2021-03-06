<script setup lang="ts">
import { onMounted } from "vue";
import { useWorkspace } from "../composables";
import { symptomLocationDict, sexDict, bloodTypeDict } from "../composables";
import moment from "moment";

const workspace = useWorkspace();
let history = workspace.history;
let user = workspace.user;

function printPage() {
  window.print();
}
</script>

<style scoped>
@media print {
  .hide-in-print {
    display: none;
  }

  .font-in-print {
    font-size: 0.7em;
  }
}
</style>

<template>
  <div class="container text-start font-in-print">
    <div class="d-flex mt-3" @click="$router.push('/')">
      <img
        src="/assets/images/moon-full-moon-icon.png"
        alt="luna-logo"
        width="50"
      />
      <h3 class="my-auto ms-3">LUNA</h3>
    </div>
    <h1 class="mt-5">Find Me Doctor Report</h1>
    <button class="btn btn-primary hide-in-print" @click="printPage">
      Print this Page or Save as PDF
    </button>
    <div class="mt-5">
      <table class="table">
        <thead>
          <tr>
            <td><h3>Patient Details</h3></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{{ user.personal.firstName }} {{ user.personal.lastName }}</td>
          </tr>
          <tr>
            <th>Sex</th>
            <td>{{ sexDict[user.personal.sex] }}</td>
          </tr>
          <tr>
            <th>Birthdate</th>
            <td>
              {{ user.personal.birthMonth }}/{{ user.personal.birthDay }}/{{
                user.personal.birthYear
              }}
            </td>
          </tr>
          <tr>
            <th>Date Processed</th>
            <td>
              {{
                // @ts-ignore
                moment(new Date(history.date)).format(
                  "dddd MMMM Do YYYY, h:mm:ss a"
                )
              }}
            </td>
          </tr>
          <tr>
            <th>Weight in Kilograms</th>
            <td>{{user.medical.weightKg}} kg</td>
          </tr>
          <tr>
            <th>Height in Centimeters</th>
            <td>{{user.medical.heightCm}} cm</td>
          </tr>
          <tr>
            <th>Blood Type</th>
            <td>{{bloodTypeDict[user.medical.bloodType]}}</td>
          </tr>
          <tr>
            <th>Diet</th>
            <td v-if="user.medical.diet">{{user.medical.diet}}</td>
            <td v-else>No dietary restrictions.</td>
          </tr>
          <tr>
            <th>Known Illnesses</th>
            <td v-if="user.medical.illnesses">{{user.medical.illnesses}}</td>
            <td v-else>No known illnesses.</td>
          </tr>
          <tr>
            <th>Previous Surgeries</th>
            <td v-if="user.medical.previousSurgeries">{{user.medical.previousSurgeries}}</td>
            <td v-else>No previous surgeries.</td>
          </tr>
          <tr>
            <th>Known Illnesses</th>
            <td v-if="user.medical.allergies">{{user.medical.allergies}}</td>
            <td v-else>No known allergies.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5">
      <h3>Symptoms</h3>
      <table class="table">
        <thead>
          <tr>
            <td>Symptom</td>
            <td>Frequency</td>
            <td>Start Date (Chronicity)</td>
            <td>Addtional Details</td>
            <td>Previous Symptom?</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in history.symptoms">
            <td>
              <span class="fw-bold">{{ item.symptom.Name }}</span> <br />
              <span class="fst-italic">{{
                symptomLocationDict[item.location]
              }}</span>
            </td>
            <td>{{ item.frequency }}</td>
            <td>{{ item.start_date }}</td>
            <td>
              <span class="text-secondary" v-if="item.details === ''"
                >No additonal details inputted by the user.</span
              >
              {{ item.details }}
            </td>
            <td>{{ item.isPrevious }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5">
      <h3>Initial Diagnosis</h3>
      <em
        >This diagnosis was taken from ApiMedic. This is not a final diagnosis
        and will require doctor's verification.</em
      >

      <div class="fw-bold mt-3">
        Recommended Specialist: (based on the most proabable disease from
        ApiMedic)
      </div>
      {{ history.specializations[0] }}

      <div class="mt-3 mb-5">
        <span class="fw-bold">Probable Diseases:</span>
        <div v-for="item in history.diagnosis">
          {{ item.Issue.Name }} (ICD: {{ item.Issue.IcdName }}) -
          {{ item.Issue.Accuracy }} %
        </div>
      </div>
    </div>
  </div>
</template>
