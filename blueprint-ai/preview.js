// ==================================================
// === LayoutPreview
// ==================================================
class LayoutCanvas extends HTMLElement {

    // ==================================================
    // === constructor
    // ==================================================
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // ==================================================
    // === connectedCallback
    // ==================================================
    connectedCallback() {
        this.render();
    }

    // ==================================================
    // === render
    // ==================================================
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    /* Hier definieren wir die CSS-Variablen, die an alle <print-page> vererbt werden */
                    --paper-w: 210mm;
                    --paper-h: 297mm;
                }

                :host([landscape]) {
                    --paper-w: 297mm;
                    --paper-h: 210mm;
                }

                .workspace {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 40px 0;
                }

                @media print {
                    .workspace { padding: 0; }
                }
            </style>
            <div class="workspace">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('layout-canvas', LayoutCanvas);