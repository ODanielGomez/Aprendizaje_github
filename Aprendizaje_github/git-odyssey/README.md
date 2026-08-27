# Git Odyssey

Juego educativo en español para aprender Git mediante una terminal simulada y una campaña progresiva.

## Ejecutar

Abre `index.html` en un navegador moderno. No requiere instalación, servidor ni dependencias.

Para servirlo localmente de forma opcional:

```powershell
python -m http.server 8080
```

Después visita `http://localhost:8080`.

## Contenido de esta versión

- 24 misiones distribuidas en 6 capítulos.
- Terminal Git simulada, segura y con historial de comandos.
- Fundamentos, staging, commits, ramas, merge, remotos, conflictos, rebase y recuperación.
- `.gitignore`, `diff`, `restore`, `stash`, tags, `revert`, `reset`, `reflog`, `cherry-pick` y `bisect`.
- Radar visual que representa commits, ramas, tags y la posición de `HEAD` en tiempo real.
- Pistas, teoría, XP, niveles, rangos y progreso persistente con `localStorage`.
- Diseño adaptable para escritorio y móvil.

## Restablecer el progreso

En las herramientas de desarrollo del navegador, ejecuta:

```js
localStorage.removeItem("gitOdysseyProgress")
```

Luego recarga la página.
