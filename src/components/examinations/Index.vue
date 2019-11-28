<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <FormSearch :title="title" @listenSearch="search"></FormSearch>
    <div class="x_panel">
      <div class="x_title">
        <h2>
          List
          <small>Examinations</small>
        </h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <a class="collapse-link" href="/management/examinations/create">
              <button type="submit" class="btn btn-success">Create new Examination</button>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <SortedTable :values="examinations.data">
          <thead>
            <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="id">ID</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="code">Code</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="title">Title</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="type">Type</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="description">Description</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="status">Status</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="created_at">Created at</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Action</th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(examination, index) in sort.values" :key="examination.id">
              <td>{{examination.id}}</td>
              <td>{{examination.code}}</td>
              <td>{{examination.title}}</td>
              <td>{{examination.examination_type.name}}</td>
              <td>{{examination.description}}</td>
              <td>{{ getStatus(examination.status) }}</td>
              <td>{{examination.created_at}}</td>
              <td>
                <a
                  :href="'/management/examinations/detail/' + examination.code"
                  class="btn btn-primary btn-xs"
                >
                  <i class="fa fa-folder"></i> View
                </a>
                <a
                  :href="'/management/examinations/edit/' + examination.code"
                  class="btn btn-info btn-xs"
                >
                  <i class="fa fa-pencil"></i> Edit
                </a>
                <a
                  href="#"
                  class="btn btn-success btn-xs"
                  @click="confirmPublish(examination)"
                  v-if="examination.status == 0"
                >
                  <i class="fa fa-arrow-circle-up"></i> Publish
                </a>
                <a
                  href="#"
                  class="btn btn-warning btn-xs"
                  @click="confirmPublish(examination)"
                  v-if="examination.status == 1"
                >
                  <i class="fa fa-arrow-circle-up"></i> UnActive
                </a>
                <a @click="confirmDelete(examination)" class="btn btn-danger btn-xs">
                  <i class="fa fa-trash-o"></i> Delete
                </a>
              </td>
            </tr>
          </tbody>
        </SortedTable>
        <paginate
          :page-count="pageCount"
          :click-handler="getExaminations"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        ></paginate>
      </div>
    </div>
    <ConfirmDelete
      v-if="modal.deleteConfirm==true"
      @onClose="closeConfirmModal('delete')"
      @accept="deleteExam"
    ></ConfirmDelete>
    <ModalConfirm
      v-if="modal.publishConfirm==true"
      @onClose="closeConfirmModal('publish')"
      @accept="updateStatus"
    ></ModalConfirm>
  </div>
</template>

<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
import ConfirmDelete from "@/components/elements/ConfirmDelete";
import ModalConfirm from "@/components/elements/ModalConfirm";
import FormSearch from "@/components/elements/FormSearch";
export default {
  name: "ListExaminations",
  components: {
    Breadcrumb,
    ConfirmDelete,
    ModalConfirm,
    FormSearch
  },
  data() {
    return {
      examinations: {
        data: [],
        last_page: 0
      },
      breads: [
        {
          title: "Dashboard",
          link: "/dashboard"
        },
        {
          title: "Examinations management",
          link: "/"
        },
        {
          title: "List examinations",
          link: "/"
        }
      ],
      status: {
        0: "SPENDING",
        1: "ACTIVE"
      },
      modal: {
        deleteConfirm: false,
        publishConfirm: false
      },
      examinationSelected: {},
      keyword: "",
      title: "Management Examinations"
    };
  },
  created() {
    this.getExaminations();
  },
  methods: {
    getStatus(status) {
      return status == 1 ? "ACTIVE" : "SPENDING";
    },
    confirmPublish(examination) {
      this.examinationSelected = examination;
      this.modal.publishConfirm = true;
    },
    confirmDelete(examination) {
      this.examinationSelected = examination;
      this.modal.deleteConfirm = true;
    },
    updateStatus() {
      let examination = this.examinationSelected;
      if (examination.status == 0) {
        status = 1;
      } else {
        status = 0;
      }
      this.update(status, examination);
    },
    update(status, examination) {
      let data = {
        status: status
      };
      request({
        url: "backend/examinations/publish/" + examination.code,
        method: "post",
        data
      })
        .then(res => {
          console.log(res);
          let data = res.data.result_data;
          this.closeConfirmModal("publish");

          if (data.updated == true) {
            if (data.status == 1) {
              this.successAlert("Examination has been actived!");
            } else {
              this.successAlert("Examination has been unactived!");
            }
            examination.status = data.status;
          }
        })
        .catch(err => {
          console.log(err.res);
          this.errorAlert();
        });
    },
    getExaminations(page = 1) {
      request({
        url:
          "/backend/examinations/list?page=" +
          page +
          "&keyword=" +
          this.keyword,
        method: "get"
      })
        .then(res => {
          this.examinations = res.data.result_data;
        })
        .catch(err => {
          console.log(err.res);
        });
    },
    closeConfirmModal(type) {
      if (type == "delete") {
        this.modal.deleteConfirm = false;
      }
      if (type == "publish") {
        this.modal.publishConfirm = false;
      }
    },
    deleteExam() {
      let data = {
        code: this.examinationSelected.code
      };
      request({
        url: "/backend/examinations/delete",
        method: "post",
        data
      })
        .then(res => {
          if (res.data.result_data.deleted_at) {
            this.getExaminations();
            this.closeConfirmModal("delete");
            this.successAlert("Delete success!");
          }
        })
        .catch(err => {
          this.closeConfirmModal("delete");
          this.errorAlert("Delete exam failed!");
        });
    },
    successAlert(message) {
      this.$swal.fire({
        position: "top",
        type: "success",
        title: message,
        width: 600,
        padding: "3em"
      });
    },
    errorAlert(message) {
      this.$swal.fire({
        position: "top",
        type: "error",
        title: message,
        width: 600,
        padding: "3em"
      });
    },
    search(keyword) {
      this.keyword = keyword;
      this.getExaminations();
    }
  },
  computed: {
    pageCount() {
      return this.examinations.last_page;
    }
  }
};
</script>