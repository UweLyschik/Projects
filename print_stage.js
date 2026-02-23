class PrintStage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                background-color: #d1d1d1;
                min-height: 100vh;
                padding: 40px 0;
                --paper-w: 210mm;
                --paper-h: 297mm;
            }
            .canvas {
                box-sizing: border-box;
                background: white;
                width: var(--paper-w);
                height: var(--paper-h);
                margin: 0 auto;
                box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                position: relative;
                overflow: hidden;
                padding: var(--print-margin, 20mm);
            }
            :host([landscape]) .canvas {
                --paper-w: 297mm;
                --paper-h: 210mm;
            }
            @media print {
                :host { background: none; padding: 0; }
                .canvas { box-shadow: none; margin: 0; }
                @page { size: auto; margin: 0; }
            }
        </style>
        <div class="canvas">
            <slot></slot>
        </div>
        `;
    }
}
customElements.define('print-stage', PrintStage);