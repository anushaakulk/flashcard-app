Vue.component('message-board', {
  props:['title'],
  template: `
  <div>
  <h4> {{title}} </h4>
      Your name: <input type="text" v-model="vistor_name" />
      Your message: <input type="text" v-model="visitor_message" />

      <button v-on:click="sayHi" >Say Hi</button>

      <ul>
          <li v-for="message in messages"> {{message['visitor_name']}} : {{message['visitor_message']}} </li>
      </ul>
  </div>
  `,
  data: function(){
    return{
     vistor_name: "",
     visitor_message: "",
     messages: []
    }
  },
  methods: {
    sayHi: function () {
      this.messages.push({ 
        "visitor_name" : this.vistor_name, 
        "visitor_message" : this.visitor_message
      });
      this.vistor_name = "";
      this.visitor_message = "";
      this.$emit("add-to-global-total");
    }
  },
  computed : {
      count: function(){
          return this.messages.length;
      }
  }
})
var app = new Vue({
    el: '#app',
    data: {
      global_count:0,
    },
    methods: {
      count_global:  function(){
        this.global_count=this.global_count+1;
      }
    },
})
  