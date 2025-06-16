import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function mergeLayoutByIdPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-merge-layout-by-id",
        "Merges final and shared layouts by  item Id.",
        {
            id: z.string().describe("The ID of the item to merge layout for."),
            database: z.string().optional().describe("The database to merge layout for."),
            language: z.string().optional().describe("The item language to merge layout for."),
        },
        async (params) => {
            const command = `Merge-Layout`;
            const options: Record<string, any> = {};

            options["Id"] = params.id;

            if (params.database)
            {
                options["Database"] = params.database; 
            }

            if (params.language)
            {
                options["Language"] = params.language;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}