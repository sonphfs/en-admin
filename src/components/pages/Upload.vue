<template>
  <div class>
    <div class="item form-group">
      <label for="file-image" class="control-label col-md-3">Image</label>
      <div class="col-md-9 col-sm-9 col-xs-12">
        <button type="button" class="btn btn-default" @click="chooseImage()">Upload Image</button>
        <button type="button" class="btn btn-danger" @click="deleteFile()">Delete Image</button>
        <p style="margin-top: 10px">
          <span v-if="image">{{ image.name}}</span>
        </p>
        <input
          id="file-image"
          type="file"
          name="image"
          data-validate-length="6,8"
          class="form-control col-md-7 col-xs-12"
          required="required"
          ref="image"
          style="display: none"
          accept="image/*"
          @change="changeImage()"
        />
      <img :src="'http://127.0.0.1:8001/'+imgSrc" width="300px" height="300px">
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request"
export default {
  name: "uploadForm",
  data() {
    return {
      image: "",
      imgSrc: ""
    };
  },
  methods: {
    chooseImage() {
      this.$refs.image.click();
    },
    changeImage() {
      this.image = this.$refs.image.files[0];
      this.uploadImage()
    },
    uploadImage() {
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("type", 'question');
      request
        .post("/backend/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.imgSrc = res.data.result_data
          console.log('http://127.0.0.1:8001/'+ this.imgSrc)

        })
    },
    deleteFile(){
      let data = {
        filePath: this.imgSrc
      }
      console.log(data)
      request({
        url: "/backend/files/delete",
        method: "post",
        data
      }).then(res =>{
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
};
</script>