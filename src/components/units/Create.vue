<template>
  <div class="col-md-6 col-xs-12">
    <div class="x_panel">
      <div class="x_title">
        <h2>
          Create new Unit
          <small></small>
        </h2>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <br />
        <form class="form-horizontal form-label-left" @submit.prevent="create">
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Parent unit</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <select class="select2_group form-control" :value="unit.parent_id">
                <option value>Select parent unit</option>
                <option
                  :value="pUnit.id"
                  v-for="pUnit in listUnits"
                  v-if="pUnit.parent_id == 0"
                >{{pUnit.name}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12">Name</label>
            <div class="col-md-9 col-sm-9 col-xs-12">
              <input type="text" class="form-control" v-model="unit.name" />
            </div>
          </div>
          <div class="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button type="submit" class="btn btn-success">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "CreateUnit",
  data() {
    return {
      unit: {
        parent_id: null,
        name: ""
      },
      listUnits: []
    };
  },
  methods: {
    create() {
      let data = this.unit;
      request({
        url: "/backend/units/create",
        method: "post",
        data
      })
        .then(res => {
          console.log(res);
        this.$router.push('/management/units/list')
        })
        .catch();
    }
  },
  created() {
    // get list unit
    request({
      url: "/backend/units/list",
      method: "get"
    })
      .then(res => {
        console.log(res);
        this.listUnits = res.data.result_data;
      })
      .catch();
  }
};
</script>
