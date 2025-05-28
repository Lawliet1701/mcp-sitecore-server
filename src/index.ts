#!/usr/bin/env node
import { envStartSchema, type EnvStartConfig } from './config.js';
import { startSTDIO } from './stdio.js';
import { startSSE } from './sse.js';
import { startStreamableHTTP } from './streamable-http.js';

const ENV: EnvStartConfig = envStartSchema.parse(process.env);

if(ENV.TRANSPORT === "stdio") {
    startSTDIO();
}
else if(ENV.TRANSPORT === "sse"){
    console.warn("SSE transport is deprecated and will be removed in future versions. Please use 'streamable-http' or 'stdio' instead.");
    startSSE();
}
else {
    startStreamableHTTP();
}
