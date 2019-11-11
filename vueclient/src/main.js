import Vue from "vue"
//import App from "./App.vue"
import routes from "./routes"
import Page404 from "./pages/404.vue"
Vue.config.productionTip = false

const app = new Vue({
    el: "#app",
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent() {
            const matchingView = routes[this.currentRoute]
            return matchingView ? matchingView : Page404
        }
    },
    render(h) {
        return h(this.ViewComponent)
    }
})

window.addEventListener("popstate", () => {
    app.currentRoute = window.location.pathname
})
