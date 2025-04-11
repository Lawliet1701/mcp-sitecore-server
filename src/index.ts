import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { safeMcpResponse } from "./helper.js";
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
  'introspect',
  "List all available GraphQL queries and mutations",
  {},
  () => {
    return safeMcpResponse(introspect(conf))
  }
)

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
