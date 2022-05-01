<script setup lang="ts">
import { PropType } from "vue";
import { useWorkspace, setWorkspace, sexDict, agesDict, experiencesDict, pricesDict } from "../../composables";
import router from "../../routes";
import moment from "moment";


interface SideData {
  date: String;
  diagnosis: any;
  symptoms: Array<any>;
  preferences: any;
}

const props = defineProps({
  history: {
    type: Array as PropType<Array<SideData>>,
    default: () => [],
    required: true,
  },
});

console.log(props.history);

function printPage(index: any) {
  const newWorkspace = useWorkspace();
  newWorkspace.history = props.history[index];
  setWorkspace(newWorkspace);
  console.log(props.history[index]);
  router.push("/print");
}
</script>

<style scoped>
.modal-body {
  background-color: rgb(191, 183, 236);
}
.modal-content {
  width: 800px;
}
</style>

<template>
  <div class="p-0 m-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <!-- MODAL -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <i class="fa-solid fa-backward fa-2xl"></i> <br />
              History
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Date (mm/dd/yy)</th>
                  <th scope="col">Symptoms Inputted</th>
                  <th scope="col">Doctor Preferences</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in props.history">
                  <td>
                    {{
                      // @ts-ignore
                      moment(new Date(item.date)).format(
                        "dddd MMMM Do YYYY, h:mm:ss a"
                      )
                    }}
                    <button class="btn btn-secondary" @click="printPage(index)">
                      Download Doctors Version
                    </button>
                  </td>
                  <td>
                    <span v-for="symptom in item.symptoms">
                      {{ symptom.symptom.Name }}
                      <br />
                    </span>

                    Recommended Specialization:
                    <strong>{{
                      item.diagnosis[0].Specialisation[0].Name
                    }}</strong>
                  </td>
                  <td>
                    Sex: {{ item.preferences.sex }} <br />
                    Age Range: {{ agesDict[item.preferences.age] }} <br />
                    Location: {{ item.preferences.location }} <br />
                    Price: {{ pricesDict[item.preferences.price] }} <br />
                    Years in Practice: {{ experiencesDict[item.preferences.experience] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL -->
    <div class="col-card card me-2 ml-2">
      <div class="icon">
        <i class="fa-solid fa-backward fa-2xl"></i>
      </div>
      <div class="info card-body">
        <h5 class="card-title">History</h5>
        <p class="card-text">
          <small class="text-muted">
            Previous Find Me a Doctor history within the application will be
            displayed here.
          </small>
        </p>
      </div>
    </div>
  </div>
</template>
