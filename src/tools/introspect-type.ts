import { type CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { buildClientSchema, getIntrospectionQuery, printSchema } from "graphql";
import { type IntrospectionQuery } from "graphql";
import { type Config } from "../config.js";

export async function introspect(conf: Config): Promise<CallToolResult> {
    const response = await fetch(conf.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...conf.headers,
        },
        body: JSON.stringify({
            query: getIntrospectionQuery(),
        }),
    });

    if (!response.ok) {
		throw new Error(`GraphQL request failed: ${response.statusText}`);
	}

	const responseJson = await response.json() as unknown as { data: IntrospectionQuery };
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