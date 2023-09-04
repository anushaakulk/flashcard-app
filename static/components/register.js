const register = {
    template: `<div>
    <form action=''>
    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required v-model="formData.email">
      <br><br>
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required v-model="formData.password">
      <br><br>
      <label for="psw"><b>Re-enter Password</b></label>
      <input type="password" placeholder="Re-enter Password" name="psw" required v-model="formData.repassword">
      <br><br>
    </div>
    <button @click.prevent="registerUser"> Register </button>
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
            repassword:''
        },
        success: true,
        error: 'Something went wrong',
    }
},
methods:{
    async registerUser(){
        if(this.formData.password != this.formData.repassword){
            this.formData.password=''
            this.formData.repassword=''
            this.success = false
            this.error= "Re-enter the correct password"
        } else if (this.formData.password.length<7){
            this.formData.password=''
            this.formData.repassword=''
            this.success = false
            this.error="Password must contain more than 7 characters"
        } else {
            const res = await fetch(`/api/register/${this.formData.email}/${this.formData.password}`,{
                headers:{
                    'Content-Type':'application/json',
                },
            })
            const data = await res.json()
            if (res.ok){
                this.$router.push('/login')
            }else if(res.status==400){
                this.formData.email=''
                this.formData.password=''
                this.formData.repassword=''
                this.success = false
                this.error = data.message
            }
            else{
                this.success = false
                console.log("Something went wrong")
                console.log(data)
            }
        }
        console.log(this.formData)
    }
},
}

export default register