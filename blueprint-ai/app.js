/**
 * app.js - Blueprint AI Layout Engine Logic
 * Pure CSS & Vanilla JS implementation.
 */

class AppHeader extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'App';
        const version = this.getAttribute('version') || '';

        // Wir nutzen hier das Template direkt im innerHTML. 
        // Für eine noch stärkere Kapselung könnte man später Shadow DOM nutzen.
        this.innerHTML = `
            <style>
                .header-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 100%;
                    padding: 0 24px;
                    background: var(--ui-nav-bg);
                    border-bottom: 1px solid var(--ui-border);
                    box-sizing: border-box;
                }
                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .logo {
                    width: 32px;
                    height: 32px;
                    background: var(--accent);
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .brand-meta {
                    line-height: 1.2;
                }
                .brand-title {
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    color: var(--text-main);
                }
                .brand-version {
                    font-size: 10px;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .header-center {
                    display: flex;
                    background: rgba(0,0,0,0.3);
                    padding: 4px;
                    border-radius: 8px;
                    border: 1px solid var(--ui-border);
                }
                .mode-btn {
                    padding: 6px 16px;
                    font-size: 11px;
                    font-weight: 700;
                    border-radius: 6px;
                    border: none;
                    background: transparent;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .mode-btn.active {
                    background: rgba(255,255,255,0.1);
                    color: white;
                }
                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .slider-controls {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                    font-size: 11px;
                    color: var(--text-muted);
                }
                input[type="range"] {
                    cursor: pointer;
                    accent-color: var(--accent);
                    width: 120px;
                }
            </style>
            
            <div class="header-wrapper">
                <div class="header-left">
                    <div class="logo">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                            <path d="M3 3h18v18H3zM9 3v18M3 9h18"/>
                        </svg>
                    </div>
                    <div class="brand-meta">
                        <div class="brand-title">${title}</div>
                        <div class="brand-version">${version}</div>
                    </div>
                </div>

                <div class="header-center">
                    <button id="btn-continuous" class="mode-btn active">CONTINUOUS</button>
                    <button id="btn-paginated" class="mode-btn">PAGINATED</button>
                </div>

                <div class="header-right">
                    <div class="slider-controls">
                        <span id="width-display">1000</span>mm
                        <input type="range" id="main-slider" min="400" max="1400" value="1000">
                    </div>
                </div>
            </div>
        `;

        // Timeout stellt sicher, dass das DOM fertig gerendert ist
        setTimeout(() => this.setupEventListeners(), 0);
    }

    setupEventListeners() {
        const slider = this.querySelector('#main-slider');
        const display = this.querySelector('#width-display');
        const btnCont = this.querySelector('#btn-continuous');
        const btnPag = this.querySelector('#btn-paginated');
        const canvas = document.querySelector('layout-canvas');

        if (!canvas || !slider) return;

        slider.oninput = (e) => {
            const val = e.target.value;
            display.innerText = val;
            canvas.setAttribute('width', val);
        };

        const setMode = (mode) => {
            canvas.setAttribute('mode', mode);
            if(mode === 'continuous') {
                btnCont.classList.add('active');
                btnPag.classList.remove('active');
            } else {
                btnPag.classList.add('active');
                btnCont.classList.remove('active');
            }
        };

        btnCont.onclick = () => setMode('continuous');
        btnPag.onclick = () => setMode('paginated');
    }
}

class LayoutCanvas extends HTMLElement {
    static get observedAttributes() { return ['mode', 'width']; }
    
    connectedCallback() { 
        this.update(); 
    }
    
    attributeChangedCallback() { 
        this.update(); 
    }

    update() {
        const stage = this.querySelector('.layout-stage');
        if (!stage) return;
        
        const mode = this.getAttribute('mode') || 'continuous';
        const width = this.getAttribute('width') || '1000';
        
        stage.className = `layout-stage mode-${mode}`;
        stage.style.width = `${width}px`;
    }
}

class LayoutSection extends HTMLElement {
    // Hier könnten später Logiken für Sektions-Einstellungen rein
}

// Registrierung der Custom Elements
customElements.define('app-header', AppHeader);
customElements.define('layout-canvas', LayoutCanvas);
customElements.define('layout-section', LayoutSection);