import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../config.js";
import { registerSecurityPowerShell } from "./security/register-security-powershell.js";
import { registerProviderPowerShell } from "./provider/register-provider-powershell.js";
import { registerIndexingPowerShell } from "./indexing/register-indexing-powershell.js";

export async function registerSimplePowerShell(server: McpServer, config: Config) {
    await registerSecurityPowerShell(server, config);
    await registerProviderPowerShell(server, config);
    await registerIndexingPowerShell(server, config);
}
