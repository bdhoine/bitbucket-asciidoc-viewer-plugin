import hljs from "highlight.js";
import "highlight.js/styles/github.css";

import Asciidoctor from "asciidoctor";
import BitbucketService from "../bitbucket/bitbucket-service";

export default class AsciidocView {
    constructor(context) {
        this.bitbucketService = new BitbucketService(context);
        this.container = document.createElement("div");
        context.$container.append(this.container);
    }

    html() {
        return this.container.outerHTML;
    }

    async render() {
        const asciidoctor = new Asciidoctor();
        await fetch(this.bitbucketService.rawUrl()).then(response => {
            response.text().then(text => {
                const html = asciidoctor.convert(text);
                this.renderHtml(html);
            });
        });
    }

    destroy() {
        this.container.remove();
    }

    renderHtml(html) {
        this.container.insertAdjacentHTML("beforeend", html);
        this.addClasses();
        this.rewriteImages();
        this.highlightCode();
    }

    addClasses() {
        ["markup", "markup-content", "asciidoc"].forEach(className => {
            this.container.classList.add(className);
        });
    }

    rewriteImages() {
        this.container.querySelectorAll("img").forEach(image => {
            const src = image.getAttribute("src");
            if (!src.startsWith("http")) {
                const separator = src.includes("?") ? "&" : "?";
                image.src = `${src}${separator}at=${this.bitbucketService.revisionId}&raw`;
            }
        });
    }

    highlightCode() {
        this.container.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block);
        });
    }
}
