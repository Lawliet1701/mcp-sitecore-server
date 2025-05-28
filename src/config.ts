import { z } from "zod";

const ConfigSchema = z.object({
    name: z.string().default("mcp-sitecore-server"),
    graphQL: z.object({
        endpoint: z.string().url().min(1, "endpoint is required"),
        schemas: z.array(z.string()),
        apiKey: z.string(),
        headers: z.record(z.string(), z.string()).optional(),
    }).default({
        endpoint: "https://xmcloudcm.localhost/sitecore/api/graph/",
        schemas: ["edge", "master"],
        apiKey: "{6D3F291E-66A5-4703-887A-D549AF83D859}",
        headers: {},
    }),
    itemService: z.object({
        domain: z.string(),
        username: z.string(),
        password: z.string(),
        serverUrl: z.string().url(),
    }).default({
        domain: "sitecore",
        username: "admin",
        password: "b",
        serverUrl: "https://xmcloudcm.localhost/",
    }),
    powershell: z.object({
        domain: z.string(),
        username: z.string(),
        password: z.string(),
        serverUrl: z.string().url(),
    }).default({
        domain: "sitecore",
        username: "admin",
        password: "b",
        serverUrl: "https://xmcloudcm.localhost/",
    }),
});

export const envSchema = z.object({
    GRAPHQL_ENDPOINT: z.string().url().optional(),
    GRAPHQL_SCHEMAS: z.string().optional(),
    GRAPHQL_API_KEY: z.string().optional(),
    GRAPHQL_HEADERS: z.string().optional(),
    ITEM_SERVICE_DOMAIN: z.string().optional(),
    ITEM_SERVICE_USERNAME: z.string().optional(),
    ITEM_SERVICE_PASSWORD: z.string().optional(),
    ITEM_SERVICE_SERVER_URL: z.string().url().optional(),
    POWERSHELL_DOMAIN: z.string().optional(),
    POWERSHELL_USERNAME: z.string().optional(),
    POWERSHELL_PASSWORD: z.string().optional(),
    POWERSHELL_SERVER_URL: z.string().url().optional(),
});

export const envStartSchema = z.object({
    //* The transport to use for the server. Can be one of 'stdio' or 'sse'.
    //* If not specified, the default is 'stdio'.
    //* The 'stdio' transport is used for local work.
    //* The 'streamable-http' transport is used for HTTP-based communication.
    //* The 'sse' remains for legacy support.
    TRANSPORT: z.string().default("stdio").optional().transform((val) => {
        if (val?.toLowerCase() === "sse") return "sse";
        if (val?.toLowerCase() === "streamable-http") return "streamable-http";
        return "stdio";
    })
});

export type Config = z.infer<typeof ConfigSchema>;
export type EnvConfig = z.infer<typeof envSchema>;
export type EnvStartConfig = z.infer<typeof envStartSchema>;

