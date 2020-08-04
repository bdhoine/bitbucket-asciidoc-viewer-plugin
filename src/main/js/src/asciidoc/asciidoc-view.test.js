import context from "../../__mocks__/context";
import adoc from "../../fixtures/README.adoc";
import html from "../../fixtures/README.html";
import AsciidocView from "./asciidoc-view";

import fetchMock from "jest-fetch-mock";

let asciidocView;

describe("Asciidoc View", () => {
    beforeAll(async () => {
        fetchMock.enableMocks();
        fetchMock.mockResponse(adoc);

        asciidocView = new AsciidocView(context());
        await asciidocView.render();
    });

    test("Rendered asciidoc should be valid", () => {
        expect(asciidocView.html).toBe(html);
    });

    test("Local images should be rewritten", () => {
        expect(asciidocView.html).toContain("octocat.jpg?at=refs%2Fheads%2Fmaster&amp;raw");
    });

    test("Source code should be detected and highlighted", () => {
        expect(asciidocView.html).toContain("code class=\"language-ruby hljs\"");
    });

    test("Destroy should remove container", () => {
        asciidocView.destroy();
        expect(asciidocView.container.remove).toBeCalled;
    });
});
