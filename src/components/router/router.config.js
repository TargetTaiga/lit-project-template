export const routerConfig = {
    path: 'home',
    component: 'home',
    load: () => import('src/components/home/home.module')
};