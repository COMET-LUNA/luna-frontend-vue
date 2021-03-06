<script setup lang="ts">
import { onMounted, ref } from "vue";
import SymptomList from "../../data/body_locations_symptoms.json";
import FullSymptomList from "../../data/body_symptoms.json";
import { symptomLocationDict, useWorkspace } from "../../composables";
import moment from 'moment'

const emit = defineEmits(["add-symptom", "next-page"]);

// DYNAMIC CONTENT
let bodySelected = ref("");
let symptomList: any = ref([]);
let showModal = ref(false);
let showError = ref(false);
let showAdded = ref(false);

const props = defineProps({
  symptoms: {
    type: Array,
  },
});

const frequencyList = [
  "Constantly",
  "Intermittent",
  "Once every few hours",
  "Once every few days",
  "Once a week",
  "I'll specify in the More Details text field below.",
];

let symptomObj = ref({
  symptomid: -1,
  start_date: "",
  frequency: "",
  details: "",
  isPrevious: false,
});

function bodyClicker(bodyPart: string) {
  // reset values
  symptomObj.value.symptomid = -1;
  symptomObj.value.frequency = "";
  symptomObj.value.details = "";
  symptomObj.value.start_date = "";
  symptomObj.value.isPrevious = false;

  showModal.value = true;
  bodySelected.value = bodyPart;
  symptomList.value = SymptomList.filter(
    (item) => item.pid === bodyPart
  )[0].symptomsSubgroups;
}

function bundleSymptom() {
  const workspace = useWorkspace();
  const symptomInputs = workspace.symptoms;
  let ifSymptomExists = false;

  for (var item of props.symptoms) {
    // @ts-ignore
    if (item.symptomid == symptomObj.value.symptomid) {
      ifSymptomExists = true;
    }
  }

  if (ifSymptomExists) {
    showError.value = true;
  } else {
    showError.value = false;
    let bundledSymptoms = Object.assign(
      { symptom: {}, location: "" },
      symptomObj.value
    );
    bundledSymptoms.symptom = FullSymptomList.find(
      (item: { ID: number }) => item.ID === bundledSymptoms.symptomid
    );
    bundledSymptoms.location = bodySelected.value;
    emit("add-symptom", bundledSymptoms);
    showModal.value = false;
    showAdded.value = true;
    dismissAdded();
  }
}

async function dismissAdded() {
  setTimeout(() => (showAdded.value = false), 5000); // Keeps Show Added Modal for 5 seconds
}

function toggleLabels() {
  popoverList.map((el) => {
    el.toggle();
  });
}

var popoverTriggerList = [];
var popoverList: any[] = [];

onMounted(() => {
  popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    // @ts-ignore
    return new bootstrap.Popover(popoverTriggerEl);
  });
});
</script>

<template>
  <div className="row">
    <div className="col-5 px-0">
      <div className="mb-3">
        <img
          className="mx-auto d-block cursor-pointer"
          ref="{this.headRef}"
          src="/assets/images/bodyparts/head.png"
          alt="head"
          @click="bodyClicker('head')"
          data-bs-toggle="popover"
          data-bs-trigger="manual"
          title="Head, Throat, and Neck"
        />
      </div>
      <div className="mb-3 row">
        <div className="col-4 p-0">
          <img
            className="float-end d-block cursor-pointer"
            src="/assets/images/bodyparts/l-arm.png"
            alt="larm"
            @click="bodyClicker('arms')"
            data-bs-toggle="popover"
            data-bs-trigger="manual"
            title="Arms, and Shoulder"
          />
        </div>
        <div className="col-4 p-0">
          <img
            className="mb-3 mx-auto d-block cursor-pointer"
            ref="{this.chestRef}"
            src="/assets/images/bodyparts/chest.png"
            alt="chest"
            @click="bodyClicker('chest')"
            data-bs-toggle="popover"
            data-bs-trigger="manual"
            title="Chest and Back"
          />
          <img
            className="mb-3 mx-auto d-block cursor-pointer"
            ref="{this.abdomenRef}"
            src="/assets/images/bodyparts/abdomen.png"
            alt="abdomen"
            @click="bodyClicker('abdomen')"
            data-bs-toggle="popover"
            data-bs-trigger="manual"
            title="Abdomen, Pelvis, and Buttocks"
          />
          <img
            className="mb-3 mx-auto d-block cursor-pointer"
            ref="{this.legsRef}"
            src="/assets/images/bodyparts/legs.png"
            alt="legs"
            @click="bodyClicker('legs')"
            data-bs-toggle="popover"
            data-bs-trigger="manual"
            title="Legs"
          />
        </div>
        <div className="col-4 p-0">
          <img
            className="d-block cursor-pointer"
            ref="{this.armRef}"
            src="/assets/images/bodyparts/r-arm.png"
            alt="rarm"
            @click="bodyClicker('arms')"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button class="btn btn-primary" @click="toggleLabels">
          Toggle Labels
        </button>
      </div>
    </div>
    <div className="col-7 px-0">
      <div class="me-5 mt-5">
        <h1>Input your symptoms</h1>
        <p v-if="!showModal">
          First, <b class="text-primary">click on the body</b> part in the
          diagram where your symptoms are present; or select more
          <b class="text-primary">general symptoms in the button below</b>
        </p>
        <p v-if="showModal">
          Now, select your symptoms from the list and add addditional
          information about your symptoms.
        </p>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        @click="bodyClicker('general')"
      >
        Skin, Joints and General Symptoms
      </button>
      <div v-if="showModal" class="card mt-4 me-5">
        <div class="card-body">
          <div className="">
            <h5 class="card-title">{{ symptomLocationDict[bodySelected] }}</h5>
          </div>
          <div class="card-body">
            <div class="form-floating mb-4">
              <select
                class="form-select"
                id="symptomselect"
                aria-label="Floating label select example"
                v-model="symptomObj.symptomid"
              >
                <optgroup
                  v-for="subgroup in symptomList"
                  :label="subgroup.subgroup"
                >
                  <option
                    v-for="symptom in subgroup.symptoms"
                    :value="symptom.ID"
                  >
                    {{ symptom.Name }}
                  </option>
                </optgroup>
              </select>
              <label for="floatingSelect"
                >Symptom<span class="text-danger">* </span></label
              >
            </div>
            <div class="form-floating mb-4">
              <select
                class="form-select"
                id="frequencyselect"
                aria-label="Floating label select example"
                v-model="symptomObj.frequency"
              >
                <option v-for="(item, index) in frequencyList">
                  {{ item }}
                </option>
              </select>
              <label for="floatingSelect"
                >Frequency<span class="text-danger">* </span></label
              >
            </div>
            <div class="form mb-4">
              <label for="floatingSelect"
                >Start Date<span class="text-danger">* </span></label
              >
              <input
                type="date"
                class="start-date-select w-100"
                v-model="symptomObj.start_date"
                :max="moment().format('YYYY-MM-DD')"
              />
            </div>
            <div class="form mb-4">
              <label for="floatingTextarea">More Details</label>
              <textarea
                v-model="symptomObj.details"
                id="moredetails"
                class="form-control"
                placeholder="Details can include specific body part, frequency, and more. If none, you can leave this text box blank."
              >
              </textarea>
            </div>
            <div class="form-check mb-4">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="symptomObj.isPrevious"
                id="formCheckChecked"
              />
              <label class="form-check-label" for="formCheckChecked"
                >Have you experienced this symptom before?</label
              >
            </div>
            <div v-if="showError" class="alert alert-danger" role="alert">
              Symptom already inputted to the list. To make changes, remove the
              symptom from the list first!
            </div>
            <div class="px-2 row">
              <button
                v-if="props.symptoms.length === 0"
                :disabled="
                  symptomObj.symptomid === -1 ||
                  symptomObj.frequency == '' ||
                  symptomObj.start_date == ''
                "
                type="button"
                class="btn btn-primary"
                @click="bundleSymptom"
              >
                Add symptom
              </button>
              <button
                v-else
                :disabled="
                  symptomObj.symptomid === -1 ||
                  symptomObj.frequency == '' ||
                  symptomObj.start_date == ''
                "
                type="button"
                class="btn btn-primary"
                @click="bundleSymptom"
              >
                Add another symptom
              </button>
              <span class="mt-3"
                ><span class="text-danger">* </span> - Required fields</span
              >
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          :disabled="props.symptoms.length === 0"
          type="button"
          class="btn btn-primary mt-3"
          @click="$emit('next-page')"
        >
          Next
        </button>
      </div>
      <div class="me-5 mt-3">
        <div v-if="showAdded" class="alert alert-success" role="alert">
          Symptom has been added to the list!
        </div>
      </div>
    </div>
  </div>
</template>
