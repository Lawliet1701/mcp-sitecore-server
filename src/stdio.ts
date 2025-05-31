import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getServer } from './server.js';
export async function startSTDIO() {
    const server = await getServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
}