<template>
  <li class="news-item">
    <span class="score">{{ item.votes }}</span>
    <span class="title">
      <template v-if="item.title">
        <a :href="'question/' + item._id" target="_blank" rel="noopener">{{ item.title }}</a>
        <span class="host">({{ item.user }})</span>
      </template>
      <template v-else>
        <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
      </template>
    </span>
    <br />
    <span class="meta">
      <span class="time">{{ item.createdAt | timeAgo }} ago</span>
      <span v-if="item.type !== 'job'" class="comments-link">
        |
        {{ item.answers.length }} comments
      </span>
    </span>
    <span class="label" v-if="item.type !== 'story'">{{ item.type }}</span>
    <span class="star">
      <i class="material-icons">star_border</i>
      <!--<i class="material-icons">star</i>-->
    </span>
  </li>
</template>

<script>
import { timeAgo } from "../util/filters";

export default {
  name: "news-item",
  props: ["item"],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time } }) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`;
  }
};
</script>

<style lang="stylus">
.news-item {
  background-color: #fff;
  padding: 20px 70px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;

  .score {
    color: #ff6600;
    font-size: 1.1em;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 0;
    width: 80px;
    text-align: center;
    margin-top: -10px;
  }

  .star {
    color: #ff6600;
    font-size: 1.1em;
    font-weight: 700;
    position: absolute;
    top: 50%;
    right: 0;
    width: 80px;
    text-align: center;
    margin-top: -10px;
  }

  .meta, .host {
    font-size: 0.85em;
    color: #828282;

    a {
      color: #828282;
      text-decoration: underline;

      &:hover {
        color: #ff6600;
      }
    }
  }
}
</style>
