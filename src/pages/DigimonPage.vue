<template>
  <q-page class="digimon-page q-pa-md">
    <div class="background-overlay"></div>
    
    <div class="content-container">
      <div class="text-h3 text-center text-white text-bold q-mb-lg title-shadow">
        Mundo Digital
      </div>

      <digimon-filter @filter="handleFilter" />

      <div v-if="loading" class="row justify-center q-mt-xl">
        <q-spinner-orbit color="white" size="4em" />
        <div class="text-white q-mt-md text-h6">Cargando Digimons...</div>
      </div>

      <div v-else-if="filteredDigimons.length === 0" class="row justify-center q-mt-xl">
        <div class="text-white text-h5 text-center">
          <q-icon name="warning" size="3em" class="q-mb-sm" />
          <br>
          No se encontraron Digimons con esos criterios.
        </div>
      </div>

      <div v-else class="row q-col-gutter-lg">
        <div
          v-for="digimon in filteredDigimons"
          :key="digimon.name"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <digimon-card :digimon="digimon" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import digimonService from 'src/services/digimonService';
import DigimonCard from 'src/components/DigimonCard.vue';
import DigimonFilter from 'src/components/DigimonFilter.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const digimons = ref([]);
const loading = ref(true);
const filterCriteria = ref({ name: '', level: null });

const fetchDigimons = async () => {
  loading.value = true;
  try {
    digimons.value = await digimonService.getAllDigimons();
  } catch (error) {
    console.error(error);
    $q.notify({
      type: 'negative',
      message: 'Error al cargar los Digimons. Intenta de nuevo.',
      position: 'top'
    });
  } finally {
    loading.value = false;
  }
};

const handleFilter = (criteria) => {
  filterCriteria.value = criteria;
};

const filteredDigimons = computed(() => {
  return digimons.value.filter(d => {
    const nameMatch = !filterCriteria.value.name || 
      d.name.toLowerCase().includes(filterCriteria.value.name.toLowerCase());
    const levelMatch = !filterCriteria.value.level || 
      d.level.toLowerCase() === filterCriteria.value.level.toLowerCase();
    return nameMatch && levelMatch;
  });
});

onMounted(() => {
  fetchDigimons();
});
</script>

<style scoped>
.digimon-page {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  overflow-x: hidden;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  pointer-events: none;
}

.content-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.title-shadow {
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
  font-family: 'Roboto', sans-serif;
  letter-spacing: 2px;
}
</style>
