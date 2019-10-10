// export class Router {
// //     constructor(config) {
// //         this.config = config;
// //     }
// //
// //     render(hash) {
// //         const parts = hash.slice(2).split('/');
// //         const component = parts.reduce(((config, path) => {
// //             try {
// //                 return config[path];
// //             } catch (e) {
// //                 throw new Error(`There's no matching component for path ${hash}`);
// //             }
// //         }), this.config);
// //     }
// // }

import { LitElement, html } from 'lit-element';
import { store } from '../../store/store';
import { connect } from 'pwa-helpers/connect-mixin';

export class RouterComponent extends connect(store)(LitElement) {
    static get properties() { return {
        hash: { type: String }
    }}

    stateChanged(state) {
        if (state.router && state.router.hash !== this.hash) {
            this.hash = state.router.hash;
        }
    }

    render() {
        return html`<h3>Hey! I'm router ${this.hash}</h3>`
    }
}

