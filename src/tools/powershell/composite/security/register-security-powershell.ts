import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config";
import { registerSetItemAcl } from "./register-set-item-acl.js";

export function registerSecurityPowerShell(server: McpServer, config: Config) {
    registerSetItemAcl(server, config);
}