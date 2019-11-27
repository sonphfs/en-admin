<template>
  <div>
    <div class="modal-backdrop fade in"></div>
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
              @click="onClose()"
            >×</button>
            <h4 class="modal-title" id="myModalLabel">{{item.title}}</h4>
          </div>
          <div class="modal-body">
            <div id="testmodal" style="padding: 5px 20px;">{{item.message}}</div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default antoclose"
              data-dismiss="modal"
              @click="onClose()"
            >Close</button>
            <button type="button" class="btn btn-danger antosubmit" @click="onSubmit()">Accept</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalConfirm",
  props: ["modalData"],
  data() {
    return {
      item: {
        title: "Confirming!",
        message: "Are you sure update data!"
      }
    };
  },
  created() {
    if (this.modalData != undefined) {
      this.item = this.modalData
    }
  },
  methods: {
    onSubmit() {
      this.$emit("accept");
    },
    onClose() {
      this.$emit("onClose");
    }
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 0px;
}
</style>>