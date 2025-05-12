import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../config.js";
import { registerSimplePowerShell } from "./simple/register-simple-powershell.js";
import { registerCompositePowerShell } from "./composite/register-composite-powershell.js";

export function registerPowerShell(server: McpServer, config: Config) {
    registerSimplePowerShell(server, config);
    registerCompositePowerShell(server, config);
}