const addcard = {
    template: `<div>
    <div v-if="success">
    <form action=''>
     <input type='text' name='front' placeholder='Front' v-model="formData.front"/>
     <input type='text' name='back' placeholder='Back' v-model="formData.back"/>
     <button @click.prevent="newcard"> Add </button>
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
            back:''
        },
        success: true,
        error: 'Something went wrong',
    }
},
async mounted(){
    const res = await fetch(`/api/users/1`, {
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('auth-token'),
        },
    })
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      this.formData = data
    } else if (res.status == 401) {
      this.success = false
      this.error = data.response.error
    } else {
      this.success = false
      this.error = data.message
    }
  },
methods:{
    async newcard(){
        const res = await fetch(`/api/addcard/${this.$route.params.dname}/${this.formData.front}/${this.formData.back}`,{
            headers:{
                'Content-Type':'application/json',
            }
        })
        if (res.ok){
            const data =  await res.json()
            print("add Happens/n")
            var url= "/database";
            window.location = url;
        }
        else{
            console.log("Something went wrong")
        }
    }
}
}

export default addcard