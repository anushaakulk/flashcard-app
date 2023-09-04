import login from './components/login.js'
import register from './components/register.js'

const routes = [
    {path : '/login',component: login},
    {path: '/register',component: register},
]

const router = new VueRouter({
    routes,
    base:'/database',
})

const app = new Vue({
    el:"#app",
    router,
    methods:{
        async logout(){
            const res = await fetch(`/api/logout`,{
                headers:{
                    'Content-Type':'application/json',
                    'Authentication-Token': localStorage.getItem('auth-token'),
                }
            })
            if(res.ok){
                const data = await fetch('/logout')
                if(data.ok){
                    console.log("api logout success")
                }
                else{
                    console.log("api logout fail")
                }
                localStorage.clear()
            } else {
                console.log('No user logged in')
            }
        },
    },
})