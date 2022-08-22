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
        <div class="header">Sign In</div>
        <div class="from_class">
          <form class="w-50" autocomplete="off" ref="form1">
            <div class="mb-3">
              <label class="form-label">First Name</label>
              <input type="text" class="form-control" v-model="firstName" />
            </div>
            <div class="mb-3">
              <label class="form-label">Last Name</label>
              <input type="text" class="form-control" v-model="lastName" />
            </div>
            <div class="mb-3">
              <label class="form-label">User Name</label>
              <input type="text" class="form-control" v-model="userName" />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="text" class="form-control" v-model="email" />
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
              @click.prevent="signin"
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
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="reset"
            >
              Login
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
import { useToast } from "vue-toastification";

export default {
  components: {
    Loading,
  },
  setup() {
    // const router = useRouter()
    const toast = useToast();
    const isLoading = ref(false);
    const fullPage = true;
    const firstName = ref("");
    const lastName = ref("");
    const userName = ref("");
    const email = ref("");
    const password = ref("");

    const signin = async () => {
      const queryParams = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        userName: userName.value,
        password: password.value,
      };
      await axios
        .post("auth/register", queryParams)
        .then((res) => {
          toast.success(res.data.msg, {
            timeout: 2000,
          });
        })
        .catch((err) => {
          toast.error(err.response.data.msg, {
            timeout: 2000,
          });
        });
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
      firstName,
      lastName,
      email,
      signin,
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
  .btn {
    margin: 0 6px !important;
    &:nth-child(odd) {
      margin: 0 !important;
    }
  }
}
</style>
