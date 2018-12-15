<template>
  <div class="postlist">
    <div class="topbar">
      <span>
        <a href="#">全部</a>
      </span>
      <span>
        <a href="#">精华</a>
      </span>
      <span>
        <a href="#">分享</a>
      </span>
      <span>
        <a href="#">问答</a>
      </span>
      <span>
        <a href="#">招聘</a>
      </span>
      <span>
        <a href="#">客户端测试</a>
      </span>
    </div>
    <ul>
      <li v-for="post in postlist">
        <img :src="post.author.avatar_url">
        <span class="reply">{{post.reply_count}}</span>/
        <span class="click">{{post.visit_count}}</span>
        <span
          :class="{good:post.good,top:post.top,tab:(post.good != true && post.top != true)}"
        >{{post | formateTab}}</span>
        <span class="title">
          <router-link
            :to="{name:'topic', params:{id:post.id,name:post.author.loginname}}"
          >{{post.title}}</router-link>
        </span>
        <span class="time">{{post.last_reply_at | formateDate}}</span>
      </li>
    </ul>
    <pagination @handleList="changePage"></pagination>
  </div>
</template>

<script>
import axios from "axios";
import pagination from "./Pagination.vue";
export default {
  name: "Postlist",
  data() {
    return {
      postlist: null,
      loading: false,
      page: 1
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.page,
            limit: 20
          }
        })
        .then(res => {
          this.postlist = res.data.data;
        })
        .then(err => {
          console.log(err);
        });
    },
    changePage(value){
      console.log("value", value)
      this.page = value;
      this.getData()
    }
  },
  components: {
    pagination
  }
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}
.postlist {
  width: 90%;
  border-radius: 3px;
  margin-left: auto;
  margin-right: auto;
}
.topbar {
  height: 40px;
  line-height: 40px;
  background-color: rgb(246, 246, 246);
}
.topbar a {
  color: #80bd01;
  font-size: 14px;
  margin-left: 15px;
  margin-right: 15px;
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
li .title:hover {
  text-decoration:underline;
}
ul .reply {
  margin-left: 5px;
  width: 30px;
  text-align: right;
  flex-shrink: 0;
}
ul .click {
  margin-right: 5px;
  width: 40px;
  text-align: left;
  font-size: 12px;
  color: #778087;
  flex-shrink: 0;
}
li .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  flex-shrink: 1;
  margin-left: 5px;
  margin-right: 60px;
}
li .time {
  flex-shrink: 0;
  font-size: 12px;
  color: #778087;
  text-align: right;
}
li .top,
li .good {
  flex-shrink: 0;
  font-size: 12px;
  background-color: #80bd01;
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
}
li .tab {
  flex-shrink: 0;
  font-size: 12px;
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
}
</style>

