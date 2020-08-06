import context from "../../__mocks__/context";
import BitbucketService from "./bitbucket-service";

let bitbucketService;

describe("Bitbucket Service", () => {
    beforeAll(() => {
        bitbucketService = new BitbucketService(context());
    });

    test("Revision id should be encoded", () => {
        expect(bitbucketService.revisionId).toBe("refs%2Fheads%2Fmaster");
    });

    test("Project key should be stored", () => {
        expect(bitbucketService.projectKey).toBe("PK");
    });

    test("Repo slug should be stored", () => {
        expect(bitbucketService.repoSlug).toBe("RS");
    });

    test("Path should be stored", () => {
        expect(bitbucketService.path).toBe("folder/README.adoc");
    });

    test("Raw url should be built correct", () => {
        expect(bitbucketService.rawUrl()).toBe("context/projects/PK/repos/RS/raw/folder/README.adoc?at=refs%2Fheads%2Fmaster");
    });
});
