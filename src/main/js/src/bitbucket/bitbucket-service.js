import AJS from "ajs";

export default class BitbucketService {
    constructor(context) {
        this.revisionId = encodeURIComponent(context.fileChange.commitRange.untilRevision.id);
        this.projectKey = context.fileChange.repository.project.key;
        this.repoSlug = context.fileChange.repository.slug;
        this.path = context.fileChange.path.components.join("/");
    }

    get rawUrl() {
        const contextPath = AJS.contextPath();
        const rawPath = `/projects/${this.projectKey}/repos/${this.repoSlug}/raw/${this.path}`;
        return `${contextPath}${rawPath}?at=${this.revisionId}`;
    }
}