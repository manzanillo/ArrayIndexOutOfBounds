<template>
    <li class="news-item">
        <span class="score">{{ question.votes }}</span>
        <span class="title">
            <template v-if="question.title">
                <router-link :to="'/question/' + question._id">{{
                    question.title
                }}</router-link>
                <span class="host">{{ " " }}({{ question.user }})</span>
            </template>
        </span>
        <br />
        <span class="meta">
            <span class="time">vor {{ question.createdAt | formatTime }}</span>
            <span v-if="question.type !== 'job'" class="comments-link">
                |
                <span v-if="question.answers.length === 0">keine Antwort</span>
                <span v-if="question.answers.length === 1">1 Antwort</span>
                <span v-if="question.answers.length > 1"
                    >{{ question.answers.length }} Antworten</span
                >
            </span>
        </span>
        <span class="label" v-if="question.type !== 'story'">{{
            question.type
        }}</span>
        <span class="star">
            <button class="vote-btn" @click="upvote">
                <i class="material-icons">thumb_up_alt</i>
            </button>
            <button class="vote-btn" @click="downvote">
                <i class="material-icons">thumb_down_alt</i>
            </button>
        </span>
    </li>
</template>

<script>
import { timeAgo, sort } from "../util/filters"
import axios from "axios"
import apiPath from "../util/api"

export default {
    name: "news-item",
    props: ["item"],
    data: function() {
        return {
            question: this.item
        }
    },
    // http://ssr.vuejs.org/en/caching.html#component-level-caching
    serverCacheKey: ({ item: { id, __lastUpdated, time } }) => {
        return `${id}::${__lastUpdated}::${timeAgo(time)}`
    },
    filters: {
        formatTime: function(e) {
            return timeAgo(e)
        }
    },
    methods: {
        upvote: function(e) {
            axios
                .put(apiPath + this.item._id + "/upvote")
                .then(res => (this.question = res.data))
        },
        downvote: function(e) {
            axios
                .delete(apiPath + this.item._id + "/downvote")
                .then(res => (this.question = res.data))
        }
    }
}
</script>

<style lang="stylus">
.vote-btn {
  all: unset;
}

.vote-btn:hover {
  cursor: pointer;
}

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
