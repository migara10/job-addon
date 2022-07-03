<template>
  <div>
    user job list
    <div v-for="job in getAllJobData" :key="job">
      {{job.jobName}}
    </div>
    <router-link :to="`/jobs/${4}`" >go</router-link>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const getAllJobData = ref(null);

    const getAllJobs = () => {
      axios.get(`job?id=${route.params.jobId}`).then((res) => {
        getAllJobData.value = res.data;
      });
    };

    onMounted(() => {
      getAllJobs();
    });
    return {
      getAllJobData,
      getAllJobs,
    };
  },
};
</script>
