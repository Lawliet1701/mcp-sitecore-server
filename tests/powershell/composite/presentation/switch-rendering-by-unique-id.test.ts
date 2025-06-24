import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Switch-Rendering-By-Unique-Id
const itemId = "{F8C6F8A2-A505-47C9-AB80-BFA551E616C0}";
const uniqueId = "{B343725A-3A93-446E-A9C8-3A2CBD3DB489}";

// /sitecore/layout/Renderings/Feature/Tests/Switch-Rendering/Expected Rendering
const newRenderingId = "{1C8B443B-E78A-4AE7-AB30-CB0166299877}";

const database = "master";
const language = "ja-jp";
const finalLayout = "true";

describe("powershell", () => {
    it("presentation-switch-rendering-by-unique-id", async () => {
        // Arrange
        // Initialize item initial state before test.
        const resetLayoutArgs: Record<string, any> = {
            id: itemId,
            database,
            finalLayout: "true",
            language,
        };
    
        await callTool(client, "presentation-reset-layout-by-id", resetLayoutArgs);

        const switchRenderingArgs: Record<string, any> = {
            itemId,
            uniqueId,
            newRenderingId,            
            database,
            finalLayout,
            language,
        };
        
        // Act
        await callTool(client, "presentation-switch-rendering-by-unique-id", switchRenderingArgs);

        // Assert
        const getRenderingsArgs: Record<string, any> = {
            itemId,
            database,
            language,
            finalLayout,
        };
        
        const result = await callTool(client, "presentation-get-rendering-by-id", getRenderingsArgs);
        const resultJson = JSON.parse(result.content[0].text);
        const rendering = resultJson.Obj[2];
        expect(rendering.ItemID.toLowerCase()).toBe(newRenderingId.toLowerCase());
    });
});