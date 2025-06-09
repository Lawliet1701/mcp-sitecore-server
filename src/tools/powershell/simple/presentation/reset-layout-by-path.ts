import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function resetLayoutByPathPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-reset-layout-by-path",
        "Resets the layout of an item by path.",
        {
            path: z.string().describe("The path of the item to reset the layout for.").default("master:"),
            finalLayout: z.boolean().describe("Specifies layout to be reset. If 'true', the final layout is reset, otherwise - shared layout.").optional(),
            language: z.string().describe("Specifies the item language to reset layout for.").optional(),
        },
        async (params) => {
            const command = `Reset-Layout`;
            const options: Record<string, any> = {};

            options["Path"] = params.path;

            if (params.finalLayout === true)
            {
                options["FinalLayout"] = "";
            }

            if (params.language)
            {
                options["Language"] = params.language;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}