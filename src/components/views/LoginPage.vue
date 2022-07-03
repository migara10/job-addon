<template>
  <div class="vld-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
    <div class="main">
      <div class="content1">
        <div class="header">Login</div>
        <div class="from_class">
          <form class="w-50" autocomplete="off" ref="form1">
            <div class="mb-3">
              <label class="form-label">User Name</label>
              <input type="text" class="form-control" v-model="userName" />
            </div>
            <div class="mb-3">
              <label class="form-label"> Password </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="password"
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="login"
            >
              Submit
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="reset"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router'



export default {
  components: {
    Loading,
  },
  setup()  {
    const router = useRouter()
    const isLoading = ref(false);
    const fullPage = true;
    const userName = ref("migara123");
    const password = ref("abc");

    const login = () => {
      isLoading.value = true;
      const queryParams = {
        userName: userName.value,
        password: password.value,
      };
      axios
        .post("auth/login", queryParams)
        .then((res) => {
          isLoading.value = false;
          localStorage.setItem("token", res.data);
          router.push({name: "job"});
        })
        .catch(() => {
          isLoading.value = false;
        });
      /* setTimeout(() => {
        isLoading.value = false;
      }, 1000); */
      userName.value = "";
      password.value = "";
    };

    const reset = () => {
      axios.get("/user").then((res) => {
        console.log(res.data);
      });
    };
    return {
      isLoading,
      fullPage,
      userName,
      password,
      login,
      reset,
    };
  },
  /* methods: {
    login() {
      console.log(this.userName, this.password)
    }
  }, */
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  .content1 {
    .header {
      margin-top: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
    }
    .from_class {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
