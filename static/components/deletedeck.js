const deletedeck = {
    template:`<div>
    <div v-if="success">
    Deleted Deck {{$route.params.dname}} Successfully
    </div>
     <div v-else>
        {{error}}
     </div>
   </div>`
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
        const res = await fetch(`/api/deletedeck/${this.$route.params.dname}`,{
            headers:{
                'Content-Type':'application/json',
                'Authentication-Token': localStorage.getItem('auth-token'),
            }
        })
        const data =  await res.json()
        console.log(data)
        console.log("Reassuring")
        if (res.ok){
            this.formData = data
            print("Happens\n")
            var url= "/database";
            window.location = url;
        }else if (res.status == 401) {
            this.success = false
            this.error = data.response.error
          } else {
            this.success = false
            this.error = data.message
        }
    }
}

export default deletedeck