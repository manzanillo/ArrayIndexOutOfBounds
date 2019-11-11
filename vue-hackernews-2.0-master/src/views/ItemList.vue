<template>
  <div class="news-view">
    <div class="btn-row">
      <router-link class="btn" to="/ask" tag="button">Ask Question</router-link>
    </div>
    <transition :name="transition">
      <div class="news-list">
        <transition-group tag="ul" name="item">
          <item v-for="item in questions" :key="item._id" :item="item"></item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import { watchList } from "../api";
import Item from "../components/Item.vue";
import axios from "axios";

export default {
  name: "item-list",

  components: {
    Item
  },

  props: {
    type: String
  },

  data() {
    return {
      transition: "slide-right",
      questions: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:9000/api/questions")
      .then(result => (this.questions = result.data));
  }
};
</script>

<style lang="stylus">
.btn-row {
  text-align: center;
  margin-top: 30px;
}

.btn {
  -webkit-border-radius: 5;
  -moz-border-radius: 5;
  border-radius: 5px;
  color: #ffffff;
  background: #f60;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857;
  border-radius: 4px;
}

.btn:hover {
  background: #db5800;
  text-decoration: none;
}

.news-view {
  padding-top: 45px;
}

.news-list-nav, .news-list {
  background-color: #fff;
  border-radius: 2px;
}

.news-list-nav {
  padding: 15px 30px;
  position: fixed;
  text-align: center;
  top: 55px;
  left: 0;
  right: 0;
  z-index: 998;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  a {
    margin: 0 1em;
  }

  .disabled {
    color: #ccc;
  }
}

.news-list {
  position: absolute;
  margin: 30px 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}

.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}

.item-move, .item-enter-active, .item-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}

.item-leave-active {
  position: absolute;
  opacity: 0;
  transform: translate(30px, 0);
}

@media (max-width: 600px) {
  .news-list {
    margin: 10px 0;
  }
}
</style>
