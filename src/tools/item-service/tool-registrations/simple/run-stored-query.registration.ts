import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "../../../../config.js";
import { z } from "zod";
import { runStoredQuery } from "../../simple/run-stored-query.js";
import { safeMcpResponse } from "../../../../helper.js";

export function registerRunStoredQueryTool(server: McpServer, config: Config) {
    server.tool(
        'item-service-run-stored-query',
        "Run a stored Sitecore query by its definition item ID.",
        {
            id: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                page: z.number().optional(),
                pageSize: z.number().optional(),
                fields: z.array(z.string()).optional(),
                includeStandardTemplateFields: z.boolean().optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(runStoredQuery(config, params.id, params.options || {}));
        }
    );
}
