import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("indexing-initialize-search-index-item-by-path", async () => {
        const testItemPath = "/sitecore/content/Home/Tests/Indexing/Initialize-SearchIndexItem-By-Path";

        const args: Record<string, any> = {
            path: testItemPath,
            indexName: "sitecore_test_index"
        };

        const result = await callTool(client, "indexing-initialize-search-index-item-by-path", args);
        const json = JSON.parse(result.content[0].text);

        // Verify that the command executed successfully
        expect(json).toBeDefined();

        // The result should be successful (no errors thrown)
        expect(result.content[0].text).toBeDefined();

        // find the item in the index
        const searchArgs: Record<string, any> = {
            index: "sitecore_test_index",
            criteria: [
                {
                    filter: "Equals",
                    field: "_path",
                    value: "{80085F63-DFDF-48CD-900D-3B2028FEFFDF}"
                }
            ],
            first: 1,  // Limiting results for test performance
            skip: 0
        };

        // sleep to ensure the indexing operation has time to complete
        await new Promise(resolve => setTimeout(resolve, 5000));
        const searchResult = await callTool(client, "indexing-find-item", searchArgs);
        const searchJson = JSON.parse(searchResult.content[0].text);
        // Verify that the search result is successful
        expect(searchJson).toBeDefined();
        expect(searchJson.Obj[0].Name).toBe("Initialize-SearchIndexItem-By-Path");
    });
});
