import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index.vue'
import edit from '../pages/edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
    },
    {
      path: '/edit',
      component: edit,
    }
  ]
})
