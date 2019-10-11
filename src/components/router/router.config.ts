export interface Route {
    path: string,
    component: string,
    load: () => void,
    children?: Route[];
}

export const routerConfig: Route[] = [{
    path: 'home',
    component: 'home',
    load: () => import('../home/home.module')
}, {
    path: 'page1',
    component: 'home',
    load: () => import('../home/home.module')
}];