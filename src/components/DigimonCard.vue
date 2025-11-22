<template>
  <q-card class="digimon-card q-hoverable cursor-pointer">
    <q-img :src="digimon.img" :ratio="1" class="digimon-image">
      <template v-slot:loading>
        <q-spinner-oval color="white" />
      </template>
      <div class="absolute-bottom text-subtitle2 text-center text-uppercase text-bold glass-effect">
        {{ digimon.name }}
      </div>
    </q-img>

    <q-card-section class="q-pt-none q-mt-sm text-center">
      <q-chip
        :color="getLevelColor(digimon.level)"
        text-color="white"
        icon="star"
        class="glossy"
      >
        {{ digimon.level }}
      </q-chip>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  digimon: {
    type: Object,
    required: true
  }
});

const getLevelColor = (level) => {
  switch (level.toLowerCase()) {
    case 'fresh': return 'light-blue-4';
    case 'in training': return 'cyan-5';
    case 'rookie': return 'green-5';
    case 'champion': return 'orange-5';
    case 'ultimate': return 'red-5';
    case 'mega': return 'purple-5';
    default: return 'grey-6';
  }
};
</script>

<style scoped>
.digimon-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.digimon-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.digimon-image {
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.glass-effect {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
