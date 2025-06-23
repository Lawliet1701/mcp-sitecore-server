import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Set-Rendering-By-Id
const itemId = "{5F6540F0-2680-437F-98E9-E20B6B6DB63C}";
const uniqueId = "{B343725A-3A93-446E-A9C8-3A2CBD3DB489}";
const sampleRenderingId = "{493B3A83-0FA7-4484-8FC9-4680991CF743}";
const language = "ja-jp";
const placeholder = "/test/placeholder";
const dataSource = "test_datasource";
const database = "master";

describe("powershell", () => {
    it("presentation-set-rendering-by-id", async () => {
        // Arrange
        // Initialize item initial state before test.
        const resetLayoutArgs: Record<string, any> = {
            id: itemId,
            finalLayout: "true",
            language,
            database,
        };
    
        await callTool(client, "presentation-reset-layout-by-id", resetLayoutArgs);

        const setRenderingArgs: Record<string, any> = {
            itemId,
            uniqueId,
            database,
            placeholder,
            dataSource,
            finalLayout: "true",
            language,
            index: 0,
            parameter: {
                "sample": "value",
            },
        };

        // Act
        await callTool(client, "presentation-set-rendering-by-id", setRenderingArgs);

        // Assert
        const getRenderingsArgs: Record<string, any> = {
            itemId,
            database,
            language,
            finalLayout: "true",
        };

        const result = await callTool(client, "presentation-get-rendering-by-id", getRenderingsArgs);
        const resultJson = JSON.parse(result.content[0].text);
        
        // Assert new index
        const rendering = resultJson.Obj[0];
        expect(rendering.ItemID).toBe(sampleRenderingId);
        expect(rendering.Placeholder).toBe(placeholder);
        expect(rendering.Datasource).toBe(dataSource );
        expect(rendering.Parameters).toContain("sample=value");
    });
});
