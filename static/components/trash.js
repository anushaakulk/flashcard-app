const trash = {
    template: `<div>
    <div v-if="success">
    Redirecting
    </div>
    <div v-else>
       {{error}}
    </div>
  </div>`,
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
 async mounted(){
    const res = await fetch(`/api/users/1`, {
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('auth-token'),
          //   'WyI4MzI1YThmNjc3NzE0MTdlYWNiOTQ1YmI3OTg2OTExNCJd.YhTcgg.hu9X8B-RDH_v_FXNscFiuie-IoM',
        },
      })
      const data = await res.json()
      console.log(data)
      if (res.ok) {
        this.profile = data
        var url= `/${this.$route.params.dname}`;
        window.location = url;
      } else if (res.status == 401) {
        this.success = false
        this.error = data.response.error
      } else {
        this.success = false
        this.error = data.message
      }
    },
}

export default trash