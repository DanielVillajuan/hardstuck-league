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

1. Copiá .env.example a .env y completá RIOT_API_KEY y ADMIN_TOKEN.
2. Ejecutá npm run dev:api.
3. En otra terminal, ejecutá npm run dev.

El backend usa Express 5, Drizzle ORM sobre better-sqlite3 y Node 22.18 o posterior. Por defecto crea data/hardstuck.sqlite; DATABASE_PATH permite cambiar la ubicación. RIOT_API_KEY se lee exclusivamente en el proceso Node y nunca se expone al navegador. Las migraciones de Drizzle se aplican al iniciar el backend; `npm run db:generate -- --name=nombre` genera una nueva migración a partir del esquema.

El backend está organizado por capas: `routes` registra las rutas y middlewares; `controllers` adapta HTTP; `services` coordina reglas de negocio y Riot API; `daos` concentra las consultas Drizzle; `models` normaliza entidades y respuestas. Match-V5 se usa durante el alta o la sincronización para detectar tres derrotas consecutivas en Solo/Duo. Las victorias consecutivas se leen del indicador `hotStreak` de League-V4. Ambos estados quedan guardados en SQLite y se publican como `streak: "WIN" | "LOSS" | null`.

Documentación interactiva: /api/docs. El contrato OpenAPI en JSON está en /api/openapi.json y también se puede importar en Swagger UI o Insomnia.

| Método | Endpoint | Uso | Auth |
|---|---|---|---|
| GET | /api/health | Estado del backend | No |
| GET | /api/leagues | Ligas, jugadores y rangos guardados | No |
| POST | /api/admin/players | Agregar Riot ID y asignar liga | X-Admin-Token |
| DELETE | /api/admin/players/:id | Quitar un jugador | X-Admin-Token |
| POST | /api/admin/refresh-ranks | Actualizar rangos Solo/Duo desde Riot | X-Admin-Token |

El token administrativo se configura con ADMIN_TOKEN. La Riot API key se configura con RIOT_API_KEY, permanece en el backend y nunca se envía al navegador. En Swagger, usá el botón Authorize e ingresá ADMIN_TOKEN para probar las rutas administrativas.

El home incluye un panel para agregar, quitar y actualizar jugadores.
## Docker

docker compose up --build -d construye y ejecuta el servicio en el puerto 3000. Compose monta el volumen nombrado hardstuck-data en /data, donde queda el archivo SQLite; el volumen persiste al reemplazar el contenedor. No ejecutes docker compose down -v si querés conservar esa base. Configurá RIOT_API_KEY y ADMIN_TOKEN en el archivo .env del host antes de levantar el servicio.

Para publicar la imagen: docker build -t TU_USUARIO/hardstuck-league:latest . y luego docker push TU_USUARIO/hardstuck-league:latest. En el servidor, cambiá build en compose por image: TU_USUARIO/hardstuck-league:latest; mantené el volumen y pasá los secretos desde el .env del servidor, nunca desde el Dockerfile.
