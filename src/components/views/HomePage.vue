<template>
  <div>
    Home page
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Project Id</th>
          <th scope="col">Project name</th>
          <th scope="col">Location</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody v-for="project in allProjects" :key="project.projectId">
        <tr>
          <th scope="row"><router-link :to="`/jobs/${project.projectId}`">{{ project.projectId }}</router-link></th>
          <th scope="row"><router-link :to="`/jobs/${project.projectId}`">{{ project.projectName }}</router-link></th>
          <td>{{ project.location }}</td>
          <td>{{ project.isDeleted }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- <div v-for="project in allProjects" :key="project.projectId">
      <router-link :to="`/jobs/${project.projectId}`">{{project}}</router-link>
  </div> -->
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const allProjects = ref(null);

    const getAllProjects = () => {
      axios.get("project").then((res) => {
        allProjects.value = res.data;
      });
    };

    onMounted(() => {
      getAllProjects();
    });
    return {
      allProjects,
      getAllProjects,
    };
  },
};
</script>

<style lang="scss" scope>
  th{
    a{
      text-decoration: none !important;
      color: black;
      font-weight: 400;
    }
  }
</style>
