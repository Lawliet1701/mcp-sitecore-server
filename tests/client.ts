import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { createTransport } from "@modelcontextprotocol/inspector/cli/build/transport.js";

console.log("__dirname", __dirname);

export type TransportOptions = {
    transportType: "sse" | "stdio";
    command?: string;
    args?: string[];
    url?: string;
};

const transportOptions: TransportOptions = {
    transportType: "stdio",
    command: "node",
    args: [`${__dirname}/../dist/index.js`],
};

const client = new Client({
    name: "mcp-sitecore-server",
    version: "1.0.0",
});

const transport = createTransport(transportOptions);

export { client, transport };