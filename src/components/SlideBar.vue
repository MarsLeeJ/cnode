<template>
  <div class="slidebar" v-if="slideBarInfo">
    <div class="authorinfo">
      <div class="header">作者</div>
      <div class="authorbox">
        <router-link :to="{name: 'user', params: {name:slideBarInfo.loginname}}"><img :src="slideBarInfo.avatar_url" alt></router-link>
        <span class="name"><router-link :to="{name: 'user', params: {name:slideBarInfo.loginname}}">{{slideBarInfo.loginname}}</router-link></span>
      </div>
      <span class="score">积分:{{slideBarInfo.score}}</span>
    </div>
    <div class="recentreplies">
      <div class="header">作者其它话题</div>
      <ul>
        <li v-for="reply in replyLimit">
            <router-link :to="{name:'topic', params:{id:reply.id,name:reply.author.loginname}}">{{reply.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="recenttopics">
      <div class="header">作者最近回复</div>
      <ul>
        <li v-for="topic in topicLimit">
            <router-link :to="{name:'topic', params:{id:topic.id,name:topic.author.loginname}}">{{topic.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      slideBarInfo: null
    };
  },
  methods: {
    getSlideData() {
      axios
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          console.log(res.data.data);
          this.slideBarInfo = res.data.data;
        })
        .then(err => {
          console.log(err);
        });
    }
  },
  computed:{
      replyLimit(){
          if(this.slideBarInfo.recent_replies){
              return this.slideBarInfo.recent_replies.splice(0,5);
          }
      },
      topicLimit(){
          if(this.slideBarInfo.recent_topics){
              return this.slideBarInfo.recent_topics.splice(0,5);
          }
      }
  },
  created(){
      this.getSlideData()
  },
  watch: {
      '$route' (to, from){
          this.getSlideData()
      }
  }
};
</script>

<style scoped>
.slidebar {
  width: calc(25% - 10px);
  float: right;
}
.slidebar .authorinfo {
  background-color: white;
  border-radius: 3px;
}
.slidebar .authorinfo .header {
  padding: 10px;
  background-color: rgb(246, 246, 246);
  font-size: 14px;
}
.slidebar .authorinfo img {
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 3px;
}
.slidebar .authorinfo .authorbox {
  position: relative;
}
.slidebar .authorinfo .name {
  position: absolute;
  top: 22px;
  color: rgb(131, 131, 131);
}
.slidebar .authorinfo .score {
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 20px;
}
.slidebar .recentreplies,
.slidebar .recenttopics {
  margin-top: 10px;
  border-radius: 3px;
  background-color: white;
}
.slidebar .recentreplies .header,
.slidebar .recenttopics .header {
  padding: 10px;
  font-size: 14px;
  background-color: rgb(246, 246, 246);
}
.slidebar .recentreplies ul,
.slidebar .recenttopics ul {
  padding: 10px 10px 20px 10px;
}
.slidebar .recentreplies ul li,
.slidebar .recenttopics ul li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;
  margin-bottom: 10px;
}
a {
    font-size: 14px;
    color: rgb(131, 131, 131);
    text-decoration: none;
}
a:hover {
    cursor: pointer;
}
</style>
