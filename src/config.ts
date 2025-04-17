import { server } from "typescript";
import { z } from "zod";

const ConfigSchema = z.object({
    name: z.string().default("mcp-server-graphql"),
    allowMutations: z.boolean().default(false),
    endpoint: z.string().url().min(1, "endpoint is required"),
    headers: z.record(z.string()).default({}),
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
});

export type Config = z.infer<typeof ConfigSchema>;

