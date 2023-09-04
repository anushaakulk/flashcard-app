new Vue({
    el: '#app',
    data:{
        message:''
    },
    methods : {
        send_message : function(){
            let data = {
                'text' : this.message
            }
            fetch('https://chat.googleapis.com/v1/spaces/AAAA93ZtNiA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=LuB-DKOUn-bzWGkVkG6FjRw9sIxaLQxHsLcPfEeHvgI%3D',{
                method : 'POST',
                body : JSON.stringify(data)
            }).then(r => r.json()
            ).then(d => console.log(d)
            ).catch(e => console.log("Some error occured:",e))
        }
    }
})