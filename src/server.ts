import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerItemService } from "./tools/item-service/register-item-service.js";
import type { Config } from "./config.js";
import { registerGraphQL } from "./tools/graphql/register-graphql.js";

export function getServer(): McpServer {
    const server = new McpServer({
        name: "Sitecore MCP Server",
        version: "1.0.0"
    });

    // Helper to create DB connection

    // hardcode the config for now
    const config: Config = {
        name: "mcp-server-graphql",
        graphQL: {
            endpoint: "https://xmcloudcm.localhost/sitecore/api/graph/",
            schemas: ["edge", "master"],
            apiKey: "{6D3F291E-66A5-4703-887A-D549AF83D859}",
        },
        itemService: {
            domain: "sitecore",
            username: "admin",
            password: "b",
            serverUrl: "https://xmcloudcm.localhost/",
        },
    };

    server.resource(
        "schema",
        "schema://main",
        async (uri) => {

            return {
                contents: [{
                    uri: uri.href,
                    text: "Schema",
                }]
            }
        }
    );


    registerGraphQL(server, config);

    registerItemService(server, config);

    return server;
}
