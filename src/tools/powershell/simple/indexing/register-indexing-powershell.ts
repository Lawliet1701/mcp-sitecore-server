import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config.js";
import { registerInitializeSearchIndexPowerShell } from "./register-initialize-search-index.js";
import { registerGetSearchIndexPowerShell } from "./register-get-search-index.js";

export function registerIndexingPowerShell(server: McpServer, config: Config) {
    registerInitializeSearchIndexPowerShell(server, config);
    registerGetSearchIndexPowerShell(server, config);
}
