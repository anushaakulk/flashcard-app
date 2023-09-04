const store = new Vuex.Store({
    state: {
        discount:10,
        products:[
            {name:'apple',
             price:120
            },
            {
                name:'banana',
                price:60
            }
        ]
    },
    mutations: {
        reducePrice:state => {
            commit.products.forEach(product => {
                product.price -= (state.discount)/100*product.price;
            })
        }
    }
})
new Vue({
    el:"#app",
    store:store,

    computed:{
        products(){
            return store.state.products
        }
    }
})