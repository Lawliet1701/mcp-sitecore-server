import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "@/config.js";
import { z } from "zod";
import { searchItems } from "../../simple/search-items.js";
import { safeMcpResponse } from "@/helper.js";

export function searchItemsTool(server: McpServer, config: Config) {
    server.tool(
        'item-service-search-items',
        "Search Sitecore items using the ItemService RESTful API.",
        {
            term: z.string(),
            fields: z.array(z.string()).optional(),
            facet: z.string().optional(),
            page: z.number().optional(),
            pageSize: z.number().optional(),
            database: z.string().optional(),
            includeStandardTemplateFields: z.boolean().optional(),
        },
        async (params) => {
            return safeMcpResponse(searchItems(config, params));
        }
    );
}
