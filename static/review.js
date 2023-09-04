import mark from './components/mark.js'

const routes = [
    {path : '/review/:dname/:front',component: mark},
]

const router = new VueRouter({
    routes,
    base:'/review/:dname/:front',
})

const app = new Vue({
    el:"#app",
    router,
})