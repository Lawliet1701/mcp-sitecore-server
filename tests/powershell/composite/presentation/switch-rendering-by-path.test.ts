import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";

await client.connect(transport);

const itemPath = "master:/sitecore/content/Home/Tests/Presentation/Switch-Rendering-By-Path";
const oldRenderingPath = "master:/sitecore/layout/Renderings/Sample/Sample Rendering";
const newRenderingPath = "master:/sitecore/layout/Renderings/Feature/Tests/Switch-Rendering/Expected Rendering";
const newRenderingId = "{1C8B443B-E78A-4AE7-AB30-CB0166299877}";

const language = "ja-jp";
const finalLayout = "true";

describe("powershell", () => {
    it("presentation-switch-rendering-by-path", async () => {
        // Arrange
        // Initialize item initial state before test.
        const resetLayoutArgs: Record<string, any> = {
            path: itemPath,
            finalLayout: "true",
            language,
        };
    
        await callTool(client, "presentation-reset-layout-by-path", resetLayoutArgs);

        const switchRenderingArgs: Record<string, any> = {
            itemPath,
            oldRenderingPath,
            newRenderingPath,
            finalLayout,
            language,
        };
        
        // Act
        await callTool(client, "presentation-switch-rendering-by-path", switchRenderingArgs);

        // Assert
        const getRenderingsArgs: Record<string, any> = {
            path: itemPath,
            language,
            finalLayout,
        };
        
        const result = await callTool(client, "presentation-get-rendering-by-path", getRenderingsArgs);
        const resultJson = JSON.parse(result.content[0].text);
        const rendering = resultJson.Obj[2];
        expect(rendering.ItemID.toLowerCase()).toBe(newRenderingId.toLowerCase());
    });
});