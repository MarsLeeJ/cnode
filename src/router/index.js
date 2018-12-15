import Vue from 'vue'
import Router from 'vue-router'
import Postlist from '../components/Postlist.vue'
import Article from '../components/Article.vue'
import Userinfo from '../components/Userinfo.vue'
import SlideBar from '../components/SlideBar.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      name: 'root',
      path: '/',
      components: {
        main: Postlist,
      }
    },{
      name: 'topic',
      path: '/topic/:id&author=:name',
      components: {
        main: Article,
        aside: SlideBar
      }
    },{
      name: 'user',
      path:'/user/:name',
      components: {
        main: Userinfo
      }
    }
  ]
})
