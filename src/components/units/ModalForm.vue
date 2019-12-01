<template>
  <div>
    <div
      class="modal fade in"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: block; padding-right: 15px;"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
              @click="close()"
            >×</button>
            <h4 class="modal-title" id="myModalLabel">New Unit</h4>
          </div>
          <div class="modal-body">
            <div id="testmodal" style="padding: 5px 20px;">
              <form id="antoform" class="form-horizontal calender" role="form">
                <div class="form-group">
                  <label class="col-sm-3 control-label">Name</label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      name="name"
                      v-model="unit.name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">Parent unit</label>
                  <div class="col-sm-9">
                    <select class="select2_group form-control" v-model="unit.parent_id">
                      <option value>Select parent unit</option>
                      <option
                        v-for="item in listUnits.data"
                        v-if="item.parent_id==0"
                        :value="item.id"
                      >{{ item.name }}</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default antoclose"
              data-dismiss="modal"
              @click="close()"
            >Cancel</button>
            <button type="button" class="btn btn-danger antosubmit" @click="create()">Create</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in"></div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { successAlert, errorAlert } from "@/utils/alert"
export default {
  name: "ModalForm",
  props: ['item'],
  data() {
    return {
      unit: {
        name: "",
        parent_id: ""
      },
      listUnits: [],
    };
  },
  created() {
    this.getUnits();
    this.getUnit();
  },
  methods: {
    close() {
      this.$emit("onClose");
    },
    create() {
      let data = this.unit;
      request({
        url: "/backend/units/create",
        method: "post",
        data
      })
        .then(res => {
          console.log(res);
          successAlert();
          this.close();
        })
        .catch(err => {
          errorAlert()
        });
    },
    getUnits() {
      request({
        url: "/backend/units/list?limit=" + 1000,
        method: "get"
      })
        .then(res => {
          this.listUnits = res.data.result_data;
        })
        .catch();
    },
    getUnit() {
        if(this.item) {
          this.unit = this.item
        }
    }
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 0px;
}
</style>