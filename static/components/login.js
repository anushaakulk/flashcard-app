const login = {
    template: `<div>
    <form action=''>
    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required v-model="formData.email">
      <br><br>
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required v-model="formData.password">
      <br><br>
    </div>
    <button @click.prevent="loginUser"> Login </button>
  </form>
  <div v-if="success">
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
            email:'',
            password:'',
        },
        success: true,
        error: 'Something went wrong',
    }
},
methods:{
    async loginUser(){
        console.log(this.formData)
        const res = await fetch('/login?include_auth_token',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(this.formData),
        })
        if (res.ok){
            const data =  await res.json()
            console.log(data.response.user.authentication_token)
            localStorage.setItem('auth-token',data.response.user.authentication_token)
            var url= "/database";
            window.location = url;
        }else if (res.status == 400) {
            this.success = false
            this.error = 'Enter correct credentials'
          }
        else{
            console.log("Something went wrong")
        }
    }
}
}

export default login