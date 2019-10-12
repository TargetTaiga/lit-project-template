export interface Route {
    path: string,
    component: string,
    load: () => void,
    children?: Route[];
}

export const routerConfig: Route[] = [{
    path: '',
    component: 'x-home',
    load: () => import('../home/home.module')
}, {
    path: 'about',
    component: 'x-contact',
    load: () => import('../contact/contact.module')
}];