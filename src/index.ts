import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getServer } from './server.js';

const server = getServer();
const transport = new StdioServerTransport();
await server.connect(transport);
