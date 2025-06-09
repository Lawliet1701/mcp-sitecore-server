import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";
import { getCurrentLayoutId } from "../../tools/get-current-layout-id";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Reset-Layout-By-Path
const itemId = "{C4E97DA7-4C43-44E8-AFBB-B1B634BEB022}";
const itemPath = "master:/sitecore/content/Home/Tests/Presentation/Reset-Layout-By-Path";

// /sitecore/layout/Layouts/Sample Layout
const sampleLayoutId = "{14030E9F-CE92-49C6-AD87-7D49B50E42EA}";

// /sitecore/layout/Layouts/Feature/Tests/Reset-Layout/InitialLayout
const initialLayoutId = "{C088204D-9C63-4A70-8846-D7233D660B0A}";

describe("powershell", () => {
    it("presentation-reset-layout-by-path", async () => {
        // Arrange
        const initialSetUpArgs: Record<string, any> = {
            itemId,
            layoutId: initialLayoutId,
            layoutPath: "master:",
            language: "ja-jp",
            finalLayout: "true",
        };

        // Initialize item initial state before test.
        await callTool(client, "presentation-set-layout-by-id", initialSetUpArgs);

        // Assert the test item has been initialized correctly before test.
        const currentLayoutId = await getCurrentLayoutId(client, itemId);
        expect(currentLayoutId.toLowerCase()).toBe(initialLayoutId.toLowerCase());

        const resetLayoutArgs: Record<string, any> = {
            path: itemPath,
            finalLayout: "true",
            language: "ja-jp",
        };
    
        // Act
        await callTool(client, "presentation-reset-layout-by-path", resetLayoutArgs);

        // Assert
        const resultLayoutId = await getCurrentLayoutId(client, itemId);
        expect(resultLayoutId.toLowerCase()).toBe(sampleLayoutId.toLowerCase());
    });
});