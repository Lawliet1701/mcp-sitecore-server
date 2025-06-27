import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Remove-Rendering-By-Id
const itemId = "{4F0080AF-E681-4B89-95F9-BC3669546554}";

const sampleRenderingUniqueId = "{B343725A-3A93-446E-A9C8-3A2CBD3DB489}";

const language = "ja-jp";
const database = "master";

describe("powershell", () => {
    it("presentation-remove-rendering-by-id", async () => {
        // Arrange
        // Initialize item initial state before test.        
        const resetLayoutArgs: Record<string, any> = {
            id: itemId,
            database,
            language,
            finalLayout: "true",            
        };
    
        await callTool(client, "presentation-reset-layout-by-id", resetLayoutArgs);

        const removeRenderingArgs: Record<string, any> = {
            itemId,
            uniqueId: sampleRenderingUniqueId,
            database,
            language,
            finalLayout: "true",
        };

        // Act
        await callTool(client, "presentation-remove-rendering-by-id", removeRenderingArgs);

        // Assert
        const getRenderingsArgs: Record<string, any> = {
            itemId,
            language,
            finalLayout: "true",
        };

        const result = await callTool(client, "presentation-get-rendering-by-id", getRenderingsArgs);
        const resultJson = JSON.parse(result.content[0].text);
        expect(resultJson.Obj.length).toBe(2);
        const sampleRenderingIsPresent =
            resultJson.Obj.some(x => x.UniqueId.toLowerCase() == sampleRenderingUniqueId.toLowerCase());

        expect(sampleRenderingIsPresent).toBe(false);
    });
});