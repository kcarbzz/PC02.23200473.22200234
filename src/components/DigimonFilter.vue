<template>
  <div class="row q-col-gutter-md items-center justify-center q-mb-lg">
    <div class="col-12 col-md-5">
      <q-input
        v-model="searchName"
        rounded
        outlined
        dense
        placeholder="Buscar por nombre..."
        bg-color="white"
        class="search-input"
        @update:model-value="emitFilter"
      >
        <template v-slot:prepend>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </div>

    <div class="col-12 col-md-4">
      <q-select
        v-model="selectedLevel"
        :options="levelOptions"
        rounded
        outlined
        dense
        label="Filtrar por Nivel"
        bg-color="white"
        class="level-select"
        emit-value
        map-options
        clearable
        @update:model-value="emitFilter"
      >
        <template v-slot:prepend>
          <q-icon name="filter_list" color="secondary" />
        </template>
      </q-select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['filter']);

const searchName = ref('');
const selectedLevel = ref(null);

const levelOptions = [
  'Fresh',
  'In Training',
  'Rookie',
  'Champion',
  'Ultimate',
  'Mega',
  'Armor'
];

const emitFilter = () => {
  emit('filter', {
    name: searchName.value,
    level: selectedLevel.value
  });
};
</script>

<style scoped>
.search-input, .level-select {
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  border-radius: 28px;
  transition: all 0.3s ease;
}

.search-input:focus-within, .level-select:focus-within {
  transform: scale(1.02);
  box-shadow: 0 6px 15px rgba(25, 118, 210, 0.2);
}
</style>
