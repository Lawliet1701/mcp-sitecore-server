import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { buildClientSchema, getIntrospectionQuery, printSchema } from "graphql";
import { type Config } from "../config.js";
import { parse } from "graphql/language/index.js";

export async function graphqlQuery(conf: Config, query: string, variables?: string): Promise<CallToolResult> {
    const parsedQuery = parse(query);
    const response = await fetch(conf.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...conf.headers,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const responseJson = await response.json();
    // Transform to a schema object
    const schema = buildClientSchema(responseJson.data);

    // Print the schema SDL
    return {
        content: [
            {
                type: "text",
                text: printSchema(schema),
            },
        ],
        isError: false,
    }
}