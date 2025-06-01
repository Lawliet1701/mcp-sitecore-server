import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { envSchema, type Config, type EnvConfig } from "./config.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerAll } from "./register.js";

// Read package.json data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packagePath = path.resolve(__dirname, '..', 'package.json');
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const { version, name } = packageData;

export async function getServer(): Promise<McpServer> {
    const server = new McpServer({
        name: `Sitecore MCP Server: ${name}`,
        description: "Modle Context Protocol for Sitecore",
        version: version
    });

    const ENV: EnvConfig = envSchema.parse(process.env);

    // Parse the environment variables and set default values
    const config: Config = {
        name: `${name} ${version}`,
        graphQL: {
            endpoint: ENV.GRAPHQL_ENDPOINT || "https://xmcloudcm.localhost/sitecore/api/graph/",
            schemas: ENV.GRAPHQL_SCHEMAS ? ENV.GRAPHQL_SCHEMAS.split(",").map(x => x.trim()) : ["edge", "master"],
            apiKey: ENV.GRAPHQL_API_KEY || "{6D3F291E-66A5-4703-887A-D549AF83D859}",
            headers: ENV.GRAPHQL_HEADERS ? JSON.parse(ENV.GRAPHQL_HEADERS) : {},
        },
        itemService: {
            domain: ENV.ITEM_SERVICE_DOMAIN || "sitecore",
            username: ENV.ITEM_SERVICE_USERNAME || "admin",
            password: ENV.ITEM_SERVICE_PASSWORD || "b",
            serverUrl: ENV.ITEM_SERVICE_SERVER_URL || "https://xmcloudcm.localhost/",
        },
        powershell: {
            domain: ENV.POWERSHELL_DOMAIN || "sitecore",
            username: ENV.POWERSHELL_USERNAME || "admin",
            password: ENV.POWERSHELL_PASSWORD || "b",
            serverUrl: ENV.POWERSHELL_SERVER_URL || "https://xmcloudcm.localhost/",
        },
    };

    server.resource(
        "config",
        "config://main",
        async (uri) => {
            return {
                contents: [{
                    uri: uri.href,
                    text: JSON.stringify(config, null, 2),
                }]
            }
        }
    );

    server.tool(
        "config",
        "Prints the configuration of the Sitecore MCP server.",
        {},
        async (params) => {
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(config, null, 2)
                    }
                ]
            };
        }
    );

    await registerAll(server, config);
    
    return server;
}
