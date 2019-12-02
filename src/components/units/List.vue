<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_content">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/">Examinations management</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/">List examinations</a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="page-title">
      <div class="title_left">
        <h3>Welcome to Your Website!</h3>
      </div>
      <div class="title_right">
        <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
          <div class="input-group">
            <input type="text" placeholder="Search for..." class="form-control" />
            <span class="input-group-btn">
              <button type="button" class="btn btn-default">Go!</button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="x_panel">
      <div class="x_title">
        <h2>
          List
          <small>Unit</small>
        </h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <button type="button" class="btn btn-success" @click="modalOpen=true">Create new Units</button>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <SortedTable :values="units.data">
          <thead>
            <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="id">ID</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="name">Name</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="created_at">Created at</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Action</th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(unit, index) in sort.values" :key="unit.id">
              <td>{{unit.id}}</td>
              <td>{{unit.name}}</td>
              <td>{{unit.created_at}}</td>
              <td>
                <a class="btn btn-info btn-xs" @click="showModal(unit)">
                  <i class="fa fa-pencil"></i> Edit
                </a>
                <a class="btn btn-danger btn-xs" @click="deleteUnit(unit)">
                  <i class="fa fa-trash-o"></i> Delete
                </a>
              </td>
            </tr>
          </tbody>
        </SortedTable>
        <paginate
          :page-count="pageCount"
          :click-handler="getUnits"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        ></paginate>
      </div>
    </div>
    <ModalForm @onClose="modalOpen=false" v-if="modalOpen==true" :item="unitSelected"></ModalForm>
  </div>
</template>

<script>
import request from "@/utils/request";
import {
  successAlert,
  errorAlert,
  deleteFailed,
  deleteSuccess
} from "@/utils/alert";
import Breadcrumb from "@/components/elements/Breadcrumb";
import ModalForm from "@/components/units/ModalForm";
export default {
  name: "ListUnit",
  components: {
    Breadcrumb,
    ModalForm
  },
  data() {
    return {
      units: {
        data: [],
        last_page: 0
      },
      modalOpen: false,
      unitSelected: {}
    };
  },
  created() {
    this.getUnits();
  },
  computed: {
    pageCount() {
      return this.units.last_page;
    }
  },
  methods: {
    deleteUnit(unit) {
      console.log(unit);
      this.unitSelected = unit;
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to delete this!",
          type: "warning",
          showCancelButton: true,
          customClass: "swal-wide",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.detele(unit);
          }
        });
    },
    detele(unit) {
      let data = {
        id: unit.id
      };
      request({
        url: "/backend/units/delete",
        method: "post",
        data
      })
        .then(res => {
          this.getUnits();
          deleteSuccess();
        })
        .catch(err => {
          deleteFailed();
        });
    },
    getUnits(page = 1) {
      request({
        url: "/backend/units/list?page=" + page,
        method: "get"
      })
        .then(res => {
          this.units = res.data.result_data;
        })
        .catch();
    },
    showModal(unit) {
      this.modalOpen = true;
      if (unit) {
        this.unitSelected = unit;
      }
    }
  }
};
</script>

<style scoped>
.swal-wide {
  width: 850px !important;
}
</style>