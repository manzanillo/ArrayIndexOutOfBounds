<template>
  <div class="create-question-view">
    <form name="form" @submit="checkForm">
      <h2>Titel:</h2>
      <input type="text" class="form-control" v-model="title" />
      <br />
      <h2>Frage:</h2>
      <textarea rows="10" cols="80" v-model="content"></textarea>
      <br />
      <input type="submit" class="btn btn-primary" value="Frage stellen" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "user-view",

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
  },

  asyncData({
    store,
    route: {
      params: { id }
    }
  }) {
    return store.dispatch("FETCH_USER", { id });
  }
};
</script>

<style lang="stylus">
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
}
</style>
