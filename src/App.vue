<template>
  <div>
    <!-- <nav v-if="!$route.meta.hideNavbar">
      Migara tennakoon
    </nav> -->
    <div class="row p-0 m-0">
      <div class="col-4 col-md-3 col-lg-2 p-0 m-0">
        <nav v-if="!$route.meta.hideNavbar" class="nav flex-column">
          <!--  <a class="nav-link active" @click="logOut()">Log Out</a> -->
          <router-link to="/jobs" class="nav-link">Home</router-link>
          <router-link to="/employee" class="nav-link">Employees</router-link>
          <a class="nav-link disabled" href="#">Disabled</a>
        </nav>
      </div>
      <div class="col-8 col-md-9 col-lg-10 p-0 m-0">
        <div class="row nav_bar p-0 m-0">
          <div class="d-flex justify-content-between align-items-center">
            <div class="router_name">{{ $route.name }}</div>
            <div class="btn-group">
              <button
                class="dropdown-toggle _btn"
                data-bs-toggle="dropdown"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ loggedUser }}
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" @click="logOut()">LogOut</a>
              </div>
            </div>
          </div>
        </div>
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import servicess from "./services/services";
import { useRouter } from "vue-router";
import jwt_decode from "jwt-decode";
import { ref, onBeforeMount } from "vue";

export default {
  name: "App",
  components: {},
  setup() {
    const router = useRouter();
    const loggedUser = ref("");

    const logOut = () => {
      servicess.logOut();
      router.replace("/login").then(() => {});
      loggedUser.value = "";
    };

    const getUserDetails = () => {
      var token = localStorage.getItem("token");
      var decoded = jwt_decode(token);
      // let user = decoded.user
      loggedUser.value = Object.values(decoded.user)[1];

      /* Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter((key) => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    const data = Object.filter(user, (data) => data.firstName);
    console.log(data); */
      // return token ? user : null;
    };

    onBeforeMount(() => {
      // getUserDetails();
    });
    return {
      logOut,
      servicess,
      getUserDetails,
      loggedUser,
    };
  },
};
</script>

<style scoped>
._btn {
  background: none;
  outline: none;
  border: 0;
}
.nav_bar {
  background: rgb(173, 173, 247);
  height: 70px;
}
.router_name {
  text-transform: capitalize;
}
</style>
