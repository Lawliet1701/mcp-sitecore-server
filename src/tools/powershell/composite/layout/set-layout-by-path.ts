import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";

export function setLayoutByPathPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "layout-set-layout-by-path",
        "Sets layout for an item specified by path.",
        {
            itemId: z.string().describe("The Id of the item to set the layout for."),
            layoutPath: z.string().describe("The path of the layout.").default("master:"),
            language: z.string().describe("The language of the item to set layout for.").optional(),
            finalLayout: z
                .boolean()
                .describe("Specifies layout to be updated. If 'true', the final layout is set, otherwise - shared layout.")
                .optional(),
        },
        async (params) => {
            const command = `
                $layout = Get-Item -Path '${params.layoutPath}';
                $device = Get-LayoutDevice -Default;
                Set-Layout -Id ${params.itemId} -Layout $layout -Device $device ${params.language ? `-Language ${params.language}` : ""}
                    ${params.finalLayout ? "-FinalLayout" : ""};
            `.replaceAll(/[\n]+/g, "");

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}