import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";
import { PowershellCommandBuilder } from "../../command-builder.js";
import { PowershellVariable } from "../../variable.js";
import { getSwitchParameterValue } from "../../utils.js";

export function switchRenderingByIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-switch-rendering-by-id",
        "Switches an existing rendering specified by item ID with an alternate one for the item specified by item ID.",
        {
            itemId: z.string().describe("The ID of the item holding the renderings."),
            oldRenderingId: z. string().describe("The ID of the rendering to switch."),
            newRenderingId: z.string().describe("The ID of the new rendering."),
            database: z.string().describe("The context database.").default("master"),
            finalLayout: z
                .boolean()
                .describe("Specifies the layout to update the rendering. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
            language: z.string().describe("The language version of the item holding the renderings.").optional(),
        },
        async (params) => {
            const commandBuilder = new PowershellCommandBuilder();

            const getRenderingParameters: Record<string, any> = {};
            getRenderingParameters["Id"] = params.itemId;
            getRenderingParameters["Database"] = params.database;
            getRenderingParameters["Language"] = params.language;
            getRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);

            const newRenderingParameters: Record<string, any> = {};
            newRenderingParameters["Id"] = params.newRenderingId;
            newRenderingParameters["Database"] = params.database;

            const switchRenderingParameters: Record<string, any> = {};
            switchRenderingParameters["Id"] = params.itemId;
            switchRenderingParameters["Database"] = params.database;
            switchRenderingParameters["Instance"] = new PowershellVariable("sourceRendering");
            switchRenderingParameters["NewRendering"] = new PowershellVariable("targetRendering");
            switchRenderingParameters["Language"] = params.language;
            switchRenderingParameters["FinalLayout"] = getSwitchParameterValue(params.finalLayout);

            const command = `
                $sourceRenderings = ${commandBuilder.buildCommandString('Get-Rendering', getRenderingParameters)} | Where-Object { $_.ItemID -ceq "${params.oldRenderingId}" };
                $targetRendering = ${commandBuilder.buildCommandString('New-Rendering', newRenderingParameters)}
                foreach($sourceRendering in $sourceRenderings) {
                    ${commandBuilder.buildCommandString('Switch-Rendering', switchRenderingParameters)}
                }                
            `;

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}