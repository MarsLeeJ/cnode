<template>
  <div class="content" v-if="topic">
    <div class="article">
      <div class="article_head">
        <div class="article_title">
          <span class="symbol" v-if="topic.good||topic.top">{{topic|formateTab}}</span>
          <div class="title">{{topic.title}}</div>
        </div>
        <div class="info">
          <span class="time">发布于{{topic.create_at | formateDate}}</span>
          <span class="author">作者<router-link :to="{name: 'user', params: {name:topic.author.loginname}}">{{topic.author.loginname}}</router-link></span>
          <span class="times">{{topic.visit_count}}次浏览</span>
          <span class="category">来自{{topic|formateTab}}</span>
        </div>
      </div>
      <div class="article_content" v-html="topic.content"></div>
    </div>
    <div class="reply">
      <div class="replyhead">{{topic.replies.length}}回复</div>
      <ul class="reply_item">
        <li v-for="(reply, index) in topic.replies">
          <div class="info">
            <router-link :to="{name: 'user', params: {name:reply.author.loginname}}"><img :src="reply.author.avatar_url" alt></router-link>         
            <router-link :to="{name: 'user', params: {name:reply.author.loginname}}"><span class="name">{{reply.author.loginname}}</span></router-link>
            <a class="floor_time" href>{{index+1}}楼•{{reply.create_at|formateDate}}</a>
            <span class="author" :class="{active:topic.author.loginname===reply.author.loginname}">作者</span>
            <span class="iconfont icon-zan" v-if="reply.ups.length"> {{reply.ups.length}}</span>
          </div>
          <div class="replycontent" v-html="reply.content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Article",
  data() {
    return {
      topic: null
    };
  },
  methods: {
    getArticleData() {
      axios
        .get(`https://cnodejs.org/api/v1//topic/${this.$route.params.id}`)
        .then(res => {
          console.log(res.data.data);
          this.topic = res.data.data;
        })
        .then(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getArticleData();
  },
  watch: {
      '$route' (to, from){
          this.getArticleData()
      }
  }
};
</script>

<style>
@import url(//at.alicdn.com/t/font_961141_m3y4s26y4jj.css);
@import '../assets/markdown-github.css';
li {
  list-style: none;
}
.content {
  width: calc(75% - 10px);
}
.article {
  background-color: white;
  border-radius: 3px;
  border: 1px solid white;
}
.article_head {
  border-bottom: 1px solid rgb(136, 136, 136);
}
.article .article_title {
  margin-top: 10px;
  margin-bottom: 10px;
}
.article .symbol {
  font-size: 12px;
  background-color: #80bd01;
  color: white;
  border-radius: 3px;
  margin-right: 5px;
  margin-top: 5px;
  float: left;
  padding: 2px 4px;
}
.content .article .article_head {
  padding-left: 10px;
  padding-right: 10px;
}
.content .article .article_head .title {
  font-size: 22px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}
.content .article .article_head .info {
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.content .article .article_head .info span {
  color: rgb(136, 136, 136);
}
.content .article .article_head .info span::before {
  content: " • ";
}
.content .article .article_content {
  padding: 10px 15px;
}
.content .reply {
  margin-top: 10px;
  border-radius: 3px;
  background-color: white;
}
.content .reply .replyhead {
  padding: 10px;
  background-color: rgb(246, 246, 246);
}
.content .reply .reply_item li {
  padding: 10px;
  border-bottom: rgb(246, 246, 246);
}
.content .reply .reply_item li a img {
  width: 30px;
  height: 30px;
  float: left;
  border-radius: 3px;
}
.content .reply .reply_item li .name {
  margin-left: 10px;
  margin-right: 5px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
}
.content .reply .reply_item li a {
  text-decoration: none;
}
.content .reply .reply_item li .floor_time {
  font-size: 12px;
  color: blue;
}
.content .reply .reply_item li .iconfont {
  float: right;
}
.content .reply .reply_item li .replycontent {
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 5px;
  margin-bottom: 20px;
}
.content .reply .reply_item li .author {
  font-size: 12px;
  background-color: #80bd01;
  color: white;
  margin-left: 5px;
  padding: 2px;
  display: none;
}
.content .reply .reply_item li .author.active {
    display: inline-block;
}
</style>
