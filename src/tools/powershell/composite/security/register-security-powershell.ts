import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config";
import { registerSetItemAclPowerShell } from "./register-set-item-acl.js";

export function registerSecurityPowerShell(server: McpServer, config: Config) {
    registerSetItemAclPowerShell(server, config);
}