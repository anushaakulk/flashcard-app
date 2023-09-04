var appid="875fd311fa07fc9dfbadbb82a65b7413"
Vue.component('city', {
    props: ['c'],
    data: function() {
        return {
        }
    },
    template: `
    <div class="card style='width: 18rem;'">
        <div class="card-body">
            <div class="card-title">{{ c.name }}</div>
            <div class="card-text" v-if="!c.err">
                Current temp: {{ c.temp }}<br />
                Min temp: {{ c.temp_min }}<br />
                Max temp: {{ c.temp_max }}<br />
                Last updated: {{ c.lastUpdate }}<br />
            </div>
            <div class="card-text alert alert-danger" v-else>
                Something went wrong: {{ c.errmsg }}
            </div>
            <button class="btn btn-primary" @click="update">Update</button>
            <button class="btn btn-danger" @click="remove">Delete</button>
        </div>
    </div>
    `,
    created() {
        Vue.set(this.c, 'temp', "NA");
        this.c.temp_min = "NA";
        this.c.temp_max = "NA";
        this.c.err = false;
    },
    methods: {
        updateTemp() {
            if (!this.c.err) {
                if(localStorage.length>0){
                    x = this.c.weather.main.temp;
                    Vue.set(this.c, 'temp', x ? parseFloat(x-273).toFixed(1) : "NA");
                    x = this.c.weather.main.temp_min;
                    this.c.temp_min = x ? parseFloat(x-273).toFixed(1) : "NA";
                    x = this.c.weather.main.temp_max;
                    this.c.temp_max = x ? parseFloat(x-273).toFixed(1) : "NA";
                    let area = JSON.parse(localStorage.cities);
                    area[this.c.name].temp = this.c.temp;
                    area[this.c.name].temp_min = this.c.temp_min;
                    area[this.c.name].temp_max = this.c.temp_max;
                    area[this.c.name].lastUpdate = this.c.lastUpdate;
                    localStorage.setItem('cities', JSON.stringify(area));
                }
                /*
                else{
                    x = this.c.weather.main.temp;
                    Vue.set(this.c, 'temp', x ? parseFloat(x-273).toFixed(1) : "NA");
                    x = this.c.weather.main.temp_min;
                    this.c.temp_min = x ? parseFloat(x-273).toFixed(1) : "NA";
                    x = this.c.weather.main.temp_max;
                    this.c.temp_max = x ? parseFloat(x-273).toFixed(1) : "NA";
                }*/
            }
        },
        async update() {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.c.name}&APPID=875fd311fa07fc9dfbadbb82a65b7413`;
            console.log("Child " + url);
            fetch(url)
                .then((resp) => {
                    if (resp.status >= 400 && resp.status < 600) {
                        this.c.err = true;
                        this.c.errmsg = "Could not retrieve data for city";
                        return resp;
                    } else {
                        return resp.json()
                    }
                })
                .then((data) => {
                    this.c.weather = data;
                    this.updateTemp();
                    this.$forceUpdate();
                })
                .catch((err) => {
                    this.c.err = true;
                    this.c.errmsg = "Network error" + err;
                })
            this.c.err = false;
            this.c.lastUpdate = new Date().toJSON();
        },
        remove() {
            this.$parent.removeCity(this.c.name);
        }
    },
})

let app = new Vue({
    el: "#app",
    data: {
        newcity: "",
        // cities: {chennai: {name: "chennai"}}, // Init value for simplicity
        cities: {chennai: {name: "chennai"}, 
                 mumbai:  {name: "mumbai"},
                 london:  {name: "london"},
                 paris:  {name: "paris"},}, // Init value for simplicity
    },
    mounted(){
        if(localStorage.length>0){
          this.cities = JSON.parse(localStorage.cities);
        }
        else{
         localStorage.setItem("cities",JSON.stringify(this.cities));
        }
        console.log(JSON.parse(localStorage.cities));
        console.log(JSON.stringify(this.cities))
    },
    methods: {
        addCity(c) {
            this.cities[c] = {name: c};
            localStorage.setItem("cities",JSON.stringify(this.cities));
            console.log(JSON.parse(localStorage.cities));
            /*for(const a in this.cities){
                localStorage.setItem(a,a)
            }*/
            this.newcity = "";
        },
        removeCity(c) {
            delete this.cities[c];
            localStorage.setItem("cities",JSON.stringify(this.cities));
            this.$forceUpdate();
        },
    }
})
