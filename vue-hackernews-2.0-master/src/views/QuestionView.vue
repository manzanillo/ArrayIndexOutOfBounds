<template>
  <div class="question-view">
    <h2>{{question.title}}</h2>

    <div>{{question.content}}</div>
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
