import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";
import { resetLayoutByPath } from "../../tools/reset-layout";

await client.connect(transport);

const itemPath = "master:/sitecore/content/Home/Tests/Presentation/Add-Rendering-By-Path";
const renderingPath = "master:/sitecore/layout/Renderings/Sample/Sample Rendering";
const sampleRenderingId = "{493B3A83-0FA7-4484-8FC9-4680991CF743}";
const language = "ja-jp";
const placeHolder = "/test/placeholder";
const dataSource = "test_datasource";
const finalLayout = "true";

describe("powershell", () => {
    it("presentation-add-rendering-by-path", async () => {
        // Arrange
        // Initialize item initial state before test.
        await resetLayoutByPath(client, itemPath, language, finalLayout);

        const addRenderingArgs: Record<string, any> = {
            itemPath,
            renderingPath,
            placeHolder,
            dataSource,
            finalLayout,
            language,
            index: 0,
        };

        // Act
        await callTool(client, "presentation-add-rendering-by-path", addRenderingArgs);

        // Assert
        const getRenderingsArgs: Record<string, any> = {
            path: itemPath,
            language,
            finalLayout,
        };

        const result = await callTool(client, "presentation-get-rendering-by-path", getRenderingsArgs);
        const resultJson = JSON.parse(result.content[0].text);
        expect(resultJson.Obj.length).toBe(4);
        const addedRendering = resultJson.Obj[0];
        expect(addedRendering.ItemID).toBe(sampleRenderingId);
        expect(addedRendering.Placeholder).toBe(placeHolder);
        expect(addedRendering.Datasource).toBe(dataSource );
    });
});