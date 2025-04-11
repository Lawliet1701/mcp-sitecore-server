import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { safeMcpResponse } from "./helper.js";
import { z } from "zod";
import { introspect } from "./tools/introspect.js";

const server = new McpServer({
  name: "Sitecore MCP Server",
  version: "1.0.0"
});

// Helper to create DB connection

// hardcode the config for now
const conf = {
  name: "mcp-server-graphql",
  allowMutations: false,
  endpoint: "https://xmcloudcm.localhost/sitecore/api/graph/edge?sc_apikey={6D3F291E-66A5-4703-887A-D549AF83D859}",
  headers: {},
};

server.resource(
  "schema",
  "schema://main",
  async (uri) => {

    return {
      contents: [{
        uri: uri.href,
        text: "Schema",
      }]
    }
  }
);

server.tool(
  'introspect-graphql',
  "Introspect the Sitecore GraphQL schema, use this tool before doing a query to get the schema information if you do not have it available as a resource already.",
  {},
  () => {
    return safeMcpResponse(introspect(conf))
  }
)

server.tool(
  'query-graphql',
  "Query a Sitecore GraphQL endpoint with the given query and variables.",
  {
    query: z.string(),
		variables: z.string().optional(),
  },
  () => {
    return safeMcpResponse(introspect(conf))
  }
)

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
