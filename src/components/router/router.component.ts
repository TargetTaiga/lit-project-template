import { LitElement, html } from 'lit-element';
import { store } from '../../store/store';
import { connect } from 'pwa-helpers/connect-mixin';
import { Route } from './router.config';
import { hashSelector, routeSelector } from './router.selectors';

export class RouterComponent extends connect(store)(LitElement) {
    activeRoute: Route;
    hash: string;
    routesLoadingStatus: {[hash: string]: boolean};

    static get properties() {
        return {
            activeRoute: { type: Object }
        }
    }

    constructor() {
        super();
    }

    stateChanged(state: any) {
        this.hash = hashSelector(state);
        this.activeRoute = routeSelector(state);
        this.loadRoute();
    }

    loadRoute() {
        if (!this.routesLoadingStatus[this.hash]) {
            this.activeRoute.load();
            this.routesLoadingStatus[this.hash] = true;
        }
    }

    getComponent() {
        if (this.activeRoute) {
            return `<${this.activeRoute.component}></${this.activeRoute.component}>`;
        }
        return '';
    }

    render() {
        return html`<div>${this.getComponent()}</div>`
    }
}

