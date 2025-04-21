#!/usr/bin/env node
import { envStartSchema, type EnvStartConfig } from './config.js';
import { startSTDIO } from './stdio.js';
import { startSSE } from './sse.js';

const ENV: EnvStartConfig = envStartSchema.parse(process.env);

if(ENV.TRANSPORT === "stdio") {
    startSTDIO();
}
else {
    startSSE();
}
