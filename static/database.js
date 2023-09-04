import new_deck from './components/adddeck.js'
import deletedeck from './components/deletedeck.js'
import addcard from './components/addcard.js'
import deletecard from './components/deletecard.js'
import trash from './components/trash.js'

const routes = [
    {path : '/adddeck',component: new_deck},
    {path : '/deletedeck/:dname',component: deletedeck},
    {path : '/addcard/:dname',component:addcard},
    {path : '/deletecard/:dname',component:deletecard},
    {path : '/:dname',component:trash},
]

const router = new VueRouter({
    routes,
    base:'/adddeck',
})

const app = new Vue({
    el:"#app",
    router,
})