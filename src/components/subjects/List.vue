<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <Breadcrumb :breads="breads"></Breadcrumb>
    <FormSearch :title="title" @listenSearch="search"></FormSearch>
    <div class="x_panel">
      <div class="x_title">
        <h2>
          List
          <small>Learning Words</small>
        </h2>
        <ul class="nav navbar-right panel_toolbox">
          <li>
            <a @click="modalOpen=true" class="collapse-link">
              <button type="button" class="btn btn-success">Create new Subjects</button>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <SortedTable :values="subjects.data">
          <thead>
            <tr>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="id">ID</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="name">Subject</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Image</th>
              <th scope="col" style="text-align: left; width: 10rem;">
                <SortLink name="created_at">Created at</SortLink>
              </th>
              <th scope="col" style="text-align: left; width: 10rem;">Action</th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="sort">
            <tr v-for="(subject, index) in sort.values" :key="subject.id">
              <td>{{subject.id}}</td>
              <td>{{subject.name}}</td>
              <td v-if="subject.image"><img :src="serverUri + subject.image" width="50px" height=50px></td>
              <td v-else>EMPTY</td>
              <td>{{subject.created_at}}</td>
              <td>
                <a class="btn btn-info btn-xs"  @click="edit(subject)">
                  <i class="fa fa-pencil"></i> Edit
                </a>
                <a @click="confirmDelete(subject.id)" class="btn btn-danger btn-xs">
                  <i class="fa fa-trash-o"></i> Delete
                </a>
              </td>
            </tr>
          </tbody>
        </SortedTable>
        <paginate
          :page-count="pageCount"
          :click-handler="getSubjects"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        ></paginate>
      </div>
    </div>
    <ModalForm @onClose="closeModal()" v-if="modalOpen==true" :item="itemModal"></ModalForm>
  </div>
</template>
<script>
import request from "@/utils/request";
import Breadcrumb from "@/components/elements/Breadcrumb";
import ModalForm from "@/components/subjects/ModalForm";
import FormSearch from "@/components/elements/FormSearch";
export default {
  components: {
    Breadcrumb,
    ModalForm,
    FormSearch
  },
  data() {
    return {
      subjects: {
        data: [],
        last_page: 0
      },
      breads: [
        {
          title: "Dashboard",
          link: "/dashboard"
        },
        {
          title: "Words management",
          link: "/"
        },
        {
          title: "List subjects",
          link: "/"
        }
      ],
      title: "",
      keyword: "",
      modalOpen: false,
      selectedSubject: 0,
      itemModal: {},
      serverUri: process.env.VUE_APP_BASE_SERVER_URL
    };
  },
  created() {
    this.getSubjects();
  },
  computed: {
    pageCount() {
      return this.subjects.last_page;
    }
  },
  methods: {
    getSubjects(page) {
      request({
        url: "/backend/subjects/list?page=" + page + "&keyword=" + this.keyword,
        methods: "get"
      })
        .then(res => {
          this.subjects = res.data.result_data;
        })
        .catch(err => {
          console.log(err.res);
        });
    },
    edit(subject){
      this.itemModal = subject
      this.modalOpen = true
    },
    closeModal(){
      this.modalOpen=false
      this.itemModal = false
    },
    search(keyword) {
      this.keyword = keyword;
      this.getSubjects();
    },
    confirmDelete(subjectId) {
      this.selectedSubject = subjectId;
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to delete this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.deleteSubject();
            this.getSubjects();
          }
        });
    },
    deleteSubject() {
      let data = {
        id: this.selectedSubject
      };
      request({
        url: "/backend/subjects/delete",
        method: "post",
        data
      })
        .then(res => {
          let result_data = res.data.result_data
          if(result_data.deleted_at) {
            this.$swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        })
        .catch(err => {
          console.log(err.res);
        });
    }
  }
};
</script>
