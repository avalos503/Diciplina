# Diciplina

App web móvil para construir disciplina: **retos diarios**, **hábitos** y **racha**. Producto original, en español, con estética oscura y bold. Todo vive en el dispositivo (localStorage). No hay cuenta ni pagos.

## Abrir la app

El sitio queda en:

**https://avalos503.github.io/Diciplina/**

La primera vez hay que activar GitHub Pages (un clic, solo el dueño del repo):

1. Abre [Settings → Pages](https://github.com/avalos503/Diciplina/settings/pages)
2. **Source:** Deploy from a branch
3. **Branch:** `gh-pages` y carpeta `/ (root)`
4. Save
5. Espera 1–2 minutos y entra al enlace de arriba

Mientras tanto, córrela en local (abajo).

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

## Qué incluye v1

1. **Onboarding** (2–3 pasos): nombre opcional, áreas de foco, hábitos iniciales. Sin login.
2. **Hoy**: racha, frase del día, checklist de retos y check-in rápido de hábitos.
3. **Retos diarios** en mentalidad, fitness/salud, social y hábitos de vida. El set del día se elige de forma determinista por fecha y áreas de foco (el mismo día siempre muestra los mismos retos).
4. **Hábitos** recurrentes con marcas diarias y racha por hábito.
5. **Progreso**: vista de 28 días, resumen semanal e historial reciente.
6. **PWA**: `manifest.json` + service worker. En el menú del navegador, “Añadir a pantalla de inicio”.

Un día cuenta para la racha cuando completas al menos el **75%** del set (por ejemplo 3 de 4). Si hoy aún no está ganado, la racha muestra los días seguidos hasta ayer.

Los datos se guardan en `localStorage` bajo la clave `diciplina.v1`. Borrar datos está en **Perfil**.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · persistencia local.

## Licencia

Uso personal / proyecto propio. No copia marcas ni listas de otras apps.
