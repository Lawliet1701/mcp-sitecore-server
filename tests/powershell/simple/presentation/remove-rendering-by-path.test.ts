import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";

await client.connect(transport);

const path = "master:/sitecore/content/Home/Tests/Presentation/Remove-Rendering-By-Path";

const sampleRenderingUniqueId = "{B343725A-3A93-446E-A9C8-3A2CBD3DB489}";

const language = "ja-jp";

describe("powershell", () => {
    it("presentation-remove-rendering-by-path", async () => {
        // Arrange
        // Initialize item initial state before test.        
        const resetLayoutArgs: Record<string, any> = {
            path,
            language,
            finalLayout: "true",            
        };
    
        await callTool(client, "presentation-reset-layout-by-path", resetLayoutArgs);

        const removeRenderingArgs: Record<string, any> = {
            path,
            uniqueId: sampleRenderingUniqueId,
            language,
            finalLayout: "true",
        };

        // Act
        await callTool(client, "presentation-remove-rendering-by-path", removeRenderingArgs);

        // Assert
        const getRenderingsArgs: Record<string, any> = {
            path,
            language,
            finalLayout: "true",
        };

        const result = await callTool(client, "presentation-get-rendering-by-path", getRenderingsArgs);
        const resultJson = JSON.parse(result.content[0].text);
        expect(resultJson.Obj.length).toBe(2);
        const sampleRenderingIsPresent =
            resultJson.Obj.some(x => x.UniqueId.toLowerCase() == sampleRenderingUniqueId.toLowerCase());

        expect(sampleRenderingIsPresent).toBe(false);
    });
});