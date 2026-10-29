<script setup>
import { reactive, ref } from 'vue'
import { api } from '../api.js'

const props = defineProps({ equipo: Object })
const emit = defineEmits(['guardado', 'cancelar'])

const estados = ['Disponible', 'En uso', 'Mantención', 'Baja']
const vacio = { codigoInventario: '', nombre: '', tipo: '', marca: '', modelo: '', ubicacion: '', estado: 'Disponible', fechaAdquisicion: '', observaciones: '' }
const form = reactive({ ...vacio, ...(props.equipo ?? {}) })
if (form.fechaAdquisicion) form.fechaAdquisicion = String(form.fechaAdquisicion).slice(0, 10)
const errores = ref([])
const guardando = ref(false)

async function guardar() {
  errores.value = []
  guardando.value = true
  const { id, ...datos } = form
  if (!datos.observaciones) delete datos.observaciones
  try {
    if (props.equipo) await api.actualizar(props.equipo.id, datos)
    else await api.crear(datos)
    emit('guardado')
  } catch (e) {
    errores.value = e.mensajes
  } finally {
    guardando.value = false
  }
}
</script>

<template>
  <form class="card" @submit.prevent="guardar">
    <h2>{{ equipo ? 'Editar equipo' : 'Nuevo equipo' }}</h2>
    <ul v-if="errores.length" class="error"><li v-for="e in errores" :key="e">{{ e }}</li></ul>
    <div class="grid">
      <label>Código inventario<input v-model="form.codigoInventario" /></label>
      <label>Nombre<input v-model="form.nombre" /></label>
      <label>Tipo<input v-model="form.tipo" list="tipos" placeholder="Notebook, PC, Monitor..." /></label>
      <datalist id="tipos"><option>Notebook</option><option>PC</option><option>Monitor</option><option>Proyector</option></datalist>
      <label>Marca<input v-model="form.marca" /></label>
      <label>Modelo<input v-model="form.modelo" /></label>
      <label>Ubicación<input v-model="form.ubicacion" /></label>
      <label>Estado<select v-model="form.estado"><option v-for="s in estados" :key="s">{{ s }}</option></select></label>
      <label>Fecha adquisición<input type="date" v-model="form.fechaAdquisicion" /></label>
    </div>
    <label>Observaciones<textarea v-model="form.observaciones" rows="2" /></label>
    <div class="acciones">
      <button type="submit" :disabled="guardando">{{ guardando ? 'Guardando...' : 'Guardar' }}</button>
      <button type="button" class="sec" @click="emit('cancelar')">Cancelar</button>
    </div>
  </form>
</template>