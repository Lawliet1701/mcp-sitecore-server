import { z } from "zod";

const ConfigSchema = z.object({
    name: z.string().default("mcp-server-graphql"),
    allowMutations: z.boolean().default(false),
    endpoint: z.string().url().min(1, "endpoint is required"),
    headers: z.record(z.string()).default({}),
});

export type Config = z.infer<typeof ConfigSchema>;

