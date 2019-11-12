<template>
  <div class="question-view">
    <h2>{{question.title}}</h2>

    <div>{{question.content}}</div>
    <ul v-for="answer in question.answers" :key="answer._id">
      <li>{{answer.content}}</li>
    </ul>
    <br />
    <form name="form" @submit="checkForm">
      <h2>Deine Antwort:</h2>
      <textarea :highlight="true" v-model="myAnswer" />
      <br />
      <input type="submit" class="btn btn-primary" value="Antworten" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import simplemde from "../components/MarkdownEditor.vue";

export default {
  name: "question-view",
  // components: {
  //   simplemde
  // },
  data: function() {
    return {
      myAnswer: "",
      question: {}
    };
  },
  mounted() {
    axios
      .get("http://localhost:9000/api/questions/" + this.$route.params.id)
      .then(res => {
        this.question = res.data;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
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

      axios.post(
        "http://localhost:9000/api/questions/" +
          this.$route.params.id +
          "/answers",
        {
          content: this.myAnswer
        }
      );

      //this.$router.push("/");
    }
  }
};
</script>

<style lang="stylus">
@import '~simplemde/dist/simplemde.min.css';

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
