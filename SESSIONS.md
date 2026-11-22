# SESSIONS.md

Bitácora append-only del proyecto. Las entradas se agregan al final y nunca se eliminan.
Las reglas permanentes se promueven a `AGENTS.md`.

## 2026-11-01 — Sesión 001: Inicialización y definición de reglas

### Objetivo

- Definir las reglas del proyecto y el contexto inicial de la migración de WordPress a Astro.
- Crear `AGENTS.md` y `SESSIONS.md`.

### Contexto y hallazgos

- El proyecto Astro es un starter mínimo: solo existe `src/pages/index.astro`.
- Astro 7.4.4, Vite 8.3.5, Node v24.16.0, pnpm 11.18.0.
- Salida estática, sin adaptador ni integraciones instaladas.
- TypeScript en modo estricto mediante `astro/tsconfigs/strict`.
- No hay scripts de pruebas, lint ni typecheck. La verificación disponible es `pnpm build`.
- No existe `.git`: la copia actual no es un repositorio Git.
- La fuente de la migración está en `C:\xampp\htdocs\sucem.com`.
  - URL histórica: `http://localhost/sucem.com`. Dominio: `sucem.com.mx`.
  - WordPress 6.7.2, tema Astra, Elementor + Elementor Pro, Essential Addons,
    Revolution Slider, Sticky Menu y Contact Form 7.
  - DB MariaDB `sudb`, prefijo `wp_`; MySQL no está corriendo por defecto.
  - Medios: 65 archivos (~13.4 MB) en `wp-content/uploads`.
  - Respaldos: `wp-content/ai1wm-backups/*.wpress` (~182.8 MB) y `wp-content/updraft/*`.
- Se descartó `C:\xampp\htdocs\sucemmaqueta.com`: copia antigua con Avada y DB `sucemdb`.
- No hay `astro` global; los comandos deben ejecutarse con `pnpm astro ...`.
- En PowerShell, `pnpm.ps1` puede estar bloqueado; se usa `pnpm.cmd ...` o
  `cmd /c "pnpm ..."`.

### Decisiones

- Migración 1:1 del sitio actual; el rediseño se hará después.
- Sitio informativo, sin interacciones por ahora.
- Todo el contenido, la interfaz y la comunicación con el usuario en español.
- Nomenclatura del proyecto en español, incluidas carpetas, archivos, variables,
  funciones, tipos, clases CSS y frontmatter. Excepciones documentadas en `AGENTS.md`
  para rutas reservadas, configuración y APIs del framework.
- Arquitectura modular por módulo/feature, con separación entre dominio, aplicación,
  infraestructura y presentación. Sin archivos monolíticos ni barrels innecesarios.
- Contenido migrado mediante Content Collections y Markdown con esquemas tipados.
- Conservar slugs y URLs del sitio original salvo indicación contraria.
- Sin hardcodeo: configuración y constantes centralizadas en `src/configuracion/`.
- No añadir dependencias, integraciones, Tailwind, linters, formateadores ni pruebas
  sin aprobación explícita.
- Git y Cloudflare se configurarán cuando el proyecto esté terminado. Por ahora no se
  crea repositorio, ni adaptador de Cloudflare, ni recursos de Cloudflare.
- `SESSIONS.md` es una bitácora append-only; las reglas permanentes se promueven a
  `AGENTS.md`.

### Cambios

- Se reescribió `AGENTS.md` con las reglas del proyecto, la arquitectura, la
  nomenclatura, los comandos, la verificación, la fuente de migración y el protocolo
  de sesiones.
- Se creó `SESSIONS.md` con esta entrada inicial.

### Pendientes

- Fase 0: arrancar MySQL/Apache de XAMPP e inventariar páginas, entradas, menús, medios
  y metadatos de Elementor de `sudb`.
- Fase 1: definir `src/content.config.ts`, la colección de páginas y convertir el
  contenido a Markdown conservando slugs.
- Fase 2: migrar y optimizar únicamente los assets usados.
- Fase 3: construir plantillas y componentes modulares con diseño 1:1.
- Fase 4: reproducir rutas, ejecutar `pnpm build` y comparar contra el WordPress local.
- Decisiones abiertas: reemplazo del formulario de Contact Form 7, tratamiento del
  Revolution Slider y confirmación de conservación exacta de URLs.
- Al finalizar el sitio: configurar Git, despliegue en Cloudflare y los recursos de
  Cloudflare necesarios.

## 2026-11-01 — Sesión 001 (corrección): nomenclatura del código

### Decisión corregida

- Queda sin efecto la decisión anterior de usar nomenclatura en español para el código.
- La regla correcta es: carpetas, archivos, variables, funciones, tipos, interfaces,
  clases CSS y comentarios en inglés. El contenido, la interfaz y la comunicación con
  el usuario permanecen en español.
- El frontmatter del contenido usa claves en inglés: `title`, `description`, `order`,
  `cover`, `draft`.
- Las rutas del proyecto usan nombres en inglés: `src/presentation/`, `src/domain/`,
  `src/application/`, `src/infrastructure/`, `src/config/`, `src/styles/`,
  `src/assets/`.
- Las referencias de la entrada anterior a `src/configuracion/` deben leerse como
  `src/config/`.
- El componente de cabecera se llama `Header`, no `Encabezado`.

### Cambios

- Se actualizó `AGENTS.md` con la regla de nomenclatura en inglés y la estructura
  modular corregida.
- Se conserva la entrada anterior sin borrarla; esta corrección prevalece.

### Pendientes

- Sin cambios respecto a la entrada anterior.

## 2026-11-14 — Sesión 002: Fase 0, recuperación del front-end

### Objetivo

- Obtener una fuente renderizable del sitio WordPress sin reparar `sudb` y sin
  modificar el WordPress original.

### Contexto y hallazgos

- `wp-config.php` original apunta a `DB_HOST=127.0.0.1:3307`; MariaDB corre en `3306`.
- `sudb` está corrupta: `ERROR 1932 (42S02): Table 'sudb.wp_posts' doesn't exist in
  engine`; los `.frm`/`.ibd` existen pero InnoDB no los reconoce.
- El respaldo `updraft/*-db.gz` es inservible: descomprime solo ~1.1 KB.
- El respaldo utilizable es `wp-content/ai1wm-backups/*.wpress` (191 MB), que contiene
  `database.sql` (8.38 MB) con prefijo `SERVMASK_PREFIX_`.
- El respaldo tenía `template` y `stylesheet` vacíos y `active_plugins` sin Elementor.
- `robocopy /XD upgrade` excluyó por error `plugins/elementor/core/upgrade` y
  `plugins/pro-elements/core/upgrade`.

### Cambios

- `database.sql` extraído a `%TEMP%\opencode\sucem` y prefijo reemplazado por `wp_`.
- Base nueva `sucem_local` importada (31 tablas, 216 posts, 6 páginas).
- Copia desechable `C:\xampp\htdocs\sucem-preview` con `wp-config` apuntando a
  `sucem_local` en `127.0.0.1:3306`, `WP_HOME`/`WP_SITEURL` a
  `http://localhost/sucem-preview` y `.htaccess` con `RewriteBase /sucem-preview/`.
- URLs migradas con WP-CLI temporal (`wp-cli.phar` en temp): 338 reemplazos.
- Tema Astra y plugins activados: Elementor, Elementor Pro, Essential Addons,
  Revolution Slider, Sticky Menu y Contact Form 7.
- Restaurados los directorios `core/upgrade` faltantes en la copia.
- 15 capturas de referencia (5 páginas × escritorio/tableta/móvil) en
`%TEMP%\opencode\sucem\screens`.

### Verificación

- Las 5 rutas responden 200; sin URLs `sucem.com` residuales.
- Elementor CSS/JS, kit 7 y Revolution Slider presentes en el HTML.

### Pendientes

- Fase 1: tokens de diseño, Poppins self-hosted y mapa de secciones.
- Fases 2 a 5 según el plan aprobado.

## 2026-11-14 — Sesión 003: Fase 1, tokens, fuentes y mapa

### Objetivo

- Fijar los tokens visuales verificados del sitio original, autoalojar Poppins y
  mapear la estructura de cada página y plantilla antes de crear componentes.

### Contexto y hallazgos

- Astra conserva su paleta por defecto (`--ast-global-color-0: #046bd2`), pero el
  diseño real usa verdes `#008639`/`#007331`/`#015E29`, naranja `#FF622A` y grises
  `#333`/`#444`/`#666`/`#858E9A`.
- El contenido de Elementor usa 1140px de ancho máximo; Astra usa 1200px. Breakpoints:
  1024px y 767px. Radios: 0 y 100px. Pesos Poppins: 400, 500 y 600.
- Los popups (148, 211, 214, 215, 220, 221, 226, 227, 232, 235) comparten la misma
  estructura de dos contenedores: `image-box` + `eael-filterable-gallery`.
- Estructura y Profesores concentran su contenido en pestañas y tablas; el texto vive
  en los settings de los widgets, no en elementos hijos.

### Cambios

- `src/assets/fonts/`: 6 woff2 de Poppins (400/500/600 × latin/latin-ext).
- `src/styles/fonts.css`: 6 `@font-face` con `font-display: swap`.
- `src/styles/tokens.css`: color, tipografía, layout, espaciado, radios, sombra y
  transiciones verificadas.
- `src/styles/global.css`: reset, base tipográfica, enlaces, foco, selección y
  `prefers-reduced-motion`; importa fuentes y tokens.
- `src/pages/index.astro`: importa `global.css`, `lang="es"` y título `SUCEM`.
- Mapa de 18 documentos (6 páginas + 12 plantillas) en
  `%TEMP%\opencode\sucem\section-map.txt`, regenerable con `section-map.php`.

### Verificación

- `pnpm build` correcto.
- El CSS emitido contiene 6 `@font-face` y referencia los 6 woff2 con hash.

### Pendientes

- Fase 2: config del sitio, layout base, Header/Footer y primitivas.
- Extraer textos de pestañas, tablas, popups y sliders antes de migrar cada página.

## 2026-11-14 — Sesión 004: Fase 2, layout, Header y Footer

### Objetivo

- Crear la configuración del sitio, el layout base, el Header y el Footer con
  fidelidad visual respecto a las capturas de referencia.

### Contexto y hallazgos

- El menú real tiene 6 elementos de primer nivel y 17 en total; "¡Conocenos!" y
  "Estructura" tienen submenús.
- Astra usa un contenedor de 1240px con 20px de padding para el header; el logo mide
  120px de ancho. El header de referencia mide 72px (borde inferior en y=71).
- El footer es verde `#008639`, de 60px más borde, con el texto centrado en blanco.
- En la captura móvil original no se pinta el botón de menú; se implementó igualmente
  un botón visible por accesibilidad.

### Cambios

- `src/config/site.ts`: nombre, lema, descripción, locale y navegación completa.
- `src/presentation/layouts/BaseLayout.astro` + estilos: `lang="es"`, metadatos,
  enlace de salto, Header, `main` y Footer.
- `src/presentation/components/Header/`: logo optimizado, navegación de escritorio
  con submenús y flechas, menú móvil nativo con `<details>` y script mínimo para
  cerrarlo al pulsar un enlace o con Escape.
- `src/presentation/components/Footer/`: copyright dinámico sobre verde.
- `src/assets/images/logo-sucem.png`: logo original copiado y servido como WebP.
- Tokens nuevos: 15px de navegación, borde `#eaeaea`, contenedor de header 1240px,
  espacio de 1px.
- `src/pages/index.astro` usa `BaseLayout` y queda como marcador de posición.

### Verificación

- `pnpm build` correcto.
- Medido con Chrome DevTools Protocol a 1440×900: header 72px, logo visible
  x=126..230 y menú x=700..1304; coincide con la captura original.
- A 390×900: header 69px, logo visible x=26..130; el footer mide 61px y es `#008639`.
- El submenú se abre con foco/hover; el menú móvil abre, cierra al pulsar un enlace
  y sus 17 elementos caben con scroll.

### Pendientes

- Fase 3: primitivas de presentación y extracción del contenido.
- Fase 4: páginas Inicio, Estructura, Instituciones, Profesores y Contacto.

## 2026-11-14 — Sesión 005: Fase 3, colecciones y primitivas

### Objetivo

- Extraer el contenido de Elementor a Content Collections tipadas y crear las
  primitivas de presentación reutilizables.

### Contexto y hallazgos

- Astro 7 usa `src/content.config.ts`, el loader `glob` de `astro/loaders` y `z` de
  `astro/zod`; `z` no se exporta desde `astro:content`.
- `image()` se obtiene del contexto del schema y resuelve rutas relativas tanto en
  JSON como en Markdown; el build genera los imports en `.astro/content-assets.mjs`.
- El contenedor real de Elementor mide 1140px de ancho y queda centrado con 20px de
  gutter; `--container-max: 1140px` ya era correcto.
- Las pestañas de Estructura usan fondo activo `#015E29`, texto blanco, 16px y
  padding `16px 24px`; el contenedor de contenido mide 1140px.
- Los popups con perfil útil son 9; el 232 está vacío y se descartó. El mapeo por ID
  evita fallos por diferencias de acentos u orden de nombres.
- El JSON normalizado contiene 6 párrafos de Inicio, 9 videos, 9 cards, 9 tabs,
  10 instituciones, 27 profesores, 10 popups y los datos de contacto.
- En CSS externo importado por `.astro` no se debe usar `:global()`: el archivo no
  pasa por el scoping del compilador y lightningcss lo marca como pseudo-clase
  inválida. Los selectores se escriben directamente.

### Cambios

- `src/content.config.ts`: colecciones `pages`, `home`, `structureTabs`,
  `institutions`, `instructors` y `videos`, con `glob`, `image()` y schemas Zod.
- `src/content/pages/`: 4 páginas interiores con héroe, fondo e intro opcionales.
- `src/content/home/inicio.json`: textos, misión, visión, destacados y video héroe.
- `src/content/structure-tabs/`: 9 Markdown con frontmatter (`group`, `order`,
  `align`, `gallery`, `sections`), textos originales y tablas de Grados.
- `src/content/institutions/`: 10 instituciones con logo, grupo, descripción, popup,
  redes y mapa.
- `src/content/instructors/`: 27 profesores; 9 con `profile` (imagen, biografía y
  galería de video).
- `src/content/videos/`: 9 videos de Inicio con `youtubeId` y orden.
- `src/presentation/components/Container/`: contenedor de 1140px/1200px con gutter.
- `src/presentation/components/Section/`: fondos `surface`, `alt`, `primary`, `dark`
  y `transparent`; espaciado normal, compacto o sin padding.
- `src/presentation/components/SectionHeading/`: encabezado h2/h3/h4 con alineación.
- `src/presentation/components/Prose/`: estilos para Markdown y contenido centrado.
- Cada componente incluye su `.types.ts` y `.styles.css`; sin barrels.

### Verificación

- `pnpm build` correcto, sin advertencias de lightningcss.
- `.astro/content-assets.mjs` incluye las 31 imágenes referenciadas por las
  colecciones; `image()` funciona con JSON y Markdown.
- Página temporal de prueba: contenedor x=150 y 1140px de contenido a 1440px de
  viewport; headings a 30px; fondo primario `#008639` con texto blanco. La página se
  eliminó después de verificar.
- Conteos validados: 4 páginas, 1 inicio, 9 tabs, 10 instituciones, 27 instructores,
  9 videos y 9 perfiles.

### Pendientes

- Fase 4: implementar Inicio, Estructura, Instituciones, Profesores y Contacto.
- Definir la sustitución del formulario de Contacto antes de publicar.
- Ajustar la altura de los héroes interiores: el original mide 445px a 1440px, no
  500px como se estimó inicialmente.

## 2026-11-21 — Sesión 006: Fase 4, páginas, formulario y QA

### Objetivo

- Continuar la migración 1:1 sin reiniciar el trabajo previo.
- Terminar las rutas Inicio, Estructura, Instituciones, Profesores y Contacto,
  verificarlas en escritorio y móvil y cerrar la sustitución del formulario.

### Contexto y hallazgos

- El servidor WordPress local seguía sin responder de forma fiable; se usaron el HTML,
  el CSS y el SQL cacheados en `%TEMP%\opencode\sucem`.
- Contact Form 7 enviaba a `[_site_admin_email]`; `database.sql` permitió localizar el
  correo del administrador y centralizarlo en `src/config/contact.ts`.
- Los héroes originales no son idénticos: Estructura usa título 45px a la izquierda y
  subtítulo 27px centrado; Instituciones usa 60px/40px centrados; Profesores y Contacto
  usan 50px/24px centrados.
- Las dos entradas `SUCEM Bernal` y `SUCEM Bernal Xometla` existen en el HTML original
  con el mismo logo y descripción. Se conservan tal cual.

### Decisiones

- Sustituir Contact Form 7 por un formulario `mailto` nativo, sin dependencias.
- Mantener los cinco nombres de campo originales y los textos visibles heredados,
  incluida la ortografía original de las etiquetas.
- Añadir variantes al `PageHero` para reproducir la tipografía centered de cada página
  sin duplicar el componente.
- Mantener el header móvil de 60.8px y el héroe interior de 300px por legibilidad;
  queda pendiente la decisión final de fidelidad estricta.

### Cambios

- Inicio: se ajustaron `.home-copy`, `.home-highlights__list` y `.video-card__title`
  para reproducir párrafos, indentación de listas y separación del título de video.
- Estructura: se ajustaron márgenes de párrafos y galerías para igualar las medidas
  originales; las pestañas conservan navegación por click y flechas.
- `src/presentation/components/PageHero/`: nuevo `PageHeroVariant` con variantes
  `default`, `center-large` y `center-medium`, aplicadas según la página.
- `src/config/labels.ts`: etiquetas compartidas de instituciones, profesores y contacto.
- `src/config/contact.ts`: correo y prefijo de asunto del formulario.
- `src/presentation/sections/Institutions/`: tarjetas con logo, descripción, enlaces,
  estrellas y mapa; iconos SVG propios y agrupación Ciudad de México/Estado de México.
- `src/presentation/sections/Instructors/`: tabla de 27 profesores con búsqueda,
  paginación de 10 filas, estados y anclas por popup.
- `src/presentation/sections/Contact/`: intro, logo y formulario `mailto` nativo.
- Rutas añadidas: `/instituciones-sucem/`, `/profesores-temachtianimej/` y
  `/contacto-sucem/`.

### Verificación

- `pnpm.cmd build` correcto: 5 páginas generadas y 41 imágenes optimizadas.
- QA con CDP a 1440px y 390px: sin errores de consola y sin overflow horizontal.
- Header: 56.8px en escritorio y 60.8px en móvil. Héroe interior: 445px y 300px.
- Instituciones: 10 tarjetas, 10 mapas y 12 enlaces; tipografías del héroe 60px/40px
  centradas en escritorio y 32px/18px en móvil.
- Profesores: 27 filas, 10 visibles, paginación `2 / 3`; la búsqueda `Joel` devuelve
  2 resultados; tipografías del héroe 50px/24px centradas.
- Contacto: 5 campos originales más estado, `action` mailto correcto y tipografías del
  héroe 50px/24px centradas.

### Pendientes

- Decidir si se fuerza la fidelidad estricta del header y héroe móvil o se conserva la
  altura actual por legibilidad.
- Configurar Git y Cloudflare al terminar el sitio, según las reglas del proyecto.

## 2026-11-21 — Sesión 007: popups, enlaces y reglas del formulario

### Objetivo

- Cerrar los tres puntos pendientes antes de subir la maqueta a Git: renderizado de
  perfiles, funcionamiento de los enlaces “Carrera” y actualización de `AGENTS.md`.

### Contexto y hallazgos

- `institution.popup` ya contenía el ID del instructor, no el ID numérico del popup de
  Elementor; el mapeo correcto se hace por `instructor.id`.
- Los 9 perfiles migrados tienen imagen, biografía y 3 videos genéricos.
- Los 10 enlaces “Carrera” apuntan a 9 perfiles, porque dos instituciones comparten
  `SUCEM Bernal` y `SUCEM Bernal Xometla`, tal como en el original.

### Decisiones

- Sustituir los popups de Elementor por `<dialog>` nativo, sin dependencias ni JS de
  WordPress.
- Los enlaces “Carrera” abren el perfil en la misma página; sin JS conservan como
  respaldo la navegación a `/profesores-temachtianimej/#instructor-<id>`.
- Los nombres de profesores con perfil son botones que abren su diálogo.
- El hash de cada diálogo permite enlaces profundos; al cerrar se limpia el hash y se
  restaura el scroll del documento.

### Cambios

- `src/application/video/GetYouTubeVideoId.ts`: conversión de URLs de YouTube a ID.
- `src/presentation/components/InstructorProfile/`: diálogo, contenedor, tipos y estilos.
- `src/config/labels.ts`: etiquetas de perfiles y de apertura desde la tabla.
- `src/presentation/sections/Instructors/InstructorTable.astro`: botones de perfil,
  apertura por ancla y revelado de filas ocultas por paginación.
- `src/presentation/sections/Instructors/InstructorsPage.astro`: renderizado de perfiles.
- `src/presentation/sections/Institutions/InstitutionCard.astro`: “Carrera” abre el
  diálogo correspondiente.
- `src/presentation/sections/Institutions/InstitutionsPage.astro`: mapeo por
  `instructor.id` y renderizado de perfiles.
- `src/pages/instituciones-sucem.astro`: pasa la colección de instructores a la sección.
- `AGENTS.md`: el formulario de contacto queda documentado como `mailto` nativo.

### Verificación

- `pnpm.cmd build` correcto: 5 páginas generadas y 42 imágenes optimizadas.
- QA con CDP a 1440px y 390px: sin errores de consola ni overflow horizontal.
- Instituciones: 9 diálogos y 10 enlaces “Carrera”; el primero abre, muestra 3 videos,
  bloquea el scroll, actualiza el hash y al cerrar limpia el estado.
- Profesores: 9 botones de perfil; el hash de una fila oculta la revela en la página
  `2 / 3` y abre su diálogo.
- El diálogo mide 1100×503px en escritorio y 367×776px en móvil, dentro del viewport.

### Pendientes

- Decidir si se fuerza la fidelidad estricta del header y héroe móvil o se conserva la
  altura actual por legibilidad.
- Configurar Git y Cloudflare al publicar la maqueta, según las reglas del proyecto.
