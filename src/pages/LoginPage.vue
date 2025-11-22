<template>
  <q-page class="login-page">
    <div class="login-container">
      <q-card class="login-card shadow-lg">
        <!-- Header con icono y título -->
        <q-card-section class="login-header">
          <div class="text-center">
            <div class="logo-icon">🎮</div>
            <div class="text-h4 text-weight-bold text-white q-mt-md">Digimon App</div>
            <div class="text-subtitle1 text-white opacity-75">Bienvenido</div>
          </div>
        </q-card-section>

        <!-- Formulario -->
        <q-card-section class="q-pa-lg">
          <q-form @submit.prevent="onLogin" class="login-form">
            <!-- Email -->
            <div class="q-mb-md">
              <q-input
                v-model="email"
                label="Correo electrónico"
                type="email"
                outlined
                required
                class="input-field"
              >
                <template #prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
            </div>

            <!-- Contraseña -->
            <div class="q-mb-lg">
              <q-input
                v-model="password"
                label="Contraseña"
                :type="showPassword ? 'text' : 'password'"
                outlined
                required
                class="input-field"
              >
                <template #prepend>
                  <q-icon name="lock" />
                </template>
                <template #append>
                  <q-icon
                    :name="showPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
            </div>

            <!-- Botón de ingreso -->
            <q-btn
              type="submit"
              label="INGRESAR"
              color="primary"
              class="login-btn full-width text-weight-bold"
              size="lg"
              :loading="isLoading"
            />
          </q-form>

          <!-- Mensaje de error -->
          <q-banner v-if="error" class="q-mt-lg error-banner">
            <template #avatar>
              <q-icon name="error" />
            </template>
            {{ error }}
          </q-banner>

          <!-- Mensaje de éxito -->
          <q-banner v-if="success" class="q-mt-lg success-banner">
            <template #avatar>
              <q-icon name="check_circle" />
            </template>
            {{ success }}
          </q-banner>
        </q-card-section>
      </q-card>
    </div>
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
const success = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const onLogin = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true

  try {
    const response = await axios.post('https://storedb-api.onrender.com/node-api/users/signin', {
      email: email.value,
      password: password.value,
    })
    // Guardar el estado de autenticación
    authStore.setAuthenticated(true)
    authStore.setUser(response.data)
    success.value = '¡Inicio de sesión exitoso!'
    // Redirigir a la página principal después del login exitoso
    setTimeout(() => router.push('/'), 1000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión. Intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 450px;
  border-radius: 16px;
  overflow: hidden;
}

.login-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px 30px !important;
}

.logo-icon {
  font-size: 60px;
}

.login-form {
  width: 100%;
}

.input-field {
  width: 100%;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none;
  border-radius: 8px;
  padding: 12px !important;
  font-size: 16px;
  letter-spacing: 1px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4) !important;
}

.error-banner {
  background-color: #ffebee;
  color: #c62828;
  border-radius: 8px;
  border-left: 4px solid #c62828;
}

.success-banner {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 8px;
  border-left: 4px solid #2e7d32;
}

.opacity-75 {
  opacity: 0.75;
}

:deep(.q-field__control) {
  font-size: 16px;
}

:deep(.q-field__label) {
  color: #667eea;
}
</style>
