<script setup lang="ts">
import { useLoadDoctor } from '../composables';

const preferences = {}
const symptoms = {}

const {firstRecommendations, secondRecommendations, specRecommendations, diagnosis} = await useLoadDoctor(preferences, symptoms);

</script>