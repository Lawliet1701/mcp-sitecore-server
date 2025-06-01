import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getDomainPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-get-domain-by-name",
        "Get a Sitecore domain by its name.",
        {
            name: z.string(),
        },
        async (params) => {
            const command = `Get-Domain`;
            const options: Record<string, any> = {
                "Name": params.name,
            };
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.tool(
        "security-get-domain",
        "Get all Sitecore domains.",
        {},
        async () => {
            const command = `Get-Domain`;
            const options: Record<string, any> = {};
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}