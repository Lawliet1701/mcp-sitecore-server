import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";

export function setLayoutIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "layout-set-layout-by-id",
        "Sets layout Id for an item specified by Id.",
        {
            itemId: z.string().describe("The Id of the item to set the layout for."),
            layoutPath: z.string().describe("The path of the layout.").optional().default("master:"),
            layoutId: z.string().describe("The ID of the layout to set for the item."),
            language: z.string().describe("The language of the item to set layout for.").optional(),
            finalLayout: z
                .boolean()
                .describe("Specifies layout to be updated. If 'true', the final layout is set, otherwise - shared layout.")
                .optional(),
        },
        async (params) => {
            const command = `
                $layout = Get-Item -Path ${params.layoutPath} -Id ${params.layoutId};
                $device = Get-LayoutDevice -Default;                
                Set-Layout -Id ${params.itemId} -Layout $layout -Device $device ${params.language ? `-Language ${params.language}` : ""}
                    ${params.finalLayout ? "-FinalLayout" : ""};
            `.replaceAll(/[\n]+/g, "");

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        });
}