import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router';

var marked = require('marked');

Vue.mixin({
    methods: {
        marked(input) {
            return marked(input);
        }
    }
});

const router = createRouter();


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
