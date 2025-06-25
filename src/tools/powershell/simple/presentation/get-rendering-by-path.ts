import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getRenderingByPathPowershellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-get-rendering-by-path",
        "Gets rendering definition by item path.",
        {
            path: z.string().describe("The id of the item to retrieve rendering for."),
            dataSource: z.string().describe("The rendering data source filter.").optional(),
            placeholder: z.string().describe("The rendering datasource filter.").optional(),
            language: z.string().describe("The item language.").optional(),
            finalLayout: z.boolean()
                .describe("Specifies layout holding the rendering definition. If 'true', the final layout is used, otherwise - shared layout.")
                .optional(),
            uniqueId: z.string().describe("The rendering definition unique id.").optional(),
        },
        async (params) => {
            const command = `Get-Rendering`;
            const options: Record<string, any> = {};

            options["Path"] = params.path;

            if (params.dataSource) {
                options["DataSource"] = params.dataSource;
            }

            if (params.placeholder) {
                options["Placeholder"] = params.placeholder;
            }

            if (params.language) {
                options["Language"] = params.language;
            }   

            if (params.finalLayout === true) {
                options["FinalLayout"] = "";
            }

            if (params.uniqueId) {
                options["UniqueId"] = params.uniqueId;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}