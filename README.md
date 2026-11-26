# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Backend local y persistencia

El frontend de Vite consume la API mediante /api. En desarrollo, completá las variables del archivo .env y ejecutá el frontend y el backend en terminales separadas:

1. Copiá .env.example a .env y completá ADMIN_TOKEN. RIOT_API_KEY es opcional si la vas a ingresar desde el panel admin.
2. Ejecutá npm run dev:api.
3. En otra terminal, ejecutá npm run dev.

El backend usa Express 5, Drizzle ORM sobre better-sqlite3 y Node 22.18 o posterior. Por defecto crea data/hardstuck.sqlite; DATABASE_PATH permite cambiar la ubicación. La Riot API key inicial se lee en el backend desde RIOT_API_KEY; el panel admin permite cambiarla y guardar la nueva en SQLite, que pasa a tener prioridad sin reiniciar ni redeployar la app. La key nunca se devuelve en respuestas ni se envía a lecturas del navegador. Las migraciones de Drizzle se aplican al iniciar el backend; `npm run db:generate -- --name=nombre` genera una nueva migración a partir del esquema.

El backend está organizado por capas: `routes` registra las rutas y middlewares; `controllers` adapta HTTP; `services` coordina reglas de negocio y Riot API; `daos` concentra las consultas Drizzle; `models` normaliza entidades y respuestas. Match-V5 se usa durante el alta o la sincronización para detectar tres derrotas consecutivas en Solo/Duo. Las victorias consecutivas se leen del indicador `hotStreak` de League-V4. Ambos estados quedan guardados en SQLite y se publican como `streak: "WIN" | "LOSS" | null`.

Documentación interactiva: /api/docs. El contrato OpenAPI en JSON está en /api/openapi.json y también se puede importar en Swagger UI o Insomnia.

| Método | Endpoint | Uso | Auth |
|---|---|---|---|
| GET | /api/health | Estado del backend | No |
| GET | /api/leagues | Ligas, jugadores y rangos guardados | No |
| PUT | /api/admin/riot-api-key | Guardar una nueva Riot API key | X-Admin-Token |
| POST | /api/admin/players | Agregar Riot ID y asignar liga | X-Admin-Token |
| DELETE | /api/admin/players/:id | Quitar un jugador | X-Admin-Token |
| POST | /api/admin/refresh-ranks | Actualizar rangos Solo/Duo desde Riot | X-Admin-Token |

El token administrativo se configura con ADMIN_TOKEN. Podés pasar una Riot API key inicial con RIOT_API_KEY o guardarla desde el panel admin; el backend la persiste en SQLite. El valor ingresado no vuelve a mostrarse y la ruta administrativa nunca devuelve la key. En Swagger, usá el botón Authorize e ingresá ADMIN_TOKEN para probar las rutas administrativas.

El home incluye un panel para agregar, quitar y actualizar jugadores.
## Docker

Copiá `.env.example` a `.env`, configurá `ADMIN_TOKEN` y ejecutá `docker compose up --build -d`. `RIOT_API_KEY` es opcional; podés ingresar la key desde el panel admin. El servicio queda disponible en el puerto indicado por `HOST_PORT` (3000 por defecto). La key configurada desde el panel se conserva en SQLite dentro del volumen de datos.

Compose concentra la configuración de rutas, usuario y persistencia:

| Variable | Valor predeterminado | Uso |
|---|---:|---|
| `APP_DIR` | `/app` | Directorio de la aplicación dentro de la imagen |
| `DATA_DIR` | `/data` | Directorio de datos dentro del contenedor |
| `DATABASE_PATH` | `/data/hardstuck.sqlite` | Archivo SQLite dentro del contenedor; debe quedar bajo `DATA_DIR` para persistir |
| `APP_UID` / `APP_GID` | `1000` / `1000` | Usuario y grupo con los que corre Node y se crea el directorio de datos |
| `HOST_PORT` / `CONTAINER_PORT` | `3000` / `3000` | Puerto publicado y puerto escuchado por la app |
| `DATA_SOURCE` | `hardstuck-data` | Origen del montaje: volumen nombrado o ruta del host |
| `DATA_VOLUME_NAME` | `hardstuck-data` | Nombre físico del volumen Docker |

El Dockerfile recibe `APP_DIR`, `DATA_DIR`, `APP_UID` y `APP_GID` como argumentos de build; Compose proporciona sus valores desde el `.env`. La imagen crea el directorio de datos con el UID/GID configurado y ejecuta el proceso con ese mismo usuario. El UID 1000 es el predeterminado. Para usar una carpeta del host en lugar del volumen nombrado, configurá `DATA_SOURCE=./data` en `.env`; si usás otro volumen nombrado, dejá `DATA_SOURCE=hardstuck-data` y cambiá `DATA_VOLUME_NAME`. Ajustá `APP_UID`/`APP_GID` al usuario que tenga permisos sobre la carpeta del host. En Linux, asigná al usuario acceso de escritura al directorio; en Docker Desktop, verificá que la carpeta del host esté compartida.

El volumen nombrado persiste cuando se recrea el contenedor. `docker compose down` conserva los datos; `docker compose down -v` elimina también el volumen.

Para publicar la imagen, construí desde Compose con los valores de `.env` y asigná `IMAGE_NAME=TU_USUARIO/hardstuck-league:latest`; luego ejecutá `docker compose push`. En un servidor, usá `image: TU_USUARIO/hardstuck-league:latest` en lugar de `build:` y mantené la configuración de volúmenes y secretos en Compose o en el entorno del servidor, nunca en el Dockerfile.
