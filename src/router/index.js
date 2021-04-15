import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Register from '@/components/Register.vue'
import SelectCourse from '@/components/SelectCourse.vue'
import SIdentify from '@/components/Identify.vue'
import Notice from '@/components/Notice.vue'
import Groups from '@/components/Groups.vue'
import ReadingTask from'@/components/ReadingTask.vue'
import StudyData from'@/components/StudyData.vue'
import AllCourse from '@/components/AllCourse.vue'
import Person from '@/components/Person.vue'
Vue.use(VueRouter)
Vue.use(SIdentify)
Vue.use(Person)


export default new VueRouter({
  routes:[
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/home',
      redirect:'/allcourse',
      component: Home,
      children:[
        {
          path:'/selectcourse',
          component:SelectCourse
        },
        {
          path:'/allcourse',
          component:AllCourse
        },
        {
          path:'/notice',
          component:Notice
        },
        {
          path:'/groups',
          component:Groups
        },
        {
          path:'/readingtask',
          component:ReadingTask
        },
        {
          path:'/studydata',
          component:StudyData
        },
        {
          path:'/person',
          component:Person
        },
      ]
    },
    {
      path:'/register',
      component: Register
    }
  ]
})