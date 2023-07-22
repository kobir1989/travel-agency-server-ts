// custom.d.ts or types/custom.d.ts
declare namespace NodeJS {
   interface ProcessEnv {
      DB_URI: string;
      PORT: string;
      // Add other environment variables and their types as needed
   }
}
