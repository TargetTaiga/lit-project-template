import { LitElement, html } from 'lit-element';
import { store } from '../../store/store';
import { connect } from 'pwa-helpers/connect-mixin';
import { Route } from './router.config';
import { hashSelector, routeSelector } from './router.selectors';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

export class RouterComponent extends connect(store)(LitElement) {
    routesLoadingStatus: {[hash: string]: boolean} = {};
    activeRoute: Route;
    hash: string;

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
        if (this.hash && this.activeRoute) {
            this.loadRoute();
        }
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
        return html`${unsafeHTML(this.getComponent())}`
    }
}

