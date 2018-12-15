<template>
  <div class="userinfo" v-if="userInfo">
    <div class="userpage">
      <div class="header">主页/</div>
      <div class="usercontent">
        <div class="userpanel">
            <img :src="userInfo.avatar_url">
            <span class="name">{{userInfo.loginname}}</span>
        </div>
        <div class="score">{{userInfo.score}}积分</div>
        <div class="time">注册时间{{userInfo.create_at|formateDate}}</div>
      </div>
    </div>
    <div class="recent_replies">
      <div class="header">最近创建的话题</div>
      <ul>
        <li v-for="reply in userInfo.recent_replies">
          <img :src="reply.author.avatar_url">
          <span class="title"><router-link :to="{name:'topic', params:{id:reply.id}}">{{reply.title}}</router-link></span>
          <span class="time">{{reply.last_reply_at|formateDate}}</span>
        </li>
      </ul>
    </div>
    <div class="recent_topics">
      <div class="header">最近参与的话题</div>
      <ul>
        <li v-for="topic in userInfo.recent_topics">
          <img :src="topic.author.avatar_url">
          <span class="title"><router-link :to="{name:'topic', params:{id:topic.id}}">{{topic.title}}</router-link></span>
          <span class="time">{{topic.last_reply_at|formateDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userInfo: null
    };
  },
  methods: {
    getUserData() {
      axios
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          console.log(res.data.data);
          this.userInfo = res.data.data
        })
        .then(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getUserData();
  }
};
</script>

<style scoped>
a {
  color: rgb(0,136,204);
  text-decoration: none;
}
a:hover {
  color:rgb(0,85,128);
  text-decoration: underline;
}
.userinfo {
    width: 80%;
    margin: 0 auto;
    margin-top: 15px;
}
.userpage { 
    border-radius: 3px;
}
.userpage .header {
    background-color: rgb(246,246,246);
    padding: 10px;
}
.userpage .usercontent {
    padding: 10px;
    background-color: white;
}
.userpage .usercontent .userpanel {
    position: relative;
}
.userpage .usercontent .userpanel img{
    width: 40px;
    height: 40px;
    border-radius: 3px;
}
.userpage .usercontent .userpanel .name {
    position: absolute;
    margin: 5px 10px;
    font-size: 14px;
    color: rgb(159,159,159);
}
.userpage .usercontent .score {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 13px;
}
.userpage .usercontent .time {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    color: rgb(159,159,159);
}
.recent_replies {
    margin-top: 15px;
    border-radius: 3px;
}
.recent_replies .header {
    background-color: rgb(246,246,246);
    padding: 10px;
}
.recent_topics {
    margin-top: 15px;
    border-radius: 3px;
}
.recent_topics .header {
    background-color: rgb(246,246,246);
    padding: 10px;
}
li {
  list-style: none;
  border-bottom: 1px solid rgb(245, 245, 245);
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: white;
}
li img {
  width: 30px;
  height: 30px;
  border-radius: 3px;
}
li span {
  display: inline-block;
}
li .title {
  display: inline-block;
}
li .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  flex-shrink: 1;
  margin-left: 10px;
  margin-right: 60px;
}
li .time {
  flex-shrink: 0;
  font-size: 12px;
  color: #778087;
  text-align: right;
}
</style>

