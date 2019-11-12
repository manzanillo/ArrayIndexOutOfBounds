import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id));
const QuestionView = () => import('../views/QuestionView.vue');
const UserView = () => import('../views/UserView.vue');
const CreateQuestionView = () => import('../views/CreateQuestionView.vue');
const ImpressumView = () => import('../views/ImpressumView.vue');

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            { path: '/top/:page(\\d+)?', component: createListView('top') },
            { path: '/new/:page(\\d+)?', component: createListView('new') },
            { path: '/show/:page(\\d+)?', component: createListView('show') },
            { path: '/job/:page(\\d+)?', component: createListView('job') },
            { path: '/question/:id', component: QuestionView },
            { path: '/user/:id', component: UserView },
            { path: '/ask', component: CreateQuestionView },
            { path: '/impressum', component: ImpressumView },
            { path: '/', redirect: '/top' }
        ]
    });
}
