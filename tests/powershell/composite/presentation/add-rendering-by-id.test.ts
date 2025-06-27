import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Add-Rendering-By-Id
const itemId = "{EA968F75-3F40-4493-A710-11902D4749B7}";
// /sitecore/layout/Renderings/Sample/Sample Rendering
const renderingId = "{493B3A83-0FA7-4484-8FC9-4680991CF743}";
const language = "ja-jp";
const placeHolder = "/test/placeholder";
const dataSource = "test_datasource";
const database = "master";

describe("powershell", () => {
    it("presentation-add-rendering-by-id", async () => {
        // Arrange
        // Initialize item initial state before test.
        const resetLayoutArgs: Record<string, any> = {
            id: itemId,
            database,
            finalLayout: "true",
            language,
        };
    
        await callTool(client, "presentation-reset-layout-by-id", resetLayoutArgs);

        const addRenderingArgs: Record<string, any> = {
            itemId,
            database,
            renderingId,
            placeHolder,
            dataSource,
            finalLayout: "true",
            language,
            index: 0,
        };

        // Act
        await callTool(client, "presentation-add-rendering-by-id", addRenderingArgs);

        // Assert
        const getRenderingsArgs: Record<string, any> = {
            itemId,
            database,
            language,
            finalLayout: "true",
        };

        const result = await callTool(client, "presentation-get-rendering-by-id", getRenderingsArgs);
        const resultJson = JSON.parse(result.content[0].text);
        expect(resultJson.Obj.length).toBe(4);
        const addedRendering = resultJson.Obj[0];
        expect(addedRendering.ItemID).toBe(renderingId);
        expect(addedRendering.Placeholder).toBe(placeHolder);
        expect(addedRendering.Datasource).toBe(dataSource);
    });
});
