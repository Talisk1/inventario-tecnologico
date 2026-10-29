const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw { mensajes: ['No se pudo comunicar con el servidor. Verifique que el backend esté en ejecución.'] }
  }
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const msg = data?.message ?? 'Error inesperado'
    throw { mensajes: Array.isArray(msg) ? msg : [msg] }
  }
  return data
}

export const api = {
  listar: () => request('/equipos'),
  obtener: (id) => request(`/equipos/${id}`),
  crear: (d) => request('/equipos', { method: 'POST', body: JSON.stringify(d) }),
  actualizar: (id, d) => request(`/equipos/${id}`, { method: 'PATCH', body: JSON.stringify(d) }),
  eliminar: (id) => request(`/equipos/${id}`, { method: 'DELETE' }),
}