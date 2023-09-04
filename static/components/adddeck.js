const new_deck = {
    template: `<div>
    <div v-if="success">
    <form action=''>
     <input type='text' name='dname' id='dname' placeholder='Enter deck name' v-model="formData.dname"/>
     <button @click.prevent="newdeck"> Add </button>
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
            dname:'',
        },
        success: true,
        error: 'Something went wrong',
    }
},
async mounted(){
    const res = await fetch(`/api/users`, {
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
    async newdeck(){
        const res = await fetch(`/api/deck/${this.formData.dname}`,{
            headers:{
                'Content-Type':'application/json',
                'Authentication-Token':localStorage.getItem('auth-token')
            }
        })
        const data = await res.json()
        if (res.ok){
            console.log(data)
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

export default new_deck