const mark = {
    template: `
    <div>
    <div v-if="success">
    <h3 style="color:tomato">{{formData.back}}</h3>
    <form action=''>
   <input type="radio" id="hard" value="Hard" v-model="formData.level">
   <label for="hard">Hard</label><br>
   <input type="radio" id="good" value="Good" v-model="formData.level">
   <label for="good">Good</label><br>
   <input type="radio" id="easy" value="Easy" v-model="formData.level">
   <label for="easy">Easy</label><br>
   <button @click.prevent="levelof"> Submit </button>
  </form>
  </div>
    <div v-else>
    {{error}}
    </div>
  </div>
    `
,

data(){
    return {
        formData:{
            front:'',
            back:'',
            level:''
        },
        success:true,
        error:'Something went wrong',
    }
},
async mounted(){
    console.log("SHIT")
    const res = await fetch(`/api/review/${this.$route.params.front}`,{
        headers:{
            'Content-type': 'application/json', 
            }
    })
    const data = await res.json()
    if(res.ok){
        this.formData = data
        print("pass")
    } else{
        this.success = false
        print("fail")
        this.error = data.message
    }
},
methods:{
    async levelof(){
        const res = await fetch(`/api/points/${this.$route.params.front}/${this.formData.level}`,{
            headers:{
                'Content-type': 'application/json', 
            }
        })
        const data = await res.json()
        if(res.ok){
            this.formData = data
            print("pass")
            var url= `/${this.$route.params.dname}`;
            window.location = url;
        } else{
            this.success = false
            print("fail")
            this.error = data.message
        }
    }
}
}

export default mark