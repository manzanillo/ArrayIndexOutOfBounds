<template>
  <div class="create-question-view">
    <form name="form" @submit="checkForm">
      <h2>Titel:</h2>
      <input type="text" class="form-control" v-model="title" />
      <br />
      <h2>Frage:</h2>
      <simplemde :highlight="true" v-model="content" />
      <br />
      <input type="submit" class="btn btn-primary" value="Frage stellen" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import simplemde from "../components/MarkdownEditor.vue";

export default {
  name: "user-view",
  components: {
    simplemde
  },
  computed: {
    user() {
      return this.$store.state.users[this.$route.params.id];
    }
  },
  data: function() {
    return {
      title: "",
      content: "",
      errors: []
    };
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];
      console.log(this.title);
      if (this.title.length === 0 || this.content.length === 0) {
        this.errors.push("Name required.");
        return false;
      }

      e.preventDefault();

      axios.post("http://localhost:9000/api/questions", {
        user: "user",
        title: this.title,
        content: this.content,
        class: "Klasse"
      });

      this.$router.push("/");
    }
  }
};
</script>

<style lang="stylus">
@import '~simplemde/dist/simplemde.min.css';
@import '~highlight.js/styles/atom-one-dark.css';

.create-question-view {
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
