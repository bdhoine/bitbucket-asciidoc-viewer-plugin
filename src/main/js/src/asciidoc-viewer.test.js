import {handler, weight} from "./asciidoc-viewer";
import context from "../__mocks__/context";

let returnedHandler;

jest.mock("./asciidoc/asciidoc-view");

describe("AsciidocViewer", () => {
    beforeAll(() => {
        returnedHandler = handler(context());
    });

    test("Weight should be 900", () => {
        expect(weight).toBe(900);
    });

    test("Handler should return a destroy function", () => {
        expect(typeof returnedHandler.destroy).toBe("function");
    });

    test("Destroy handler should remove container", () => {
        returnedHandler.destroy();
        expect(returnedHandler.asciidocView.destroy).toBeCalled();
    });

    test("Nothing should be returned when a file can not be handled", () => {
        const invalidHandler = handler(context("md"));
        expect(invalidHandler).toBeUndefined();
    });
});
