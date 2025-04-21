import { envStartSchema, type EnvStartConfig } from './config.js';
import { startSTDIO } from './stdio.js';
import { startSSE } from './sse.js';

const ENV: EnvStartConfig = envStartSchema.parse(process.env);

if(ENV.TRANSPORT === "stdio") {
    startSTDIO();
    console.log("STDIO transport started.");
}
else {
    startSSE();
    console.log("SSE transport started.");
}
