// ==================================================
// === LayoutPreview
// ==================================================
class LayoutPreview extends HTMLElement {

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

customElements.define('layout-preview', LayoutPreview);

// ==================================================
// === LayoutPage
// ==================================================
class LayoutPage extends HTMLElement {

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
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: white;
                    width: var(--paper-w, 210mm);
                    height: var(--paper-h, 297mm);
                    margin: 20px auto !important;  /* Abstand zwischen den Seiten in der Web-Ansicht */
                    box-shadow: 0 6px 10px rgba(0,0,0,0.15);
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                    position: relative;
                    overflow: hidden;
                    /* Hier können später die wpx-Theme-Klassen greifen */
                }

                @media print {
                    :host {
                        margin: 0;
                        box-shadow: none;
                        page-break-after: always;
                    }
                }
            </style>
            <slot></slot>
        `;
    }
}

customElements.define('layout-page', LayoutPage);