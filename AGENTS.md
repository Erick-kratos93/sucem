# AGENTS.md

Reglas obligatorias del proyecto. El contexto acumulado se guarda en `SESSIONS.md`.

## Proyecto

- Sitio web informativo de SUCEM (arte marcial), sin interacciones por ahora.
- Migración 1:1 desde WordPress a Astro. El rediseño se decidirá después.
- Todo el contenido, la interfaz y la comunicación con el usuario van en español.
- El proyecto se publicará en Git y se desplegará en Cloudflare cuando esté terminado.
  Hasta esa fase no se configura Git, ni adaptador de Cloudflare, ni recursos de Cloudflare.

## Idioma y nomenclatura

- Todo el código va en inglés: carpetas, archivos, variables, funciones, tipos,
  interfaces, clases CSS y comentarios. No usar identificadores en español.
- Frontmatter del contenido con claves en inglés: `title`, `description`, `order`,
  `cover`, `draft`. No usar `titulo`, `descripcion`, `orden`, `portada`, `borrador`.
- El contenido, los textos de interfaz y la comunicación con el usuario van en español.
- La documentación del proyecto (`AGENTS.md`, `SESSIONS.md`) se escribe en español.
- Nombres descriptivos y entendibles. Evitar abreviaturas crípticas y nombres genéricos
  como `data`, `item`, `temp` o `aux`.
- Excepciones inevitables (nombres técnicos o contenido, no identificadores):
  - Contenido, textos de interfaz y slugs heredados de WordPress: en español.
  - Rutas reservadas por Astro: `src/pages/`, `src/content/`, `public/`.
  - Archivos de configuración: `package.json`, `astro.config.mjs`, `tsconfig.json`,
    `pnpm-lock.yaml`.
  - Archivos solicitados explícitamente: `AGENTS.md` y `SESSIONS.md`.
  - APIs y palabras clave del framework: `Astro.props`, `defineConfig`, `import`,
    `export`, atributos HTML y propiedades CSS.
- No inventar traducciones para APIs, atributos HTML ni propiedades CSS: se usan tal
  como los define la plataforma.

## Arquitectura modular

Organización por módulo/feature. Cada módulo vive en su propia carpeta con vista, estilos,
tipos y lógica. Prohibidos los archivos monolíticos.

```text
src/
  pages/                          # reservado por Astro: enrutamiento delgado
  content/                        # reservado por Astro: colecciones
  presentation/
    layouts/
    components/
      Header/
        Header.astro
        Header.styles.css
        Header.types.ts
    sections/
  domain/
    page/
      Page.ts
      PageTypes.ts
  application/
    page/
      GetPages.ts
  infrastructure/
    content/
      ContentRepository.ts
    wordpress/
      WordPressExporter.ts
  config/
    site.ts
    constants.ts
  styles/
    fonts.css
    global.css
    tokens.css
  assets/
    images/
    fonts/
public/                           # reservado por Astro: archivos estáticos
```

- Dirección de dependencias:
  `pages` → `presentation` → `application` → `domain`.
  `infrastructure` implementa las interfaces que define `domain`.
- `domain` no importa Astro, WordPress ni detalles de infraestructura.
- Las páginas solo enrutan y componen; no contienen lógica de negocio.
- No crear barrels `index.ts` innecesarios. Usar imports directos; si hace falta un
  barrel, llamarlo `index.ts`.
- Estilos base: `src/styles/global.css` importa `fonts.css` y `tokens.css`. Colores,
  tamaños, espaciados y familias se usan desde los tokens; no se incrustan valores.

## Buenas prácticas

- Sin hardcodeo: rutas, URLs, textos repetidos, colores y datos del sitio van en
  `src/config/` o en el contenido, no incrustados en componentes.
- TypeScript estricto. Prohibido `any`; usar tipos explícitos e interfaces del dominio.
- Funciones y componentes con una sola responsabilidad.
- No duplicar lógica ni estilos; extraer a un módulo reutilizable.
- HTML semántico, accesibilidad y SEO: `lang="es"`, etiquetas correctas, `alt` en
  imágenes, metadatos descriptivos.
- No añadir dependencias, integraciones, Tailwind, linters, formateadores ni pruebas
  sin aprobación explícita.
- No usar jQuery ni portar JavaScript de WordPress/Elementor sin necesidad.
- En archivos `.css` externos importados por componentes no usar `:global()`: el
  archivo no pasa por el scoping de Astro y lightningcss lo rechaza. Escribir los
  selectores directamente.

## Contenido y assets

- El contenido migrado se gestiona con Content Collections de Astro y Markdown con
  esquemas tipados.
- La configuración vive en `src/content.config.ts`; usar `glob` de `astro/loaders`,
  `z` de `astro/zod` y `image()` desde el contexto del schema.
- Conservar los slugs y las URLs del sitio original salvo indicación contraria.
- Migrar solo los medios que se usen. Origen: `wp-content/uploads` (65 archivos, ~13.4 MB).
- Optimizar imágenes y usar los recursos de Astro cuando aplique.
- Contact Form 7 no funciona en salida estática. El formulario de contacto se sustituyó
  por un formulario `mailto` nativo, sin backend ni servicios de terceros. No añadir
  otro sistema de envío sin aprobación explícita.

## Fuente de la migración (solo lectura)

- WordPress local: `C:\xampp\htdocs\sucem.com`.
- URL histórica: `http://localhost/sucem.com`. Dominio: `sucem.com.mx`.
- WordPress 6.7.2, tema Astra, Elementor + Elementor Pro, Essential Addons,
  Revolution Slider, Sticky Menu y Contact Form 7.
- Base de datos MariaDB `sudb`, prefijo `wp_`. MySQL no está corriendo por defecto;
  se arranca desde XAMPP (`C:\xampp\mysql\bin`).
- Respaldos disponibles: `wp-content/ai1wm-backups/*.wpress` y `wp-content/updraft/*`.
- No modificar archivos del WordPress: es la fuente de la migración.
- No usar `C:\xampp\htdocs\sucemmaqueta.com`: copia antigua con Avada y DB `sucemdb`.
- `sudb` está corrupta: `ERROR 1932 ... doesn't exist in engine`. No intentar repararla.
- El `wp-config.php` original apunta a `127.0.0.1:3307`, pero MariaDB corre en `3306`.
- Recuperación no destructiva: extraer `database.sql` de
  `wp-content/ai1wm-backups/*.wpress` y reemplazar `SERVMASK_PREFIX_` por `wp_`.
  El respaldo de UpdraftPlus `*-db.gz` es un stub inservible.
- Vista previa desechable: `C:\xampp\htdocs\sucem-preview` + DB `sucem_local`
  (regenerable; no es la fuente). El respaldo no trae tema ni plugins activos:
  activar Astra, Elementor y el resto en la copia.
- No hay `mysql` ni `wp` en `PATH`; usar `C:\xampp\mysql\bin\mysql.exe` y
  `C:\xampp\php\php.exe`.

## Comandos

Usar pnpm. `pnpm-lock.yaml` es el único lockfile; `astro info` puede reportar npm por error.

- `pnpm dev`
- `pnpm build`
- `pnpm preview`
- `pnpm astro <comando>`, por ejemplo `pnpm astro sync`

No hay `astro` global: un `astro ...` directo falla. Usar `pnpm astro ...` o
`node_modules/.bin/astro`.

## Servidor de desarrollo

Iniciar en segundo plano: `pnpm astro dev --background` (puerto 4321).
Gestionar con `pnpm astro dev status`, `pnpm astro dev stop` y
`pnpm astro dev logs [--follow]`.

## Verificación

- No hay scripts de pruebas, lint ni typecheck. Verificar con `pnpm build`.
- `astro check` no está disponible hasta instalar `@astrojs/check` y `typescript`.

## Entorno

- Node >= 22.23.4 (`engines` de `package.json`); instalado v24.16.0.
- Windows PowerShell puede bloquear `pnpm.ps1` por política de ejecución. Usar
  `pnpm.cmd ...` o `cmd /c "pnpm ..."`.
- Esta copia no es un repositorio Git (no existe `.git`). No usar Git para diffs ni
  historial.

## Sesiones

- `SESSIONS.md` es una bitácora append-only. Cada sesión agrega una entrada fechada al
  final; nunca se borra el historial.
- Cada entrada incluye: objetivo, contexto, decisiones, cambios y pendientes.
- Las reglas permanentes se promueven a este archivo.
- No escribir credenciales, contraseñas ni secretos en `SESSIONS.md`.
- Actualizar `SESSIONS.md` al terminar cada sesión de trabajo.
