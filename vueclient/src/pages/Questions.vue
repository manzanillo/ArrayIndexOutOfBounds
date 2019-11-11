<template>
  <main-layout>
    <p>Questions</p>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Question</th>
        </tr>
      </thead>
      <tbody v-if="questions.length != 0">
        <tr v-for="question in questions" v-bind:key="question._id">
          <td v-if="question && question.title">
            <a
              v-bind:href="'/questions/show/' + question._id"
              style="font-size: large"
            >{{question.title}}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";
import { apiPath } from "../api";
import axios from "axios";

export default {
  components: {
    MainLayout
  },
  data() {
    return {
      questions: []
    };
  },
  mounted() {
    axios.get(apiPath + "questions").then(response => {
      console.log(response.data);
      this.questions = response.data;
      return response;
    });
  }
};
</script>