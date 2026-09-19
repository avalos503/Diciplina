# Diciplina

App web móvil para construir disciplina: **retos diarios**, **hábitos**, **rutinas**, **mentalidad**, **lectura / audiolibros** y **racha**. Producto original, en español, con estética oscura y bold. Todo vive en el dispositivo (`localStorage` + IndexedDB para audio). No hay cuenta ni pagos.

## Abrir en el teléfono (URL pública)

**Abre esta URL ahora:**

**https://temporary-zippy-pearl-rj2oo6z.vercel.app**

Es un deploy anónimo en Vercel. Puede haber caducado. Para un sitio permanente, clona la rama de la app (`main` todavía no la tiene):

[Deploy with Vercel](https://vercel.com/new/clone?repository-url=https://github.com/avalos503/Diciplina/tree/cursor/diciplina-web-app-9402&project-name=diciplina)

### GitHub Pages

La app **no** vive en `https://avalos503.github.io/` (eso es la página de usuario y da 404). El enlace de proyecto, cuando Pages esté activo, es:

**https://avalos503.github.io/Diciplina/**

Para activarlo (dueño del repo):

1. [Settings → Pages](https://github.com/avalos503/Diciplina/settings/pages)
2. Source: **Deploy from a branch**
3. Branch: **`gh-pages`** / **`/ (root)`**
4. Save y espera 1–2 minutos

## Cómo correrla en local

Necesitas Node.js 18 o superior.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador (mejor en el viewport de un teléfono).

Otras órdenes:

```bash
npm run build   # producción
npm start       # sirve el build local
npm run lint    # eslint
```

## Qué incluye

1. **Onboarding** (2–3 pasos): nombre opcional, áreas de foco, hábitos iniciales. Sin login.
2. **Hoy** (`/`): racha, frase del día, afirmación fija, mensaje positivo del día (con *leído*), atajos a la rutina de hoy y a Lectura, checklist de retos y hábitos.
3. **Retos diarios** en mentalidad, fitness/salud, social y hábitos de vida. El set del día se elige de forma determinista por fecha y áreas de foco.
4. **Hábitos** (`/habitos`): marcas diarias, racha por hábito, hábito semilla **Lectura 30–60 min**.
5. **Rutinas** (`/rutinas` → `/rutinas/core-oblicuos-pecho`): banco extensible. Semilla **Core, oblicuos y pecho** (4 días de entreno + 3 de descanso activo).
6. **Mentalidad** (pestaña en la rutina, también en Hoy): afirmación en inglés, mensaje rotativo, gratitud (3 líneas), visualización 5 min, no negociable editable.
7. **Cardio saco**: 10–15 min con combos nombrados y video YouTube, **antes** de movilidad y el bloque principal.
8. **Entrenamiento**: movilidad, principal, cierre. Nota honesta: la grasa de los costados baja sobre todo con dieta y gasto calórico; la rutina fortalece, no “derrite” rollitos.
9. **Lectura / audiolibros** (pestaña Lectura): portada (foto comprimida) o título, minutos diarios + semana/total, marcas de atención, audio local opcional (HTMLAudio + Media Session + `playsInline`). Audible/Spotify/YouTube Music se escuchan en esas apps; Diciplina registra tiempo y progreso.
10. **Progreso** (`/progreso`): 28 días, resumen semanal e historial.
11. **PWA**: `manifest.json` + service worker. “Añadir a pantalla de inicio”.

Un día cuenta para la racha cuando completas al menos el **75%** del set (por ejemplo 3 de 4). Si hoy aún no está ganado, la racha muestra los días seguidos hasta ayer.

Los datos se guardan en `localStorage` bajo la clave `diciplina.v1`. El archivo de audio opcional vive en IndexedDB (`diciplina` / `lectura.audio`). Borrar datos está en **Perfil**.

## Rutas de UI (por función)

| Función | Dónde |
| --- | --- |
| Afirmación fija (inglés exacto) | **Hoy** (`/`) y **Rutinas → [rutina] → Mentalidad** |
| Mensaje positivo del día + *leído* | Mismo sitio: Hoy y pestaña Mentalidad. Se guarda por fecha en `mindsetByDate[fecha].messageRead` |
| Gratitud, visualización 5 min, no negociable | Pestaña **Mentalidad** |
| Cardio saco (combos + YouTube) | Pestaña **Cardio saco** |
| Core / pecho / oblicuos | Pestaña **Entrenamiento** |
| Libro (foto o título) | Pestaña **Lectura**, bloque *Libro actual*. Atajo desde Hoy y desde Hábitos → *Libro* |
| Minutos de escucha + historial | Lectura → *Hoy escuché* (hoy, semana, total, últimos 7 días) |
| Marcas de atención / relectura | Lectura → *Marcas* |
| Audio en segundo plano (archivo propio) | Lectura → *Escuchar*. DRM de otras apps: no. |
| Hábito Lectura 30–60 min | **Hábitos** y *Hábitos rápidos* en Hoy |

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · persistencia local.

## Licencia

Uso personal / proyecto propio. No copia marcas ni listas de otras apps.
