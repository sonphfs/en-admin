<template>
  <div>
    <div class="modal-backdrop fade in"></div>
    <div
      id="CalenderModalNew"
      class="modal fade in"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="display: block; padding-right: 15px;"
      @click="onClose()"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">{{modalData.title}}</h4>
          </div>
          <div class="modal-body">
            <div id="testmodal" style="padding: 5px 20px;">{{modalData.message}}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default antoclose" data-dismiss="modal" @click="onClose()">Close</button>
            <button type="button" class="btn btn-primary antosubmit" @click="onSubmit()">Accept</button>
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
    };
  },
  created() {
    if (this.modalData == []) {
      this.modalData = {
        title: "Confirming!",
        message: "Are you sure update data!"
      }
    }
  },
  methods: {
    onSubmit(){
        this.$emit('accept')
    },
    onClose() {
      this.$emit('onClose')
    }
  }
};
</script>