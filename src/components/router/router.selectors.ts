import { createSelector } from 'reselect';
import { Route, routerConfig } from './router.config';

export const hashSelector = createSelector(
    (state: any) => state.router && state.router.hash,
    (hash: string) => hash);

export const routeSelector = createSelector(
    hashSelector,
    (hash: string) => {
        if (hash) {
            const parts = hash.slice(2).split('/');
            try {
                let route: Route;
                let children: Route[] = routerConfig;
                parts.forEach((part: string) => {
                    const target = children.find((route: Route) => route.path === part);
                    route = target;
                    children = target.children;
                });
                return route;
            } catch (e) {
                throw new Error(`There's no matching route for path ${hash}`);
            }
        }
        return null;
    });