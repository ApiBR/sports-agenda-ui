/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the Sports Agenda API; defaults to https://apibr.com/sports-agenda/api/v1 */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
