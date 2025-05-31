import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config.js";
import { registerInitializeSearchIndexPowerShell } from "./register-initialize-search-index.js";
import { registerGetSearchIndexPowerShell } from "./register-get-search-index.js";
import { registerFindItemPowerShell } from "./register-find-item.js";

export async function registerIndexingPowerShell(server: McpServer, config: Config) {
    await registerInitializeSearchIndexPowerShell(server, config);
    await registerGetSearchIndexPowerShell(server, config);
    await registerFindItemPowerShell(server, config);
}
