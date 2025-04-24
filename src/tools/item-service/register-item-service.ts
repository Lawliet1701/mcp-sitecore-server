import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getItemById } from "./simple/get-item.js";
import { getItemChildren } from "./simple/get-item-children.js";
import { getItemByPath } from "./simple/get-item-by-path.js";
import { safeMcpResponse } from "../../helper.js";
import { getLanguages } from "./composite/get-languages.js";
import { createItem } from "./simple/create-item.js";
import { deleteItem } from "./simple/delete-item.js";
import { runStoredQuery } from "./simple/run-stored-query.js";
import { runStoredSearch } from "./simple/run-stored-search.js";
import type { Config } from "../../config.js";
import { editItem } from "./simple/edit-item.js";
import { searchItems } from "./simple/search-items.js";
import { getItemDescendants } from "./composite/get-item-descendants.js";

function registerSimpleItemServices(server: McpServer, config: Config) {
    server.tool(
        'item-service-get-item',
        "Get a Sitecore item by its ID.",
        {
            id: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
                includeMetadata: z.boolean().optional(),
                fields: z.array(z.string()).optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(getItemById(config, params.id, params.options || {}));
        }
    )

    server.tool(
        'item-service-get-item-children',
        "Get children of a Sitecore item by its ID.",
        {
            id: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
                includeMetadata: z.boolean().optional(),
                fields: z.array(z.string()).optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(getItemChildren(config, params.id, params.options || {}));
        }
    )

    server.tool(
        'item-service-get-item-by-path',
        "Get a Sitecore item by its path.",
        {
            path: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
                includeMetadata: z.boolean().optional(),
                fields: z.array(z.string()).optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(getItemByPath(config, params.path, params.options || {}));
        }
    )

    // It seems that union types are not supported in the current version of AI agents
    // I tried to use z.intersection() but it does not work
    // z.union doesn't work either
    // z.passthrough() doesn't work either
    // So, data object will be split into required and optional
    // And as it is the API for the AI agent, not for people, it is not a big deal

    server.tool(
        'item-service-create-item',
        "Create a new Sitecore item under parent path with name using template id.",
        {
            parentPath: z.string(),
            itemName: z.string(),
            templateId: z.string(),
            data:
                z.record(z.string(), z.string()).optional(),    
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(createItem(config, params.parentPath, { ItemName: params.itemName, TemplateID: params.templateId, ...params.data }, params.options || {}));
        }
    )

    server.tool(
        'item-service-edit-item',
        "Edit a Sitecore item by its ID.",
        {
            id: z.string(),
            data:
                z.record(z.string(), z.string()),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(editItem(config, params.id, params.data, params.options || {}));
        }
    )

    server.tool(
        'item-service-delete-item',
        "Delete a Sitecore item by its ID.",
        {
            id: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(deleteItem(config, params.id, params.options || {}));
        }
    )

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

    server.tool(
        'item-service-run-stored-search',
        "Run a stored Sitecore search by its definition item ID.",
        {
            id: z.string(),
            term: z.string(),
            options: z.object({
                pageSize: z.number().optional(),
                page: z.number().optional(),
                database: z.string().optional(),
                language: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
                fields: z.array(z.string()).optional(),
                facet: z.string().optional(),
                sorting: z.string().optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(runStoredSearch(config, params.id, params.term, params.options || {}));
        }
    );
}

function registerCompositeItemServices(server: McpServer, config: Config)  {
    server.tool(
        'item-service-get-languages',
        "Get Sitecore languages.",
        {},
        async () => {
            return safeMcpResponse(getLanguages(config));
        }
    );

    server.tool(
        'item-service-get-item-descendants',
        "Get descendants of a Sitecore item by its ID.",
        {
            id: z.string(),
            options: z.object({
                database: z.string().optional(),
                language: z.string().optional(),
                version: z.string().optional(),
                includeStandardTemplateFields: z.boolean().optional(),
                includeMetadata: z.boolean().optional(),
                fields: z.array(z.string()).optional(),
            }).optional(),
        },
        async (params) => {
            return safeMcpResponse(getItemDescendants(config, params.id, params.options || {}));
        }
    )
}

export function registerItemService(server: McpServer, config: Config) {
    registerSimpleItemServices(server, config);
    registerCompositeItemServices(server, config);
}