import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config.js";
import { registerGetItemPowerShell } from "./register-get-item.js";

export function registerProviderPowerShell(server: McpServer, config: Config) {
    registerGetItemPowerShell(server, config);
}
