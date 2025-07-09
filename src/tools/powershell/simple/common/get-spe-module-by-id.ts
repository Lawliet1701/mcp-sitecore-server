import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getSpeModuleByIdPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "common-get-spe-module-by-id",
        "Gets the object that describes a Sitecore PowerShell Extensions Module by the ID of a module, script or library defined within the module.",
        {
            database: z.string()
                .describe("The database containing the module to be returned."),
            id: z.string().optional()
                .describe("The ID of a module, script or library item that is defined within the module to be returned."),
            name: z.string().optional()
                .describe("The name fo the module to return. Supports wildcards."),
        },
        async (params) => {
            const options: Record<string, any> = {
                "Database": params.database
            };
            const command = `Get-SpeModule`;

            if (params.id) {
                options["Id"] = params.id;
            }

            if (params.name) {
                options["Name"] = params.name;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}