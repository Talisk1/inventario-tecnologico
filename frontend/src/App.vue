<script setup>
import { computed, onMounted, ref } from 'vue'
import { api } from './api.js'
import EquipoForm from './components/EquipoForm.vue'

const equipos = ref([])
const cargando = ref(false)
const error = ref('')
const busqueda = ref('')
const filtroEstado = ref('')
const vista = ref('lista') // lista | form | detalle
const seleccionado = ref(null)

const filtrados = computed(() => {
  const q = busqueda.value.toLowerCase().trim()
  return equipos.value.filter((e) => {
    const coincide = !q || [e.nombre, e.codigoInventario, e.tipo, e.ubicacion].some((v) => v.toLowerCase().includes(q))
    return coincide && (!filtroEstado.value || e.estado === filtroEstado.value)
  })
})

async function cargar() {
  cargando.value = true
  error.value = ''
  try {
    equipos.value = await api.listar()
  } catch (e) {
    error.value = e.mensajes.join(' ')
  } finally {
    cargando.value = false
  }
}

function nuevo() { seleccionado.value = null; vista.value = 'form' }
function editar(e) { seleccionado.value = e; vista.value = 'form' }
async function ver(e) {
  try { seleccionado.value = await api.obtener(e.id); vista.value = 'detalle' }
  catch (err) { error.value = err.mensajes.join(' ') }
}
const aEliminar = ref(null) // equipo pendiente de confirmación (modal)
const toast = ref(null)
let toastTimer

function mostrarToast(texto, tipo = 'ok') {
  toast.value = { texto, tipo }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = null), 3000)
}

function eliminar(e) { aEliminar.value = e }
async function confirmarEliminar() {
  const e = aEliminar.value
  aEliminar.value = null
  try {
    await api.eliminar(e.id)
    await cargar()
    mostrarToast(`Equipo "${e.nombre}" eliminado`, 'peligro')
  } catch (err) { error.value = err.mensajes.join(' ') }
}
async function guardado(accion) {
  vista.value = 'lista'
  await cargar()
  mostrarToast(accion === 'editado' ? 'Equipo editado correctamente' : 'Equipo guardado correctamente')
}

onMounted(cargar)
</script>

<template>
  <main>
    <h1>Inventario de Equipamiento Tecnológico</h1>

    <EquipoForm v-if="vista === 'form'" :equipo="seleccionado" @guardado="guardado" @cancelar="vista = 'lista'" />

    <section v-else-if="vista === 'detalle'" class="card">
      <h2>{{ seleccionado.nombre }}</h2>
      <dl>
        <template v-for="(v, k) in seleccionado" :key="k"><dt>{{ k }}</dt><dd>{{ v ?? '—' }}</dd></template>
      </dl>
      <button class="sec" @click="vista = 'lista'">Volver</button>
    </section>

    <template v-else>
      <div class="barra">
        <input v-model="busqueda" placeholder="Buscar por nombre, código, tipo o ubicación" />
        <select v-model="filtroEstado">
          <option value="">Todos los estados</option>
          <option>Disponible</option><option>En uso</option><option>Mantención</option><option>Baja</option>
        </select>
        <button @click="nuevo">+ Nuevo equipo</button>
      </div>

      <p v-if="cargando">Cargando equipos...</p>
      <p v-else-if="error" class="error">{{ error }} <button class="sec" @click="cargar">Reintentar</button></p>
      <p v-else-if="!filtrados.length">No hay equipos que mostrar.</p>
      <table v-else>
        <thead><tr><th>Código</th><th>Nombre</th><th>Tipo</th><th>Ubicación</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          <tr v-for="e in filtrados" :key="e.id">
            <td>{{ e.codigoInventario }}</td><td>{{ e.nombre }}</td><td>{{ e.tipo }}</td><td>{{ e.ubicacion }}</td>
            <td><span class="estado" :data-e="e.estado">{{ e.estado }}</span></td>
            <td class="acciones">
              <button class="sec" @click="ver(e)">Ver</button>
              <button class="sec" @click="editar(e)">Editar</button>
              <button class="peligro" @click="eliminar(e)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <div v-if="aEliminar" class="overlay" @click.self="aEliminar = null">
      <div class="modal" role="dialog" aria-modal="true">
        <h2>Eliminar equipo</h2>
        <p>¿Seguro que desea eliminar <strong>{{ aEliminar.nombre }}</strong> ({{ aEliminar.codigoInventario }})? Esta acción no se puede deshacer.</p>
        <div class="acciones">
          <button class="peligro" @click="confirmarEliminar">Sí, eliminar</button>
          <button class="sec" @click="aEliminar = null">Cancelar</button>
        </div>
      </div>
    </div>

    <div v-if="toast" class="toast" :class="toast.tipo" role="status">{{ toast.texto }}</div>
  </main>
</template>