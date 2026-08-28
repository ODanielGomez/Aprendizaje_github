"use strict";

const missions = [
  {
    id: 0, chapter: 0, title: "Un nuevo comienzo", short: "Inicializa Git", icon: "◎", xp: 100,
    story: "Tu nave de código está vacía. Inicializa el repositorio que guardará cada cambio de esta aventura.",
    concept: "¿Qué es un repositorio?",
    theory: "Un repositorio es una carpeta cuyo historial Git puede observar. La carpeta oculta .git almacena los commits, ramas y referencias del proyecto.",
    objective: "Crea un repositorio Git en la carpeta actual.",
    hint: "El comando tiene dos palabras: git + init.",
    successTitle: "Repositorio inicializado",
    successText: "Creaste la cápsula donde vivirá la historia de tu proyecto.",
    done: s => s.repo,
    progress: s => s.repo ? "Objetivo cumplido" : "Aún no existe un repositorio"
  },
  {
    id: 1, chapter: 0, title: "Primera señal", short: "Crea un archivo", icon: "◇", xp: 100,
    story: "Todo proyecto comienza con una señal. Crea el archivo que explicará a otros exploradores qué contiene este repositorio.",
    concept: "El espacio de trabajo",
    theory: "Los archivos que editas viven en el working tree. Git detecta sus cambios, pero no los guarda en el historial hasta que tú se lo indiques.",
    objective: "Crea un archivo llamado README.md con el comando touch.",
    hint: "Escribe touch seguido del nombre exacto README.md.",
    successTitle: "Señal detectada",
    successText: "README.md existe, pero Git todavía lo considera un archivo sin seguimiento.",
    done: s => s.files.includes("README.md"),
    progress: s => s.files.includes("README.md") ? "Objetivo cumplido" : "Falta crear README.md"
  },
  {
    id: 2, chapter: 0, title: "Preparar el salto", short: "Usa el staging area", icon: "+", xp: 125,
    story: "Antes de registrar un cambio debes elegir exactamente qué viajará en el siguiente punto de control.",
    concept: "El área de preparación",
    theory: "El staging area es una zona intermedia. git add prepara cambios concretos y te permite construir commits pequeños y coherentes.",
    objective: "Añade README.md al área de preparación.",
    hint: "Usa git add README.md. Puedes consultar git status antes y después.",
    successTitle: "Cambio preparado",
    successText: "README.md está listo para formar parte de tu primer commit.",
    done: s => s.staged.includes("README.md"),
    progress: s => s.staged.includes("README.md") ? "Objetivo cumplido" : "README.md aún no está preparado"
  },
  {
    id: 3, chapter: 0, title: "Punto de control", short: "Crea un commit", icon: "●", xp: 150,
    story: "Registra el estado actual de la nave con un mensaje que permita reconocer este momento en el futuro.",
    concept: "Commits: historia con intención",
    theory: "Un commit es una instantánea identificada por un hash, autor, fecha y mensaje. Un buen mensaje describe por qué existe el cambio.",
    objective: "Crea un commit con el mensaje \"Primer viaje\".",
    hint: "Usa git commit -m \"Primer viaje\". Las comillas mantienen unido el mensaje.",
    successTitle: "Primer punto de control",
    successText: "Tu proyecto ya tiene historia. Puedes verla en cualquier momento con git log.",
    done: s => s.commits.some(c => c.message.toLowerCase() === "primer viaje"),
    progress: s => s.staged.length ? "Todo preparado; falta el commit" : "Crea el commit solicitado"
  },
  {
    id: 4, chapter: 1, title: "Universo paralelo", short: "Crea una rama", icon: "⑂", xp: 150,
    story: "Necesitas desarrollar una navegación nueva sin alterar la línea principal. Abre una línea temporal independiente.",
    concept: "Ramas ligeras",
    theory: "Una rama es un nombre móvil que apunta a un commit. Crear ramas es rápido y te permite aislar trabajo sin duplicar el proyecto.",
    objective: "Crea una rama llamada feature/navigation.",
    hint: "git branch crea la rama sin cambiarte a ella.",
    successTitle: "Nueva línea temporal",
    successText: "feature/navigation apunta al mismo commit que main y está lista para avanzar por su cuenta.",
    done: s => s.branches.includes("feature/navigation"),
    progress: s => s.branches.includes("feature/navigation") ? "Objetivo cumplido" : "Falta crear feature/navigation"
  },
  {
    id: 5, chapter: 1, title: "Cambiar de órbita", short: "Cambia de rama", icon: "↗", xp: 125,
    story: "La nueva rama existe, pero sigues en main. Desplaza tu posición de trabajo antes de construir la navegación.",
    concept: "HEAD y la rama activa",
    theory: "HEAD señala dónde estás trabajando. git switch mueve HEAD a otra rama y actualiza tus archivos para reflejar esa línea de historia.",
    objective: "Cambia a la rama feature/navigation usando git switch.",
    hint: "Escribe git switch feature/navigation.",
    successTitle: "Órbita cambiada",
    successText: "Ahora todo nuevo commit avanzará feature/navigation sin mover main.",
    done: s => s.currentBranch === "feature/navigation",
    progress: s => s.currentBranch === "feature/navigation" ? "Objetivo cumplido" : `Rama actual: ${s.currentBranch}`
  },
  {
    id: 6, chapter: 1, title: "Construcción aislada", short: "Trabaja en una rama", icon: "△", xp: 200,
    story: "Construye el módulo de navegación y registra el trabajo en la rama de funcionalidad.",
    concept: "Un flujo de trabajo seguro",
    theory: "El ciclo habitual es editar, revisar, preparar y confirmar. Repetirlo en una rama mantiene main estable mientras la idea evoluciona.",
    objective: "Crea nav.js, prepáralo y haz un commit. Son tres comandos.",
    hint: "Ejecuta: touch nav.js, git add nav.js y git commit -m \"Añade navegación\".",
    successTitle: "Módulo construido",
    successText: "La funcionalidad vive en su propia rama y main permanece intacta.",
    done: s => s.commits.some(c => c.branch === "feature/navigation" && c.files.includes("nav.js")),
    progress: s => !s.files.includes("nav.js") ? "Paso 1/3 · crea nav.js" : !s.staged.includes("nav.js") ? "Paso 2/3 · prepara nav.js" : "Paso 3/3 · crea el commit"
  },
  {
    id: 7, chapter: 1, title: "Convergencia", short: "Fusiona las ramas", icon: "⋈", xp: 200,
    story: "La navegación fue aprobada. Regresa a la línea principal e integra la historia de la rama de funcionalidad.",
    concept: "Fusionar historias",
    theory: "git merge incorpora en la rama actual los commits de otra rama. Si las historias no compiten, Git puede hacer una fusión fast-forward.",
    objective: "Vuelve a main y fusiona feature/navigation. Son dos comandos.",
    hint: "Primero git switch main; después git merge feature/navigation.",
    successTitle: "Historias unificadas",
    successText: "main contiene ahora la navegación desarrollada de forma aislada.",
    done: s => s.merged.includes("feature/navigation") && s.currentBranch === "main",
    progress: s => s.currentBranch !== "main" ? "Paso 1/2 · vuelve a main" : "Paso 2/2 · fusiona feature/navigation"
  },
  {
    id: 8, chapter: 2, title: "Enlace distante", short: "Conecta un remoto", icon: "⌁", xp: 175,
    story: "Es hora de conectar tu repositorio local con la estación compartida del equipo.",
    concept: "Repositorios remotos",
    theory: "Un remoto es un alias para la URL de otro repositorio. origin es el nombre convencional del remoto principal, no una palabra especial de Git.",
    objective: "Añade https://github.com/odyssey/nave.git como remoto origin.",
    hint: "git remote add origin https://github.com/odyssey/nave.git",
    successTitle: "Enlace establecido",
    successText: "origin identifica ahora la estación remota del equipo.",
    done: s => Boolean(s.remotes.origin),
    progress: s => s.remotes.origin ? "Objetivo cumplido" : "No existe el remoto origin"
  },
  {
    id: 9, chapter: 2, title: "Transmitir historia", short: "Publica con push", icon: "↑", xp: 175,
    story: "Publica la rama principal y configura su conexión para futuros envíos.",
    concept: "Push y upstream",
    theory: "git push envía commits locales. La opción -u registra una rama upstream para que los próximos push y pull sepan qué rama remota usar.",
    objective: "Publica main en origin y configura el upstream con -u.",
    hint: "git push -u origin main",
    successTitle: "Historia transmitida",
    successText: "main ya está publicada y conectada con origin/main.",
    done: s => s.pushed,
    progress: s => s.pushed ? "Objetivo cumplido" : "main aún no se ha publicado"
  },
  {
    id: 10, chapter: 2, title: "Señales cruzadas", short: "Resuelve un conflicto", icon: "⚡", xp: 250,
    story: "Un compañero cambió README.md en la estación remota. Trae el cambio, resuelve la colisión y registra la solución.",
    concept: "Conflictos sin pánico",
    theory: "Un conflicto ocurre cuando Git no puede decidir cómo combinar cambios. Tú eliges el contenido correcto, preparas el archivo resuelto y creas el commit de fusión.",
    objective: "Haz pull de origin/main; después prepara README.md y crea el commit de resolución.",
    hint: "git pull origin main; git add README.md; git commit -m \"Resuelve conflicto\".",
    successTitle: "Conflicto resuelto",
    successText: "Tomaste una decisión explícita y el historial vuelve a estar en un estado consistente.",
    done: s => s.conflictResolved,
    progress: s => !s.conflict ? "Paso 1/3 · ejecuta pull" : !s.staged.includes("README.md") ? "Paso 2/3 · prepara la resolución" : "Paso 3/3 · confirma la resolución"
  },
  {
    id: 11, chapter: 2, title: "Reescribir el tiempo", short: "Domina rebase", icon: "⌘", xp: 300,
    story: "Una rama antigua debe ponerse al día conservando una historia lineal. Crea la rama rescue y rebásala sobre main.",
    concept: "Rebase con criterio",
    theory: "Rebase vuelve a aplicar commits sobre una base nueva. Produce una historia lineal, pero cambia hashes: evita usarlo sobre ramas públicas que otros ya consumen.",
    objective: "Crea y cambia a rescue con switch -c; después ejecuta git rebase main.",
    hint: "git switch -c rescue; luego git rebase main.",
    successTitle: "Línea temporal dominada",
    successText: "Has completado la primera campaña. Ya puedes razonar sobre el historial, no solo memorizar comandos.",
    done: s => s.rebased && s.currentBranch === "rescue",
    progress: s => !s.branches.includes("rescue") ? "Paso 1/2 · crea y cambia a rescue" : "Paso 2/2 · rebasa sobre main"
  }
];

missions.push(
  {
    id: 12, chapter: 3, title: "El escudo invisible", short: "Configura .gitignore", icon: "◌", xp: 175,
    story: "Algunos archivos nunca deben entrar al historial. Construye un escudo para mantenerlos fuera.",
    concept: "Ignorar archivos con intención", theory: ".gitignore define patrones que Git no debe rastrear. Se versiona para que todo el equipo comparta las mismas reglas.",
    objective: "Crea .gitignore, prepáralo y crea un commit.", hint: "touch .gitignore; git add .gitignore; git commit -m \"Añade gitignore\".",
    successTitle: "Escudo activado", successText: "El repositorio ya puede excluir archivos generados, secretos y dependencias.",
    done: s => s.commits.some(c => c.files.includes(".gitignore")),
    progress: s => !s.files.includes(".gitignore") ? "Paso 1/3 · crea .gitignore" : !s.staged.includes(".gitignore") ? "Paso 2/3 · prepáralo" : "Paso 3/3 · crea el commit"
  },
  {
    id: 13, chapter: 3, title: "Leer las diferencias", short: "Inspecciona con diff", icon: "±", xp: 150,
    story: "Antes de guardar un cambio, aprende a inspeccionar exactamente qué líneas se alteraron.",
    concept: "Diff antes de commit", theory: "git diff compara el espacio de trabajo con el área de preparación. Revisarlo evita incluir cambios accidentales.",
    objective: "Crea config.js y examínalo con git diff config.js.", hint: "touch config.js; después git diff config.js.",
    successTitle: "Cambios inspeccionados", successText: "Has revisado el cambio antes de decidir qué hacer con él.",
    done: s => s.diffViewed, progress: s => !s.files.includes("config.js") ? "Paso 1/2 · crea config.js" : "Paso 2/2 · usa git diff"
  },
  {
    id: 14, chapter: 3, title: "Cancelar una alteración", short: "Restaura un archivo", icon: "↶", xp: 175,
    story: "El cambio de configuración no era correcto. Recupera la última versión registrada.",
    concept: "Restaurar sin destruir historia", theory: "git restore descarta cambios no preparados de un archivo. Es potente: úsalo solo cuando no necesites conservar esas ediciones.",
    objective: "Descarta el cambio de config.js con git restore.", hint: "git restore config.js",
    successTitle: "Archivo restaurado", successText: "config.js volvió a su estado conocido sin crear un commit innecesario.",
    done: s => s.restoredFiles.includes("config.js"), progress: s => s.restoredFiles.includes("config.js") ? "Objetivo cumplido" : "Falta restaurar config.js"
  },
  {
    id: 15, chapter: 3, title: "Cápsula temporal", short: "Guarda con stash", icon: "▣", xp: 200,
    story: "Una tarea urgente requiere cambiar de contexto. Guarda el experimento incompleto sin convertirlo en commit.",
    concept: "Trabajo temporal con stash", theory: "git stash guarda cambios locales y limpia el árbol de trabajo. Luego puedes recuperarlos con git stash pop.",
    objective: "Crea experiment.js y guárdalo con git stash.", hint: "touch experiment.js; después git stash.",
    successTitle: "Trabajo resguardado", successText: "El experimento quedó seguro en la pila de stash y el espacio de trabajo está limpio.",
    done: s => s.stashes.length > 0, progress: s => !s.files.includes("experiment.js") ? "Paso 1/2 · crea experiment.js" : "Paso 2/2 · usa git stash"
  },
  {
    id: 16, chapter: 4, title: "Marcar una versión", short: "Crea un tag", icon: "◇", xp: 175,
    story: "La primera versión estable merece una coordenada permanente en la historia.",
    concept: "Tags y versiones", theory: "Un tag identifica un commit concreto. Suele utilizarse para versiones y releases siguiendo convenciones como SemVer.",
    objective: "Crea el tag v1.0.0.", hint: "git tag v1.0.0",
    successTitle: "Versión marcada", successText: "v1.0.0 queda como referencia estable aunque las ramas continúen avanzando.",
    done: s => s.tags.includes("v1.0.0"), progress: s => s.tags.includes("v1.0.0") ? "Objetivo cumplido" : "Falta crear v1.0.0"
  },
  {
    id: 17, chapter: 4, title: "Deshacer públicamente", short: "Revierte un commit", icon: "↩", xp: 225,
    story: "Un cambio publicado debe deshacerse sin borrar la historia que el equipo ya recibió.",
    concept: "Revert conserva la historia", theory: "git revert crea un nuevo commit que invierte otro. Es la opción segura para cambios que ya fueron compartidos.",
    objective: "Revierte el último commit con git revert HEAD.", hint: "git revert HEAD",
    successTitle: "Cambio revertido", successText: "La corrección quedó registrada de forma transparente para todo el equipo.",
    done: s => s.reverted, progress: s => s.reverted ? "Objetivo cumplido" : "Falta revertir HEAD"
  },
  {
    id: 18, chapter: 4, title: "Mover la referencia", short: "Usa reset --soft", icon: "◁", xp: 225,
    story: "El último commit fue prematuro. Retíralo del historial sin perder sus cambios preparados.",
    concept: "Los tres modos de reset", theory: "reset --soft mueve la rama pero conserva los cambios en staging. --mixed los deja sin preparar y --hard también los descarta.",
    objective: "Ejecuta git reset --soft HEAD~1.", hint: "git reset --soft HEAD~1",
    successTitle: "Referencia desplazada", successText: "El commit desapareció de la rama, pero sus cambios siguen preparados.",
    done: s => s.softReset, progress: s => s.softReset ? "Objetivo cumplido" : "Falta ejecutar reset --soft"
  },
  {
    id: 19, chapter: 4, title: "La memoria secreta", short: "Consulta reflog", icon: "⌕", xp: 200,
    story: "Parece que un commit se perdió. Consulta la bitácora local de movimientos para encontrarlo.",
    concept: "Reflog como red de seguridad", theory: "reflog registra dónde apuntaron HEAD y las ramas. Permite recuperar commits que ya no aparecen en el log normal.",
    objective: "Consulta el historial de referencias con git reflog.", hint: "git reflog",
    successTitle: "Rastro recuperado", successText: "Ya sabes localizar commits aunque ninguna rama visible apunte a ellos.",
    done: s => s.reflogViewed, progress: s => s.reflogViewed ? "Objetivo cumplido" : "Consulta el reflog"
  },
  {
    id: 20, chapter: 5, title: "Trasplantar un cambio", short: "Usa cherry-pick", icon: "♢", xp: 250,
    story: "Una corrección concreta debe viajar a una rama independiente sin fusionar todo lo demás.",
    concept: "Commits seleccionados", theory: "cherry-pick aplica el cambio introducido por un commit y crea uno nuevo en la rama actual.",
    objective: "Crea y cambia a hotfix; aplica el commit a1b2c3d con cherry-pick.", hint: "git switch -c hotfix; git cherry-pick a1b2c3d",
    successTitle: "Cambio trasplantado", successText: "La corrección llegó a hotfix sin incorporar trabajo no relacionado.",
    done: s => s.cherryPicked && s.currentBranch === "hotfix", progress: s => !s.branches.includes("hotfix") ? "Paso 1/2 · crea hotfix" : "Paso 2/2 · usa cherry-pick"
  },
  {
    id: 21, chapter: 5, title: "Cazar el error", short: "Investiga con bisect", icon: "⌖", xp: 300,
    story: "Un fallo apareció en algún punto del tiempo. Reduce la búsqueda usando un recorrido binario.",
    concept: "Depuración binaria", theory: "git bisect prueba commits intermedios entre uno bueno y uno malo. En historias grandes puede ahorrar horas de investigación.",
    objective: "Inicia bisect, marca HEAD como malo y a1b2c3d como bueno.", hint: "git bisect start; git bisect bad; git bisect good a1b2c3d",
    successTitle: "Culpable localizado", successText: "La búsqueda binaria redujo toda la historia al commit que introdujo el problema.",
    done: s => s.bisect.good && s.bisect.bad, progress: s => !s.bisect.started ? "Paso 1/3 · inicia bisect" : !s.bisect.bad ? "Paso 2/3 · marca el commit malo" : "Paso 3/3 · marca uno bueno"
  },
  {
    id: 22, chapter: 5, title: "Forjar herramientas", short: "Crea un alias", icon: "⚙", xp: 225,
    story: "Los expertos adaptan Git a su flujo. Crea un comando corto para consultar una historia visual.",
    concept: "Configuración y alias", theory: "git config permite personalizar identidad, comportamiento y alias. --global aplica la preferencia a todos tus repositorios.",
    objective: "Crea el alias global lg para log --oneline --graph.", hint: "git config --global alias.lg \"log --oneline --graph\"",
    successTitle: "Herramienta forjada", successText: "git lg será tu nueva vista compacta del historial.",
    done: s => s.aliases.lg, progress: s => s.aliases.lg ? "Objetivo cumplido" : "Falta configurar alias.lg"
  },
  {
    id: 23, chapter: 5, title: "Arquitecto temporal", short: "Publica la versión final", icon: "★", xp: 400,
    story: "Integra la corrección en main y marca la versión que demuestra tu dominio del historial.",
    concept: "Una entrega profesional", theory: "Una release combina historia revisada, rama estable, etiqueta versionada y una intención clara para consumidores y equipo.",
    objective: "Vuelve a main, fusiona hotfix y crea el tag v2.0.0.", hint: "git switch main; git merge hotfix; git tag v2.0.0",
    successTitle: "Git Odyssey completado", successText: "Has pasado de inicializar un repositorio a diagnosticar, recuperar y diseñar historias profesionales.",
    done: s => s.currentBranch === "main" && s.merged.includes("hotfix") && s.tags.includes("v2.0.0"),
    progress: s => s.currentBranch !== "main" ? "Paso 1/3 · vuelve a main" : !s.merged.includes("hotfix") ? "Paso 2/3 · fusiona hotfix" : "Paso 3/3 · crea v2.0.0"
  }
);

const chapterMeta = [
  { name: "El despertar", subtitle: "Fundamentos" },
  { name: "Líneas del tiempo", subtitle: "Ramas y fusiones" },
  { name: "La red", subtitle: "Remotos y equipo" },
  { name: "Volver del vacío", subtitle: "Control y recuperación" },
  { name: "Cirugía temporal", subtitle: "Historia avanzada" },
  { name: "El núcleo de Git", subtitle: "Herramientas expertas" }
];

const commandGuide = [
  ["git init","Fundamentos","Convierte una carpeta normal en un repositorio Git creando su base de datos interna .git.","git init [carpeta]","Una página de recetas","Empiezas una web nueva y quieres guardar su historia desde el primer archivo.","mkdir mis-recetas\ncd mis-recetas\ngit init","No descarga nada ni crea un repositorio en GitHub; solo inicializa Git localmente."],
  ["git status","Fundamentos","Muestra la rama actual y clasifica los cambios como preparados, no preparados o sin seguimiento.","git status","Revisar una tienda virtual","Antes de crear un commit compruebas qué archivos cambiaste y cuáles están listos.","git status\n# modified: carrito.js\n# untracked: cupones.js","Es un comando de consulta: puedes ejecutarlo tantas veces como quieras."],
  ["touch","Terminal","Crea un archivo vacío o actualiza su fecha. Es un comando de la terminal, no de Git.","touch <archivo>","Crear documentación","Añades el archivo inicial de documentación a una biblioteca.","touch GUIA_USUARIO.md","En Windows PowerShell también puedes usar: New-Item GUIA_USUARIO.md"],
  ["git add","Fundamentos","Copia el estado actual de uno o más archivos al área de preparación para el próximo commit.","git add <archivo>  |  git add .","Preparar un formulario","Quieres confirmar solo la validación y dejar el diseño para después.","git add validacion.js\ngit status","git add . prepara muchos cambios; revisa siempre con git status para no incluir secretos."],
  ["git commit","Fundamentos","Crea una instantánea permanente con los cambios preparados y un mensaje descriptivo.","git commit -m \"mensaje\"","Guardar una mejora de accesibilidad","Registras etiquetas accesibles añadidas a un formulario.","git commit -m \"Mejora etiquetas del formulario\"","Un commit debería representar una sola intención y poder explicarse con claridad."],
  ["git diff","Inspección","Enseña las líneas cambiadas antes de prepararlas; con --staged revisa lo que entrará al commit.","git diff [archivo]  |  git diff --staged","Revisar un cálculo de impuestos","Compruebas la fórmula modificada antes de guardarla.","git diff impuestos.js\ngit diff --staged","Las líneas con + fueron añadidas y las líneas con - fueron eliminadas."],
  ["git restore","Recuperación","Descarta cambios locales o retira archivos del área de preparación.","git restore <archivo>  |  git restore --staged <archivo>","Descartar un cambio de colores","El nuevo tema no funcionó y quieres recuperar la versión confirmada.","git restore tema.css","Descarta trabajo no guardado. Usa git diff antes si no estás completamente seguro."],
  ["git log","Inspección","Recorre los commits alcanzables y muestra autor, fecha, hash y mensaje.","git log [--oneline] [--graph]","Auditar una API","Buscas cuándo se añadió un endpoint de pagos.","git log --oneline --graph --all","El hash identifica un commit y puede usarse con show, revert, cherry-pick y otros comandos."],
  ["git branch","Ramas","Lista ramas o crea un nuevo nombre que apunta al commit actual.","git branch [nombre]","Probar un buscador","Aíslas una funcionalidad experimental sin afectar la versión estable.","git branch feature/buscador","Crear la rama no te cambia a ella. Compruébalo con git branch."],
  ["git switch","Ramas","Cambia la rama activa; con -c crea una rama y se mueve a ella en un solo paso.","git switch <rama>  |  git switch -c <nueva>","Corregir un error urgente","Creas una rama para corregir un fallo de producción.","git switch -c hotfix/login","HEAD pasa a señalar la rama elegida; los nuevos commits avanzarán esa rama."],
  ["git merge","Ramas","Integra en la rama actual los commits alcanzables desde otra rama.","git merge <rama>","Integrar un nuevo buscador","Desde main incorporas una funcionalidad ya revisada.","git switch main\ngit merge feature/buscador","La dirección importa: primero cambia a la rama que recibirá los cambios."],
  ["git remote","Remotos","Administra apodos locales para URLs de otros repositorios. origin es solo el nombre convencional del remoto principal.","git remote add <apodo> <url>  |  git remote -v","Conectar un portafolio con GitHub","Tu carpeta ya tiene commits locales y quieres conectarla con un repositorio vacío de GitHub.","git remote add origin https://github.com/ana/portafolio.git\ngit remote -v","origin no es GitHub ni una copia: es un alias. Podrías llamarlo github, empresa o cualquier otro nombre."],
  ["git push","Remotos","Envía commits y referencias locales a un remoto. -u conecta la rama local con su rama remota.","git push [-u] <remoto> <rama>","Publicar el portafolio","Envías main por primera vez y dejas configurado su seguimiento.","git push -u origin main\n# después basta: git push","push no envía archivos sueltos: envía commits. Primero debes hacer add y commit."],
  ["git pull","Remotos","Trae cambios del remoto y los integra en la rama actual; equivale normalmente a fetch seguido de merge.","git pull [remoto] [rama]","Recibir cambios de un compañero","Actualizas tu copia antes de comenzar una nueva tarea.","git switch main\ngit pull origin main","Si tienes cambios locales incompatibles puede producir conflictos. Revisa status antes y después."],
  ["git rebase","Historia","Vuelve a aplicar commits sobre una base nueva para construir una historia lineal.","git rebase <rama-base>","Actualizar una rama de facturación","Pones tus commits encima del main más reciente antes de solicitar revisión.","git switch feature/facturacion\ngit rebase main","Reescribe hashes. Evítalo en ramas públicas que otras personas ya estén usando."],
  ["git stash","Recuperación","Guarda temporalmente cambios sin commit y limpia el espacio de trabajo.","git stash  |  git stash pop","Atender una urgencia","Apartas una pantalla incompleta, corriges producción y luego recuperas el trabajo.","git stash\ngit switch hotfix\n# ...\ngit stash pop","Pon un mensaje con git stash push -m \"descripción\" cuando tengas varios stashes."],
  ["git tag","Versiones","Asigna una referencia estable a un commit, normalmente para identificar una versión publicada.","git tag <versión>  |  git tag -a <versión> -m <mensaje>","Publicar una biblioteca","Marcas el commit exacto entregado como versión 2.1.0.","git tag -a v2.1.0 -m \"Versión 2.1.0\"\ngit push origin v2.1.0","Un tag no se publica automáticamente; debes enviarlo al remoto."],
  ["git revert","Recuperación","Crea un commit nuevo que invierte los cambios de otro sin borrar la historia existente.","git revert <commit>","Desactivar una promoción defectuosa","La promoción ya llegó al equipo y debes revertirla de forma auditable.","git log --oneline\ngit revert 7ac21ef","Es la opción habitual para deshacer cambios que ya fueron compartidos."],
  ["git reset","Recuperación","Mueve la rama a otro commit. --soft conserva staging; --mixed conserva archivos; --hard descarta cambios.","git reset --soft HEAD~1","Corregir un mensaje y reorganizar cambios","Retiras el último commit local pero conservas todo listo para confirmar de nuevo.","git reset --soft HEAD~1\ngit commit -m \"Mensaje correcto\"","--hard puede destruir trabajo local. No lo uses si no entiendes exactamente qué perderás."],
  ["git reflog","Recuperación","Registra los movimientos locales de HEAD y las ramas, incluso cuando los commits ya no aparecen en log.","git reflog","Recuperar un commit tras reset","Buscas el hash anterior y vuelves a crear una rama desde él.","git reflog\ngit branch recuperacion 4fd21ab","El reflog es local y expira; no sustituye un remoto ni una copia de seguridad."],
  ["git cherry-pick","Historia","Aplica en la rama actual el cambio introducido por un commit específico.","git cherry-pick <commit>","Llevar una corrección a producción","Copias solamente el arreglo urgente desde desarrollo a la rama estable.","git switch release\ngit cherry-pick a83f19c","Crea un commit nuevo con otro hash; no fusiona el resto de la rama de origen."],
  ["git bisect","Diagnóstico","Usa búsqueda binaria entre un commit bueno y uno malo para localizar dónde apareció un error.","git bisect start  →  bad  →  good <commit>","Encontrar una regresión de rendimiento","Pruebas versiones intermedias hasta identificar el commit que volvió lenta la aplicación.","git bisect start\ngit bisect bad\ngit bisect good v1.4.0\n# al terminar: git bisect reset","Puedes automatizar cada prueba con git bisect run <script>."],
  ["git config","Configuración","Consulta o cambia preferencias como identidad, editor, estrategia de pull y alias.","git config [--global] <clave> <valor>","Crear un log compacto","Defines un alias personal disponible en todos tus repositorios.","git config --global alias.lg \"log --oneline --graph --all\"\ngit lg","Usa --global para tu usuario y omítelo para cambiar solo el repositorio actual."],
  ["git clone","Remotos","Descarga un repositorio, crea la carpeta de trabajo y configura origin automáticamente.","git clone <url> [carpeta]","Unirte a un proyecto existente","Obtienes la aplicación del equipo con toda su historia y ramas remotas.","git clone https://github.com/equipo/tienda.git\ncd tienda\ngit remote -v","clone se usa cuando el repositorio remoto ya existe; remote add conecta una carpeta local existente."],
].map(([command,category,summary,syntax,exampleTitle,exampleText,exampleCode,note]) => ({ command,category,summary,syntax,exampleTitle,exampleText,exampleCode,note }));

const missionGuideMap = [0,2,3,4,8,9,4,10,11,12,13,14,3,5,6,15,16,17,18,19,20,21,22,10];

const learningLabs = [
  { title:"La ruta de un cambio", type:"Ordena el flujo", scenario:"Una diseñadora termina una mejora. Lleva el archivo desde su carpeta de trabajo hasta el historial de Git.", nodes:[["✎","Working tree","Cambio local"],["+","Staging","Cambio elegido"],["●","Repositorio","Historia guardada"]], steps:[["Editar interfaz.css",0,"El cambio nace en el espacio de trabajo; Git lo detecta, pero todavía no lo guardará."],["git add interfaz.css",1,"Ahora la versión actual del archivo está preparada para el próximo commit."],["git commit -m \"Mejora interfaz\"",2,"El commit convierte los cambios preparados en una instantánea del historial."]], distractors:["git push origin main","git branch interfaz"] },
  { title:"Construir sin romper main", type:"Simula una rama", scenario:"Desarrolla un buscador de forma aislada y solo intégralo cuando esté listo.", nodes:[["●","main","Versión estable"],["⑂","feature/buscador","Trabajo aislado"],["⋈","main","Función integrada"]], steps:[["git branch feature/buscador",0,"La rama nace apuntando al mismo commit que main."],["git switch feature/buscador",1,"HEAD cambia a la rama de trabajo; main queda quieta."],["git commit -m \"Añade buscador\"",1,"El nuevo commit avanza feature/buscador, no main."],["git switch main && git merge feature/buscador",2,"Desde main se integra la historia de la rama terminada."]], distractors:["git push --force","git reset --hard"] },
  { title:"Conectar local y origin", type:"Mueve la historia", scenario:"Tienes commits en tu computador y un repositorio vacío en GitHub. Conéctalos y sincroniza el trabajo.", nodes:[["⌂","Repositorio local","Tu computador"],["◎","origin","URL de GitHub"],["♙","Otro colaborador","Otra copia local"]], steps:[["git remote add origin URL",0,"Guardaste la URL bajo el apodo origin. Todavía no enviaste ningún commit."],["git push -u origin main",1,"Los commits locales viajan hacia origin y main queda conectada con origin/main."],["git pull origin main",2,"Pull trae e integra los commits remotos en la copia local del colaborador."]], distractors:["git init origin","git commit origin"] },
  { title:"Proteger trabajo incompleto", type:"Elige sin perder datos", scenario:"Debes pausar una tarea experimental, atender una urgencia y después dejar el archivo limpio.", nodes:[["±","Cambio","Sin preparar"],["▣","Stash","Trabajo resguardado"],["↶","Restaurado","Árbol limpio"]], steps:[["git diff experimento.js",0,"Primero inspeccionas exactamente qué cambiaría; consultar no modifica nada."],["git stash",1,"El trabajo queda temporalmente resguardado y el árbol vuelve a estar limpio."],["git restore config.js",2,"Restore descarta una modificación que decidiste no conservar."]], distractors:["git reset --hard HEAD","git push"] },
  { title:"Cirugía segura de historia", type:"Escoge la herramienta", scenario:"Publica una versión, corrige un cambio compartido y localiza una referencia aparentemente perdida.", nodes:[["◇","Versión estable","Referencia v1.0"],["↩","Corrección pública","Historia conservada"],["⌕","Rastro local","Commit recuperable"]], steps:[["git tag v1.0.0",0,"El tag fija un nombre estable en el commit de la versión publicada."],["git revert HEAD",1,"Revert crea un commit inverso sin borrar la historia que otros ya recibieron."],["git reflog",2,"Reflog revela movimientos locales aunque el commit no aparezca en git log."]], distractors:["git delete HEAD","git reset --hard origin"] },
  { title:"Cazar una regresión", type:"Reduce la búsqueda", scenario:"Entre una versión buena y HEAD apareció un error. Usa búsqueda binaria para encontrar el primer commit defectuoso.", nodes:[["↔","Todo el rango","Muchos commits"],["½","Mitad del rango","Cada vez menos"],["⌖","Commit culpable","Causa localizada"]], steps:[["git bisect start",0,"Git entra en modo de búsqueda binaria."],["git bisect bad HEAD",1,"Definiste el extremo donde el error sí existe."],["git bisect good v1.0.0",2,"Con un extremo bueno y otro malo, Git empieza a probar commits intermedios."],["git bisect reset",2,"Al terminar regresas a la rama y posición originales."]], distractors:["git merge --bisect","git blame --delete"] }
];

const freshWorld = () => ({
  repo: false, files: [], staged: [], commits: [], branches: ["main"], currentBranch: "main",
  merged: [], remotes: {}, pushed: false, conflict: false, conflictResolved: false, rebased: false,
  restoredFiles: [], stashes: [], tags: [], diffViewed: false, reverted: false, softReset: false,
  reflogViewed: false, cherryPicked: false, bisect: { started: false, bad: false, good: false }, aliases: {}
});

const saved = loadProgress();
let completed = saved.completed || [];
let xp = saved.xp || 0;
let currentMission = Math.min(saved.currentMission || 0, missions.length - 1);
let world = saved.world ? normalizeWorld(saved.world) : freshWorld();
let selectedChapter = missions[currentMission].chapter;
let commandHistory = [];
let historyIndex = 0;
let soundOn = saved.soundOn !== false;
let modalMode = "success";
let practiceMode = false;
let guideIndex = 0;
let masteredLabs = saved.masteredLabs || [];
let labChapter = -1;
let labStep = 0;

const $ = selector => document.querySelector(selector);
const els = {
  xp: $("#xpValue"), streak: $("#streakValue"), rank: $("#rankName"), level: $("#levelValue"),
  levelXp: $("#levelXp"), levelBar: $("#levelBar"), kicker: $("#missionKicker"), title: $("#missionTitle"),
  story: $("#missionStory"), reward: $("#rewardValue"), conceptIcon: $("#conceptIcon"), conceptTitle: $("#conceptTitle"),
  conceptText: $("#conceptText"), objective: $("#objectiveText"), hintText: $("#hintText"), hintPanel: $("#hintPanel"),
  output: $("#terminalOutput"), form: $("#terminalForm"), input: $("#terminalInput"), nodes: $("#missionNodes"),
  mapTitle: $("#mapTitle"), mapProgress: $("#mapProgress"), modal: $("#modal"), modalIcon: $("#modalIcon"),
  modalEyebrow: $("#modalEyebrow"), modalTitle: $("#modalTitle"), modalText: $("#modalText"),
  modalReward: $("#modalReward"), modalAction: $("#modalAction"), toast: $("#toast"),
  repoPills: $("#repoPills"), graphEmpty: $("#graphEmpty"), commitGraph: $("#commitGraph"), graphSummary: $("#graphSummary"),
  previousMission: $("#previousMission"), nextMission: $("#nextMission"), resumeMission: $("#resumeMission"), missionPosition: $("#missionPosition"),
  commandWizard: $("#commandWizard"), guideList: $("#guideList"), guideSearch: $("#guideSearch"), guideCounter: $("#guideCounter"),
  guideCategory: $("#guideCategory"), guideCommand: $("#guideCommand"), guideSummary: $("#guideSummary"), guideSyntax: $("#guideSyntax"),
  guideExampleTitle: $("#guideExampleTitle"), guideExampleText: $("#guideExampleText"), guideExampleCode: $("#guideExampleCode"),
  guideNote: $("#guideNote"), guidePrev: $("#guidePrev"), guideNext: $("#guideNext"), guideDots: $("#guideDots"),
  labTitle: $("#labTitle"), labType: $("#labType"), labScenario: $("#labScenario"), masteryBadge: $("#masteryBadge"),
  labBoard: $("#labBoard"), labDropzone: $("#labDropzone"), labActions: $("#labActions"), labFeedback: $("#labFeedback")
};

function normalizeWorld(data) {
  return { ...freshWorld(), ...data, remotes: data.remotes || {}, bisect: data.bisect || { started: false, bad: false, good: false }, aliases: data.aliases || {} };
}

function loadProgress() {
  try { return JSON.parse(localStorage.getItem("gitOdysseyProgress")) || {}; }
  catch { return {}; }
}

function saveProgress() {
  localStorage.setItem("gitOdysseyProgress", JSON.stringify({ completed, xp, currentMission, world, soundOn, masteredLabs }));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function tokenize(command) {
  const tokens = [];
  command.replace(/"([^"]*)"|'([^']*)'|(\S+)/g, (_, double, single, bare) => { tokens.push(double ?? single ?? bare); return ""; });
  return tokens;
}

function addOutput(text, type = "normal") {
  const line = document.createElement("div");
  line.className = `${type}-output`;
  line.textContent = text;
  els.output.appendChild(line);
  els.output.scrollTop = els.output.scrollHeight;
}

function addCommand(command) {
  const line = document.createElement("div");
  line.className = "command-line";
  line.textContent = command;
  els.output.appendChild(line);
}

function requireRepo() {
  if (world.repo) return true;
  addOutput("fatal: no es un repositorio git (ni ninguno de los directorios superiores)", "error");
  return false;
}

function shortHash(index = world.commits.length) {
  return ((index + 1) * 2654435761 >>> 0).toString(16).slice(0, 7).padEnd(7, "a");
}

function executeCommand(raw) {
  const command = raw.trim();
  if (!command) return;
  addCommand(command);
  commandHistory.push(command);
  historyIndex = commandHistory.length;
  const args = tokenize(command);
  const lower = args.map(v => v.toLowerCase());

  if (lower[0] === "help") {
    addOutput("COMANDOS DISPONIBLES\n  git init · status · add · commit · diff · restore · log · reflog\n  git branch · switch · merge · rebase · cherry-pick · bisect\n  git remote · push · pull · stash · tag · revert · reset · config\n  touch <archivo> · ls · pwd · clear · mission\n\nJUEGO\n  guia       Abre el manual con ejemplos externos\n  reiniciar  Borra todo el progreso después de confirmar", "normal");
    return;
  }
  if (lower[0] === "clear") { clearTerminal(); return; }
  if (lower[0] === "pwd") { addOutput("/home/explorer/odyssey"); return; }
  if (lower[0] === "ls") { addOutput(world.files.length ? world.files.join("  ") : "(carpeta vacía)"); return; }
  if (lower[0] === "mission") { addOutput(missions[currentMission].objective); return; }
  if (lower[0] === "guia" || lower[0] === "guide") { openGuide(); return; }
  if (lower[0] === "reiniciar" || lower[0] === "reset-game") { showResetConfirmation(); return; }
  if (lower[0] === "touch") {
    if (!args[1]) { addOutput("touch: falta el nombre del archivo", "error"); return; }
    if (!world.files.includes(args[1])) world.files.push(args[1]);
    addOutput(`Archivo creado: ${args[1]}`, "success");
    afterCommand(); return;
  }
  if (lower[0] !== "git") {
    addOutput(`${args[0]}: comando no reconocido. Escribe help para recibir ayuda.`, "error");
    errorTone(); return;
  }

  const sub = lower[1];
  if (sub === "init") {
    if (world.repo) addOutput("Repositorio Git existente reinicializado en /home/explorer/odyssey/.git/");
    else { world.repo = true; addOutput("Repositorio Git vacío inicializado en /home/explorer/odyssey/.git/", "success"); }
    afterCommand(); return;
  }
  if (!requireRepo()) { errorTone(); return; }

  if (sub === "status") {
    const untracked = world.files.filter(file => !world.staged.includes(file) && !world.commits.some(c => c.files.includes(file)));
    let text = `En la rama ${world.currentBranch}\n`;
    if (world.conflict && !world.conflictResolved) text += "Tienes rutas sin fusionar.\n  ambos modificados: README.md\n";
    if (world.staged.length) text += `Cambios preparados para commit:\n  ${world.staged.join("\n  ")}\n`;
    if (untracked.length) text += `Archivos sin seguimiento:\n  ${untracked.join("\n  ")}\n`;
    if (!world.staged.length && !untracked.length && !world.conflict) text += "nada para hacer commit, el árbol de trabajo está limpio";
    addOutput(text); return;
  }
  if (sub === "diff") {
    const file = args[2] || world.files.find(f => !world.staged.includes(f));
    if (!file || !world.files.includes(file)) { addOutput("No hay diferencias para mostrar."); return; }
    world.diffViewed = true;
    addOutput(`diff --git a/${file} b/${file}\n--- a/${file}\n+++ b/${file}\n@@ -0,0 +1 @@\n+ cambio local sin preparar`, "success");
    afterCommand(); return;
  }
  if (sub === "restore") {
    const file = args[2];
    if (!file || !world.files.includes(file)) { addOutput("error: indica un archivo existente para restaurar", "error"); return; }
    if (!world.restoredFiles.includes(file)) world.restoredFiles.push(file);
    addOutput(`Cambios descartados en '${file}'.`, "success"); afterCommand(); return;
  }
  if (sub === "stash") {
    const pending = world.files.filter(file => !world.commits.some(c => c.files.includes(file)));
    if (!pending.length && !world.staged.length) { addOutput("No hay cambios locales para guardar"); return; }
    world.stashes.push({ message: `WIP on ${world.currentBranch}`, files: [...new Set([...pending, ...world.staged])] });
    world.files = world.files.filter(file => !pending.includes(file)); world.staged = [];
    addOutput(`Estado de trabajo y del índice guardado WIP on ${world.currentBranch}`, "success"); afterCommand(); return;
  }
  if (sub === "tag") {
    const tag = args[2];
    if (!tag) { addOutput(world.tags.length ? world.tags.join("\n") : "No hay tags."); return; }
    if (world.tags.includes(tag)) { addOutput(`fatal: el tag '${tag}' ya existe`, "error"); return; }
    world.tags.push(tag); addOutput(`Tag '${tag}' creado.`, "success"); afterCommand(); return;
  }
  if (sub === "revert") {
    if (!args[2]) { addOutput("uso: git revert <commit>", "error"); return; }
    const hash = shortHash();
    world.commits.push({ hash, message: `Revert de ${args[2]}`, branch: world.currentBranch, files: [] });
    world.reverted = true; addOutput(`[${world.currentBranch} ${hash}] Revert de ${args[2]}`, "success"); afterCommand(); return;
  }
  if (sub === "reset") {
    if (lower[2] !== "--soft" || lower[3] !== "head~1") { addOutput("En este entorno usa: git reset --soft HEAD~1", "error"); return; }
    const removed = world.commits.pop();
    if (removed) removed.files.forEach(file => { if (!world.staged.includes(file)) world.staged.push(file); });
    world.softReset = true; addOutput("HEAD desplazado un commit; los cambios permanecen preparados.", "success"); afterCommand(); return;
  }
  if (sub === "reflog") {
    world.reflogViewed = true;
    const rows = world.commits.slice(-4).reverse().map((c, i) => `${c.hash} HEAD@{${i}}: commit: ${c.message}`);
    rows.push(`a1b2c3d HEAD@{${rows.length}}: reset: moving to HEAD~1`);
    addOutput(rows.join("\n")); afterCommand(); return;
  }
  if (sub === "cherry-pick") {
    const source = args[2];
    if (!source) { addOutput("uso: git cherry-pick <commit>", "error"); return; }
    const hash = shortHash(); world.commits.push({ hash, message: `Corrección desde ${source}`, branch: world.currentBranch, files: ["hotfix.js"] });
    if (!world.files.includes("hotfix.js")) world.files.push("hotfix.js");
    world.cherryPicked = true; addOutput(`[${world.currentBranch} ${hash}] Corrección aplicada desde ${source}`, "success"); afterCommand(); return;
  }
  if (sub === "bisect") {
    const action = lower[2];
    if (action === "start") { world.bisect = { started: true, bad: false, good: false }; addOutput("Estado de bisect iniciado.", "success"); }
    else if (!world.bisect.started) { addOutput("Debes ejecutar git bisect start primero.", "error"); return; }
    else if (action === "bad") { world.bisect.bad = true; addOutput("HEAD marcado como malo.", "success"); }
    else if (action === "good" && args[3]) { world.bisect.good = true; addOutput(`${args[3]} marcado como bueno.\n${shortHash(1)} es el primer commit defectuoso.`, "success"); }
    else { addOutput("uso: git bisect start|bad|good <commit>", "error"); return; }
    afterCommand(); return;
  }
  if (sub === "config") {
    const aliasIndex = lower.findIndex(v => v.startsWith("alias."));
    if (aliasIndex < 0 || !args[aliasIndex + 1]) { addOutput("uso: git config --global alias.<nombre> <comando>", "error"); return; }
    const name = args[aliasIndex].split(".")[1]; world.aliases[name] = args[aliasIndex + 1];
    addOutput(`Alias '${name}' configurado como '${world.aliases[name]}'.`, "success"); afterCommand(); return;
  }
  if (sub === "add") {
    const target = args[2];
    if (!target) { addOutput("Nada especificado, nada añadido. Indica un archivo o usa git add .", "error"); return; }
    let targets = target === "." ? [...world.files] : [target];
    const missing = targets.find(file => !world.files.includes(file));
    if (missing) { addOutput(`fatal: la ruta '${missing}' no coincide con ningún archivo`, "error"); errorTone(); return; }
    targets.forEach(file => { if (!world.staged.includes(file)) world.staged.push(file); });
    if (world.conflict && targets.includes("README.md")) addOutput("Conflicto marcado como resuelto. Falta crear el commit.", "success");
    else addOutput(`Cambios preparados: ${targets.join(", ")}`, "success");
    afterCommand(); return;
  }
  if (sub === "commit") {
    const mIndex = lower.indexOf("-m");
    const message = mIndex >= 0 ? args[mIndex + 1] : "";
    if (!message) { addOutput("error: debes proporcionar un mensaje con -m", "error"); errorTone(); return; }
    if (!world.staged.length) { addOutput("nada añadido al commit (usa git add)", "error"); errorTone(); return; }
    const hash = shortHash();
    const files = [...world.staged];
    world.commits.push({ hash, message, branch: world.currentBranch, files });
    world.staged = [];
    if (world.conflict) { world.conflict = false; world.conflictResolved = true; }
    addOutput(`[${world.currentBranch} ${hash}] ${message}\n ${files.length} archivo(s) cambiado(s)`, "success");
    afterCommand(); return;
  }
  if (sub === "log") {
    if (!world.commits.length) { addOutput("fatal: tu rama actual todavía no tiene commits", "error"); return; }
    const log = [...world.commits].reverse().map((c, i) => `commit ${c.hash}${i === 0 ? ` (HEAD -> ${world.currentBranch})` : ""}\n    ${c.message}`).join("\n\n");
    addOutput(log); return;
  }
  if (sub === "branch") {
    if (!args[2]) {
      addOutput(world.branches.map(b => `${b === world.currentBranch ? "*" : " "} ${b}`).join("\n")); return;
    }
    const branch = args[2];
    if (world.branches.includes(branch)) { addOutput(`fatal: ya existe una rama llamada '${branch}'`, "error"); return; }
    world.branches.push(branch);
    addOutput(`Rama '${branch}' creada.`, "success");
    afterCommand(); return;
  }
  if (sub === "switch" || sub === "checkout") {
    const create = lower[2] === "-c" || lower[2] === "-b";
    const branch = create ? args[3] : args[2];
    if (!branch) { addOutput("fatal: se esperaba el nombre de una rama", "error"); return; }
    if (create && !world.branches.includes(branch)) world.branches.push(branch);
    if (!world.branches.includes(branch)) { addOutput(`fatal: referencia no válida: ${branch}`, "error"); errorTone(); return; }
    world.currentBranch = branch;
    addOutput(`${create ? "Creada y cambiada" : "Cambiado"} a la rama '${branch}'`, "success");
    afterCommand(); return;
  }
  if (sub === "merge") {
    const branch = args[2];
    if (!branch || !world.branches.includes(branch)) { addOutput("merge: debes indicar una rama existente", "error"); return; }
    if (branch === world.currentBranch) { addOutput("Ya está actualizado."); return; }
    if (!world.merged.includes(branch)) world.merged.push(branch);
    addOutput(`Actualizando ${shortHash(0)}..${shortHash()}\nFast-forward\n nav.js | 1 +`, "success");
    afterCommand(); return;
  }
  if (sub === "remote") {
    if (lower[2] === "add") {
      const name = args[3], url = args[4];
      if (!name || !url) { addOutput("uso: git remote add <nombre> <url>", "error"); return; }
      if (world.remotes[name]) { addOutput(`error: el remoto ${name} ya existe`, "error"); return; }
      world.remotes[name] = url;
      addOutput(`Remoto '${name}' añadido.`, "success"); afterCommand(); return;
    }
    if (lower[2] === "-v") {
      const rows = Object.entries(world.remotes).flatMap(([name, url]) => [`${name}\t${url} (fetch)`, `${name}\t${url} (push)`]);
      addOutput(rows.length ? rows.join("\n") : "No hay remotos configurados."); return;
    }
  }
  if (sub === "push") {
    if (!world.remotes.origin) { addOutput("fatal: 'origin' no parece ser un repositorio git", "error"); return; }
    const hasUpstream = lower.includes("-u") || lower.includes("--set-upstream");
    if (!hasUpstream && !world.pushed) { addOutput("fatal: la rama actual no tiene una rama upstream", "error"); return; }
    world.pushed = true;
    addOutput("Enumerando objetos: listo.\nTo https://github.com/odyssey/nave.git\n * [new branch] main -> main\nRama 'main' configurada para rastrear 'origin/main'.", "success");
    afterCommand(); return;
  }
  if (sub === "pull") {
    if (!world.remotes.origin) { addOutput("fatal: no se pudo leer del repositorio remoto", "error"); return; }
    if (!world.conflictResolved) {
      world.conflict = true;
      addOutput("Auto-fusionando README.md\nCONFLICTO (contenido): conflicto de fusión en README.md\nLa fusión automática falló; corrige los conflictos y confirma el resultado.", "error");
    } else addOutput("Ya está actualizado.", "success");
    afterCommand(); return;
  }
  if (sub === "rebase") {
    const base = args[2];
    if (!base || !world.branches.includes(base)) { addOutput("fatal: rama base no válida", "error"); return; }
    if (base === world.currentBranch) { addOutput("La rama actual ya está actualizada."); return; }
    world.rebased = true;
    addOutput(`Rama '${world.currentBranch}' rebasada y actualizada correctamente.`, "success");
    afterCommand(); return;
  }

  addOutput(`git: '${args.slice(1).join(" ")}' no es un comando simulado. Escribe help.`, "error");
  errorTone();
}

function afterCommand() {
  saveProgress();
  renderMissionProgress();
  renderGraph();
  if (!practiceMode && missions[currentMission].done(world)) completeMission();
}

function completeMission() {
  const mission = missions[currentMission];
  const firstCompletion = !completed.includes(mission.id);
  if (firstCompletion) {
    completed.push(mission.id);
    xp += mission.xp;
    successTone();
  }
  saveProgress();
  renderStats();
  renderMap();
  modalMode = "success";
  els.modalIcon.textContent = mission.id === missions.length - 1 ? "★" : "✓";
  els.modalEyebrow.textContent = mission.id === missions.length - 1 ? "CAMPAÑA COMPLETADA" : "MISIÓN COMPLETADA";
  els.modalTitle.textContent = mission.successTitle;
  els.modalText.textContent = mission.successText;
  els.modalReward.textContent = firstCompletion ? `+${mission.xp} XP` : "MISIÓN REPASADA";
  els.modalReward.hidden = false;
  els.modalAction.innerHTML = mission.id === missions.length - 1 ? "Volver al mapa <span>→</span>" : "Siguiente misión <span>→</span>";
  els.modal.hidden = false;
}

function showTheory() {
  const mission = missions[currentMission];
  modalMode = "theory";
  els.modalIcon.textContent = mission.icon;
  els.modalEyebrow.textContent = "CONCEPTO CLAVE";
  els.modalTitle.textContent = mission.concept;
  els.modalText.textContent = mission.theory;
  els.modalReward.hidden = true;
  els.modalAction.textContent = "Entendido, volvamos a la terminal";
  els.modal.hidden = false;
}

function openGuide(index = missionGuideMap[currentMission] ?? 0) {
  guideIndex = Math.max(0, Math.min(index, commandGuide.length - 1));
  els.guideSearch.value = "";
  els.commandWizard.hidden = false;
  renderGuide();
  renderGuideList();
  setTimeout(() => els.guideSearch.focus(), 50);
}

function closeGuide() {
  els.commandWizard.hidden = true;
  els.input.focus();
}

function renderGuide() {
  const item = commandGuide[guideIndex];
  els.guideCounter.textContent = `${String(guideIndex + 1).padStart(2,"0")} / ${commandGuide.length}`;
  els.guideCategory.textContent = item.category.toUpperCase();
  els.guideCommand.textContent = item.command;
  els.guideSummary.textContent = item.summary;
  els.guideSyntax.textContent = item.syntax;
  els.guideExampleTitle.textContent = item.exampleTitle;
  els.guideExampleText.textContent = item.exampleText;
  els.guideExampleCode.textContent = item.exampleCode;
  els.guideNote.textContent = item.note;
  els.guidePrev.disabled = guideIndex === 0;
  els.guideNext.disabled = guideIndex === commandGuide.length - 1;
  els.guideNext.textContent = guideIndex === commandGuide.length - 1 ? "Fin de la guía" : "Siguiente →";
  els.guideDots.innerHTML = commandGuide.map((_, index) => `<i class="${index === guideIndex ? "active" : ""}"></i>`).join("");
  const active = els.guideList.querySelector(`[data-guide-index="${guideIndex}"]`);
  if (active) active.scrollIntoView({ block: "nearest" });
}

function renderGuideList() {
  const query = els.guideSearch.value.trim().toLowerCase();
  els.guideList.innerHTML = "";
  commandGuide.forEach((item, index) => {
    if (query && !`${item.command} ${item.category} ${item.summary}`.toLowerCase().includes(query)) return;
    const button = document.createElement("button");
    button.className = `guide-list-item ${index === guideIndex ? "active" : ""}`;
    button.dataset.guideIndex = index;
    button.innerHTML = `<span>${String(index + 1).padStart(2,"0")}</span>${escapeHtml(item.command)}`;
    button.addEventListener("click", () => { guideIndex = index; renderGuide(); renderGuideList(); });
    els.guideList.appendChild(button);
  });
  if (!els.guideList.children.length) els.guideList.innerHTML = `<p class="muted-line">No se encontró ese comando.</p>`;
}

function showResetConfirmation() {
  modalMode = "reset";
  els.modalIcon.textContent = "↻";
  els.modalEyebrow.textContent = "REINICIAR AVENTURA";
  els.modalTitle.textContent = "¿Borrar todo el progreso?";
  els.modalText.textContent = "Se eliminarán las 24 misiones completadas, XP, rango y todo el estado del repositorio simulado. Esta acción no se puede deshacer.";
  els.modalReward.hidden = true;
  els.modalAction.textContent = "Sí, comenzar desde cero";
  els.modal.hidden = false;
}

function resetGame() {
  localStorage.removeItem("gitOdysseyProgress");
  completed = [];
  xp = 0;
  currentMission = 0;
  selectedChapter = 0;
  world = freshWorld();
  practiceMode = false;
  masteredLabs = [];
  labChapter = -1;
  labStep = 0;
  modalMode = "success";
  els.modal.hidden = true;
  $("#practiceButton").textContent = "Abrir";
  clearTerminal();
  renderAll();
  saveProgress();
  showToast("Aventura reiniciada. Bienvenido de nuevo, aprendiz.");
  els.input.focus();
}

function closeModal(advance = false) {
  els.modal.hidden = true;
  if (advance && modalMode === "success" && currentMission < missions.length - 1) {
    currentMission += 1;
    selectedChapter = missions[currentMission].chapter;
    saveProgress();
    renderAll();
    clearTerminal();
    els.input.focus();
  }
}

function renderAll() {
  renderMission(); renderStats(); renderMap(); renderChapterButtons(); renderGraph(); renderLevelNavigation(); renderLab();
}

function renderLab(feedback = "") {
  if (labChapter !== selectedChapter) {
    labChapter = selectedChapter;
    labStep = masteredLabs.includes(labChapter) ? learningLabs[labChapter].steps.length : 0;
  }
  const lab = learningLabs[labChapter];
  const finished = labStep >= lab.steps.length;
  const passedTargets = lab.steps.slice(0, labStep).map(step => step[1]);
  const activeTarget = finished ? -1 : lab.steps[labStep][1];
  els.labTitle.textContent = lab.title;
  els.labType.textContent = lab.type.toUpperCase();
  els.labScenario.textContent = lab.scenario;
  els.masteryBadge.classList.toggle("mastered", masteredLabs.includes(labChapter));
  els.masteryBadge.innerHTML = masteredLabs.includes(labChapter) ? "<span>◆</span><b>Concepto dominado</b>" : "<span>◇</span><b>Concepto por dominar</b>";
  els.labBoard.innerHTML = lab.nodes.map((node,index) => `<div class="lab-node ${passedTargets.includes(index) ? "complete" : index === activeTarget ? "active" : ""}"><i>${escapeHtml(node[0])}</i><b>${escapeHtml(node[1])}</b><small>${escapeHtml(node[2])}</small></div>`).join("");
  const used = lab.steps.slice(0,labStep).map(step => step[0]);
  const actions = [...lab.steps.map(step => step[0]), ...lab.distractors];
  els.labActions.innerHTML = actions.map(action => `<button class="lab-action ${used.includes(action) ? "used" : ""}" draggable="${!used.includes(action)}" data-lab-action="${escapeHtml(action)}">${escapeHtml(action)}</button>`).join("");
  els.labActions.querySelectorAll(".lab-action:not(.used)").forEach(button => {
    button.addEventListener("click", () => attemptLabAction(button.dataset.labAction, button));
    button.addEventListener("dragstart", event => { event.dataTransfer.setData("text/plain", button.dataset.labAction); event.dataTransfer.effectAllowed = "move"; });
  });
  els.labFeedback.className = `lab-feedback ${finished || feedback ? "success" : ""}`;
  els.labFeedback.textContent = feedback || (finished ? "Laboratorio completado. Ya no solo conoces los comandos: comprendes cómo transforman el estado de Git." : `Paso ${labStep + 1} de ${lab.steps.length}: decide qué acción corresponde ahora.`);
  els.labDropzone.innerHTML = finished ? "<span>✓</span><p>Secuencia completada</p>" : "<span>+</span><p>Ejecutar la siguiente acción aquí</p>";
}

function attemptLabAction(action, button) {
  const lab = learningLabs[labChapter];
  if (labStep >= lab.steps.length) return;
  const expected = lab.steps[labStep];
  if (action !== expected[0]) {
    button?.classList.add("wrong");
    setTimeout(() => button?.classList.remove("wrong"), 450);
    els.labFeedback.className = "lab-feedback error";
    els.labFeedback.textContent = `Esa acción todavía no corresponde. Observa el estado resaltado y piensa qué debe existir antes de ejecutar «${action}».`;
    errorTone();
    return;
  }
  labStep += 1;
  if (labStep >= lab.steps.length && !masteredLabs.includes(labChapter)) {
    masteredLabs.push(labChapter);
    saveProgress();
    successTone();
  } else tone(540,.08);
  renderLab(expected[2]);
}

function furthestUnlockedMission() {
  if (!completed.length) return 0;
  return Math.min(Math.max(...completed) + 1, missions.length - 1);
}

function goToMission(id) {
  const target = Math.max(0, Math.min(Number(id), furthestUnlockedMission()));
  currentMission = target;
  selectedChapter = missions[target].chapter;
  practiceMode = false;
  $("#practiceButton").textContent = "Abrir";
  saveProgress();
  renderAll();
  clearTerminal();
  window.scrollTo({ top: 0, behavior: "smooth" });
  els.input.focus();
}

function renderLevelNavigation() {
  const furthest = furthestUnlockedMission();
  els.missionPosition.textContent = `Misión ${currentMission + 1} de ${missions.length}`;
  els.previousMission.disabled = currentMission === 0;
  els.nextMission.disabled = currentMission >= furthest;
  els.resumeMission.hidden = currentMission === furthest;
  if (!els.resumeMission.hidden) els.resumeMission.textContent = `↗ Volver a mi progreso · Misión ${furthest + 1}`;
}

function renderMission() {
  const m = missions[currentMission];
  els.kicker.textContent = `CAPÍTULO ${m.chapter + 1} · MISIÓN ${(m.id % 4) + 1}`;
  els.title.textContent = m.title;
  els.story.textContent = m.story;
  els.reward.textContent = m.xp;
  els.conceptIcon.textContent = m.icon;
  els.conceptTitle.textContent = m.concept;
  els.conceptText.textContent = m.theory;
  els.objective.textContent = m.objective;
  els.hintText.textContent = m.hint;
  els.hintPanel.hidden = true;
  renderMissionProgress();
}

function renderMissionProgress() {
  const m = missions[currentMission];
  const status = m.progress(world);
  els.objective.textContent = `${m.objective} · ${status}`;
}

function renderStats() {
  const level = Math.floor(xp / 300) + 1;
  const levelCurrent = xp % 300;
  const ranks = ["Aprendiz", "Explorador", "Navegante", "Integrador", "Guardián", "Restaurador", "Cirujano temporal", "Depurador", "Maestro Git", "Arquitecto temporal", "Leyenda del código", "Experto Git", "Comandante Odyssey"];
  els.xp.textContent = xp.toLocaleString("es-CO");
  els.streak.textContent = completed.length;
  els.level.textContent = level;
  els.levelXp.textContent = `${levelCurrent} / 300 XP`;
  els.levelBar.style.width = `${levelCurrent / 3}%`;
  els.rank.textContent = ranks[Math.min(Math.floor(completed.length / 2), ranks.length - 1)];
}

function renderGraph() {
  els.repoPills.innerHTML = world.branches.map(branch => `<span class="repo-pill ${branch === world.currentBranch ? "active" : ""}">${branch === world.currentBranch ? "HEAD → " : ""}${escapeHtml(branch)}</span>`).join("");
  els.graphEmpty.hidden = world.commits.length > 0;
  els.commitGraph.hidden = world.commits.length === 0;
  els.commitGraph.innerHTML = world.commits.map((commit, index) => {
    const isHead = index === world.commits.length - 1;
    const refs = isHead ? [world.currentBranch, ...world.tags.slice(-2)].join(" · ") : "";
    return `<div class="graph-commit ${isHead ? "head" : ""}" title="${escapeHtml(commit.message)}"><span class="graph-ref">${escapeHtml(refs)}</span><i class="graph-dot"></i><span class="graph-message">${escapeHtml(commit.hash)} · ${escapeHtml(commit.message)}</span></div>`;
  }).join("");
  els.graphSummary.textContent = `${world.commits.length} commit${world.commits.length === 1 ? "" : "s"} · ${world.branches.length} rama${world.branches.length === 1 ? "" : "s"} · ${world.tags.length} tag${world.tags.length === 1 ? "" : "s"}`;
  const shell = els.commitGraph.parentElement;
  if (world.commits.length) requestAnimationFrame(() => { shell.scrollLeft = shell.scrollWidth; });
}

function renderMap() {
  const chapter = selectedChapter;
  const chapterMissions = missions.filter(m => m.chapter === chapter);
  const completeInChapter = chapterMissions.filter(m => completed.includes(m.id)).length;
  els.mapTitle.textContent = `Capítulo ${chapter + 1} · ${chapterMeta[chapter].name}`;
  els.mapProgress.textContent = `${Math.round(completeInChapter / chapterMissions.length * 100)}% completado`;
  els.nodes.innerHTML = "";
  chapterMissions.forEach(mission => {
    const isComplete = completed.includes(mission.id);
    const unlocked = mission.id === 0 || completed.includes(mission.id - 1) || isComplete;
    const node = document.createElement("button");
    node.className = `mission-node ${isComplete ? "complete" : mission.id === currentMission ? "current" : unlocked ? "unlocked" : "locked"}`;
    node.disabled = !unlocked;
    node.innerHTML = `<span class="node-dot">${isComplete ? "✓" : String((mission.id % 4) + 1).padStart(2, "0")}</span><b>${escapeHtml(mission.title)}</b><small>${escapeHtml(mission.short)}</small>`;
    node.addEventListener("click", () => goToMission(mission.id));
    els.nodes.appendChild(node);
  });
  chapterMeta.forEach((_, index) => {
    const count = missions.filter(m => m.chapter === index && completed.includes(m.id)).length;
    $(`#chapterProgress${index}`).textContent = `${count}/4`;
  });
}

function renderChapterButtons() {
  document.querySelectorAll(".chapter").forEach(button => button.classList.toggle("active", Number(button.dataset.chapter) === selectedChapter));
}

function clearTerminal() {
  els.output.innerHTML = `<div class="boot-line">Git Odyssey Terminal v1.0</div><div class="muted-line">Escribe <strong>help</strong> para ver comandos disponibles.</div><div class="spacer"></div>`;
}

function resetMissionState() {
  if (completed.length) {
    showToast("El mundo conserva las misiones completadas. Usa el mapa para repasarlas.");
    return;
  }
  world = freshWorld(); saveProgress(); clearTerminal(); renderAll(); addOutput("Entorno reiniciado.", "success");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 2800);
}

function tone(frequency, duration = .08) {
  if (!soundOn) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + duration);
  } catch { /* El audio es un detalle opcional. */ }
}

function successTone() { tone(620, .12); setTimeout(() => tone(820, .14), 90); }
function errorTone() { tone(180, .12); }

els.form.addEventListener("submit", event => {
  event.preventDefault();
  const command = els.input.value;
  els.input.value = "";
  executeCommand(command);
});

els.input.addEventListener("keydown", event => {
  if (event.key === "ArrowUp") {
    event.preventDefault(); historyIndex = Math.max(0, historyIndex - 1); els.input.value = commandHistory[historyIndex] || "";
  } else if (event.key === "ArrowDown") {
    event.preventDefault(); historyIndex = Math.min(commandHistory.length, historyIndex + 1); els.input.value = commandHistory[historyIndex] || "";
  } else if (event.key === "Tab") {
    event.preventDefault();
    const options = ["git init", "git status", "git add ", "git commit -m \"\"", "git diff ", "git restore ", "git log", "git reflog", "git branch ", "git switch ", "git merge ", "git remote add origin ", "git push -u origin main", "git pull origin main", "git rebase main", "git stash", "git tag ", "git revert HEAD", "git reset --soft HEAD~1", "git cherry-pick ", "git bisect start", "git config --global alias.lg \"log --oneline --graph\"", "touch "];
    const match = options.find(option => option.startsWith(els.input.value) && option !== els.input.value);
    if (match) { els.input.value = match; els.input.setSelectionRange(match.includes('""') ? match.length - 1 : match.length, match.includes('""') ? match.length - 1 : match.length); }
  }
});

$("#hintButton").addEventListener("click", () => { els.hintPanel.hidden = !els.hintPanel.hidden; if (!els.hintPanel.hidden) showToast("Las pistas no descuentan XP. Aprender es el objetivo."); });
$("#theoryButton").addEventListener("click", showTheory);
$("#resetTerminal").addEventListener("click", clearTerminal);
$("#modalClose").addEventListener("click", () => closeModal(false));
els.modalAction.addEventListener("click", () => modalMode === "reset" ? resetGame() : closeModal(true));
els.modal.addEventListener("click", event => { if (event.target === els.modal) closeModal(false); });
$("#soundButton").addEventListener("click", event => {
  soundOn = !soundOn; saveProgress(); event.currentTarget.textContent = soundOn ? "♪" : "×"; showToast(soundOn ? "Sonidos activados" : "Sonidos desactivados"); if (soundOn) tone(500);
});
$("#menuButton").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
document.querySelectorAll(".chapter").forEach(button => button.addEventListener("click", () => {
  const chapter = Number(button.dataset.chapter);
  const candidates = missions.filter(mission => mission.chapter === chapter && mission.id <= furthestUnlockedMission());
  selectedChapter = chapter;
  if (candidates.length) {
    const nextOpen = candidates.find(mission => !completed.includes(mission.id));
    goToMission((nextOpen || candidates[candidates.length - 1]).id);
  } else { renderMap(); renderChapterButtons(); }
  if (window.innerWidth <= 1000) $("#sidebar").classList.remove("open");
}));
els.previousMission.addEventListener("click", () => goToMission(currentMission - 1));
els.nextMission.addEventListener("click", () => goToMission(currentMission + 1));
els.resumeMission.addEventListener("click", () => goToMission(furthestUnlockedMission()));
$("#practiceButton").addEventListener("click", () => {
  practiceMode = !practiceMode;
  $("#practiceButton").textContent = practiceMode ? "Salir" : "Abrir";
  showToast(practiceMode ? "Modo práctica activo: los comandos no completan misiones." : "Has vuelto a la campaña.");
  els.input.focus();
});
$("#resetProgressButton").addEventListener("click", showResetConfirmation);
$("#commandGuideButton").addEventListener("click", () => openGuide());
$("#guideClose").addEventListener("click", closeGuide);
els.commandWizard.addEventListener("click", event => { if (event.target === els.commandWizard) closeGuide(); });
els.guideSearch.addEventListener("input", renderGuideList);
els.guidePrev.addEventListener("click", () => { if (guideIndex > 0) { guideIndex -= 1; renderGuide(); renderGuideList(); } });
els.guideNext.addEventListener("click", () => { if (guideIndex < commandGuide.length - 1) { guideIndex += 1; renderGuide(); renderGuideList(); } });
$("#labReset").addEventListener("click", () => { labChapter = selectedChapter; labStep = 0; renderLab("Laboratorio reiniciado. Construye nuevamente la secuencia desde el principio."); });
els.labDropzone.addEventListener("dragover", event => { event.preventDefault(); els.labDropzone.classList.add("dragover"); });
els.labDropzone.addEventListener("dragleave", () => els.labDropzone.classList.remove("dragover"));
els.labDropzone.addEventListener("drop", event => {
  event.preventDefault();
  els.labDropzone.classList.remove("dragover");
  const action = event.dataTransfer.getData("text/plain");
  const button = [...els.labActions.querySelectorAll(".lab-action")].find(item => item.dataset.labAction === action);
  if (action) attemptLabAction(action, button);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !els.commandWizard.hidden) closeGuide();
  else if (event.key === "Escape" && !els.modal.hidden) closeModal(false);
  else if (!els.commandWizard.hidden && event.key === "ArrowLeft" && document.activeElement !== els.guideSearch) els.guidePrev.click();
  else if (!els.commandWizard.hidden && event.key === "ArrowRight" && document.activeElement !== els.guideSearch) els.guideNext.click();
});

$("#soundButton").textContent = soundOn ? "♪" : "×";
renderAll();
