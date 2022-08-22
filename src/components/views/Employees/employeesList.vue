<template>
  <div>
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
    />
    <div class="main m-3">
      <div class="row">
        <div class="d-flex">
          <button
            :class="isActive ? 'active_btn' : 'inactive_btn'"
            @click="activateState()"
          >
            Activate
          </button>
          <button
            :class="!isActive ? 'active_btn' : 'inactive_btn'"
            @click="inActivateState()"
          >
            Inactivate
          </button>
        </div>
      </div>

      <div>
        <side-bar ref="childComponent" @loading="afterSave" />
      </div>

      <div class="row">
        <div class="d-flex justify-content-between">
          <input
            type="text"
            style="width: 60%"
            v-model="searchVal"
            v-debounce:300ms="getAllEmployees"
            autocomplete="false"
            @click="clickSearch"
          />
          <button class="btn btn-primary" @click="childComponent.show()">
            Add New
          </button>
        </div>
      </div>
      <div
        class="emp_row d-flex justify-content-between m-1 mb-2"
        v-for="emp in allEmployees"
        :key="emp"
      >
        <div>{{ emp.firstName }}</div>
        <button
          class="btn"
          :class="isActive ? 'btn-danger' : 'btn-success'"
          @click="isActive?deleteUser(emp):addUser(emp)"
        >
          {{ isActive ? "InActivate" : "Activate" }}
        </button>
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li
            class="page-item"
            v-for="pageNumber in pageCount"
            :key="pageNumber"
          >
            <a
              class="page-link pill-btn pill-btn1"
              :class="`tab_btn${pageNumber}`"
              @click="setPageNumber(pageNumber)"
              >{{ pageNumber }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import { ref, onMounted } from "vue";
import axios from "axios";
import { vue3Debounce } from "vue-debounce";
import sideBar from "./sideBar.vue";

export default {
  directives: {
    debounce: vue3Debounce({ lock: true }),
  },
  components: {
    sideBar,
    Loading,
  },
  setup() {
    const isLoading = ref(false);

    const name = "doiya";
    const childComponent = ref(null);
    const allEmployees = ref(null);
    const searchVal = ref(null);
    const pageNum = ref(null);
    const pageCount = ref(0);
    const pageSize = ref(10);

    const message = ref(null);
    const debounce = ref(null);

    const isActive = ref(true);

    const show = () => {
      childComponent.value.show();
    };
    const hide = () => {
      childComponent.value.hide();
    };

    const getAllEmployees = () => {
      isLoading.value = true;
      hide();
      const data = {
        pageSize: pageSize.value,
        pageNumber: pageNum.value ? pageNum.value : 1,
        search: searchVal.value,
        active: isActive.value,
      };
      axios.get("user", { params: data }).then((res) => {
        isLoading.value = false;
        allEmployees.value = res.data.user;
        pageCount.value = Math.ceil(res.data.count / pageSize.value);
        /* if((res.data.count % 10) === 0) {
          pageCount.value = (Math.ceil(res.data.count / pageSize.value)-1);
        }
        else{
          pageCount.value = Math.ceil(res.data.count / pageSize.value);
        } */
        // console.log(allEmployees.value.length)
      });
    };

    const setPageNumber = async (num) => {
      isLoading.value = true;
      pageNum.value = num;
      getAllEmployees();

      const tab = document.getElementsByClassName(`tab_btn${num}`);
      tab[0].classList.add("tab_btn");

      for (let i = 1; i <= pageCount.value; i++) {
        if (i != num) {
          const tab = document.getElementsByClassName(`tab_btn${i}`);
          tab[0].classList.remove("tab_btn");
        }
      }
    };

    const clickSearch = () => {
      pageNum.value = 1;
    };

    const afterSave = () => {
      isLoading.value = true;
      getAllEmployees();
    };

    const activateState = () => {
      isActive.value = true;
      setPageNumber(1)
    };
    const inActivateState = () => {
      isActive.value = false;
      setPageNumber(1)
    };

    const deleteUser = user => {
      if(allEmployees.value.length == 1){
        setPageNumber(pageNum.value - 1)
      }
      axios
        .delete(`user/delete/${user._id}`)
        .then(() => {
          getAllEmployees()
        })
        .catch((errs) => {
          console.log(errs);
        });
    };
    const addUser = user => {
      if(allEmployees.value.length == 1){
        setPageNumber(pageNum.value - 1)
      }
      axios
        .delete(`user/add/${user._id}`)
        .then(() => {
          getAllEmployees()
        })
        .catch((errs) => {
          console.log(errs);
        });
    };

    /* watch([isActive], () => {
      pageNum.value = 1;
      getAllEmployees();
    }); */

    onMounted(() => {
      getAllEmployees();
      // childComponent.value.show();
    });
    return {
      isLoading,
      childComponent,
      allEmployees,
      getAllEmployees,
      clickSearch,
      searchVal,
      pageNum,
      pageCount,
      pageSize,
      message,
      debounce,
      setPageNumber,
      name,
      show,
      hide,
      afterSave,
      isActive,
      activateState,
      inActivateState,
      deleteUser,
      addUser,
    };
  },
};
</script>

<style scoped>
.pagin_btn {
  background: red !important;
}
.pill-btn {
  border: 1px solid #218af8 !important;
  background-color: #ffffff !important;
  white-space: nowrap;
  width: auto;
  color: #218af8 !important;
  padding: 5px 12px !important;
  margin: 10px 5px;
  font-size: 14px;
  font-weight: 400;
}
.tab_btn {
  border: 1px solid #218af8 !important;
  background-color: #218af8 !important;
  color: #ffffff !important;
}
.active_btn {
  background: none !important;
  outline: none;
  color: red;
  border: 0;
}
.active_btn {
  background: none !important;
  outline: none;
  color: #0d6efd;
  border: 0;
}
.inactive_btn {
  background: none !important;
  outline: none;
  color: #0d0d0e;
  border: 0;
}
</style>
