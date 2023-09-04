const profile = {
    template: `<div>
    <div v-if="success">
    <h1> Username: {{profile.username}}</h1>
    <h2> Email: {{profile.email}}</h2>
    <h3>{{$route.params.id}}</h3>
    </div>
    <div v-else>
    {{error}}
    </div>
    </div> `,
    data(){
        return {
            profile: {
                username:'Abhisek',
                email:'12345@gmail.com',
            },

            success:true,
            error:'Something went wrong',
        }
    },
    async mounted(){
        const res = await fetch(`/api/users/${this.$route.params.id}`,{
            headers:{
               'Content-type': 'application/json',
               'Authentication-Token':localStorage.getItem('auth-token') 
            }
        })
        const data = await res.json()
        if(res.ok){
            this.profile = data
            print("pass")
        } else if(res.status == 401){
            this.success = false
            print("fail")
            this.error = data.response.error
        } else{
            this.success = false
            this.error = data.message
        }
    },
}

export default profile