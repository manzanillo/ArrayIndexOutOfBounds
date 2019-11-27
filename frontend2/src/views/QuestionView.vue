<template>
  <div class="question-view">
    <h2>
      {{question.title}}
      <span class="host">{{ " " }}({{ question.user }})</span>
    </h2>

    <div v-if="question.content" v-html="marked(question.content)"></div>
    <br />
    <h2>Antworten:</h2>
    <ul class="answer-list" v-for="answer in question.answers" :key="answer._id">
      <li v-if="answer.content">
        <div v-html="marked(answer.content)"></div>
        <div class="timestamp">
          <span class="host">
            <span v-if="answer.user && answer.user.length > 0">{{ answer.user }}</span>
            <span v-else>Anonym</span>,
          </span>
          vor {{answer.createdAt | formatTime}}
        </div>
      </li>
    </ul>
    <br />
    <form name="form" @submit="checkForm">
      <h2>Deine Antwort:</h2>
      <simplemde :highlight="true" v-model="myAnswer" />
      <br />
      <label for="user">Name</label>
      <input name="user" type="text" class="form-control" v-model="user" />

      <br />
      <br />
      <input type="submit" class="btn btn-primary" value="Antworten" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import simplemde from "../components/MarkdownEditor.vue";
import apiPath from "../util/api";
import { timeAgo } from "../util/filters";

export default {
  name: "question-view",
  components: {
    simplemde
  },
  data: function() {
    return {
      myAnswer: "",
      user: "Anonym",
      question: {}
    };
  },
  mounted() {
    axios
      .get(apiPath + this.$route.params.id)
      .then(res => {
        this.question = res.data;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  },
  filters: {
    formatTime: function(e) {
      return timeAgo(e);
    }
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];
      console.log(this.myAnswer);
      if (this.myAnswer.length === 0) {
        this.errors.push("Fill in answer.");
        return false;
      }

      e.preventDefault();

      axios
        .post(apiPath + this.$route.params.id + "/answers", {
          content: this.myAnswer,
          user: this.user
        })
        .then(res => {
          this.myAnswer = "";
          this.question = res.data;
        });

      //this.$router.push("/");
    }
  }
};
</script>

<style lang="stylus">
@import '~simplemde/dist/simplemde.min.css';

.answer-list {
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    background-color: #f2f3f5;
    padding-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  .timestamp {
    text-align: right;
    padding-right: 10px;
  }
}

.question-view {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em;
  margin-top: 45px;

  h1 {
    margin: 0;
    font-size: 1.5em;
  }

  .meta {
    list-style-type: none;
    padding: 0;
  }

  .label {
    display: inline-block;
    min-width: 4em;
  }

  .about {
    margin: 1em 0;
  }

  .links a {
    text-decoration: underline;
  }

  .form-control {
    width: 100%;
    font-size: 1.3em;
  }

  .a.fa.fa-columns.no-disable.no-mobile, a.fa.fa-arrows-alt.no-disable.no-mobile {
    display: none;
  }
}
</style>
