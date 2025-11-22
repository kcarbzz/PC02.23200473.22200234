<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg" style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Iniciar Sesión</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onLogin">
          <q-input v-model="email" label="Correo electrónico" type="email" required />
          <q-input v-model="password" label="Contraseña" type="password" required class="q-mt-md" />
          <q-btn type="submit" label="Ingresar" color="primary" class="q-mt-lg full-width" />
        </q-form>
        <q-banner v-if="error" class="q-mt-md bg-red-2 text-red-10">
          {{ error }}
        </q-banner>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth-store'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')

const onLogin = async () => {
  error.value = ''
  try {
    const response = await axios.post('https://storedb-api.onrender.com/node-api/users/signin', {
      email: email.value,
      password: password.value,
    })
    // Guardar el estado de autenticación
    authStore.setAuthenticated(true)
    authStore.setUser(response.data)
    // Redirigir a la página principal después del login exitoso
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión'
  }
}
</script>

<style scoped>
.q-card {
  max-width: 400px;
}
</style>
