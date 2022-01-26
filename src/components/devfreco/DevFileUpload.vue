<template>
  <div>
    <div class="page-separator">
      <div class="page-separator__text">{{ label }}</div>
    </div>
    <div class="card">
      <div class="text-center " v-bind:class="{
        'embed-responsive': !FileInfo,
        'embed-responsive-16by9': !FileInfo  }">
        <ul class="file-list" v-if="FileInfo ">
          <li>{{ FileInfo.Id }}</li>
          <li>{{ FileInfo.Length }}</li>
          <li><a :href="downloadLink" title="download" target="_blank">
            <svg data-v-6e03f583="" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#8899a4"
                 stroke-width="2"
                 stroke-linecap="square" stroke-linejoin="arcs">
              <path data-v-6e03f583="" d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"></path>
            </svg>
          </a></li>
        </ul>
      </div>
      <div class="card-body" v-bind:class="{ 'dev-file-upload-border': FileInfo }">
        <input
            type="file"
            class="form-control dev-file-upload"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            @change="onUploadChange"
            ref="fileUpload"
        />
        <div
            class="progress"
            style="height: 16px; margin-top: 10px"
            v-if="progressNumber > 0"
        >
          <div
              class="progress-bar bg-primary"
              role="progressbar"
              :style="{ width: progressNumber + '%' }"
              :aria-valuenow="progressNumber"
              aria-valuemin="0"
              aria-valuemax="100"
          >
            {{ progressNumber }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dev-file-upload",
  inheritAttrs: false,
  props: {
    label: String,
    id: String,
  },
  data() {
    return {
      FileInfo: null,
      blob: null,
      start: null,
      end: null,
      part: null,
      SIZE: null,
      BYTES_PER_CHUNK: null,
      xhr: null,
      chunk: null,
      file: null,
      ROOT_API: process.env.VUE_APP_DEV_MEDIA_SERVER,
      API_UPLOAD: `${process.env.VUE_APP_DEV_MEDIA_SERVER}/media-server/upload`,
      API_uploadComplete: `${process.env.VUE_APP_DEV_MEDIA_SERVER}/media-server/uploadComplete`,
      GET_FILE_BY_ID: `${process.env.VUE_APP_DEV_MEDIA_SERVER}/media-server/GetFileById`,
      FILE_DOWNLOAD: `${process.env.VUE_APP_DEV_MEDIA_SERVER}/media-server/FileDownload`,
      progressNumber: null,
      fileName: null,
      fileSize: null,
      fileType: null,
      downloadLink: null,
    };
  },
  methods: {
    onUploadChange(e) {
      const file = e.target.files[0];
      this.file = file;
      this.blob = file;
      this.BYTES_PER_CHUNK = 1048576 * 28; // 29MB chunk sizes.
      this.SIZE = this.blob.size;
      this.start = 0;
      this.part = 0;
      this.end = this.BYTES_PER_CHUNK;

      this.chunk = this.blob.slice(this.start, this.end);

      this.uploadFile(this.chunk, this.part);

      this.start = this.end;
      this.end = this.start + this.BYTES_PER_CHUNK;
      this.part = this.part + 1;
    },
    uploadFile(blobFile, part) {
      let fd = new FormData();
      fd.append("fileToUpload", blobFile);

      let xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", this.uploadProgress, false);
      xhr.addEventListener("load", this.uploadComplete, false);
      xhr.addEventListener("error", this.uploadFailed, false);
      xhr.addEventListener("abort", this.uploadCanceled, false);

      xhr.open(
          "POST",
          this.API_UPLOAD +
          "?" +
          "file=" +
          this.file.name +
          "&num=" +
          parseInt(part)
      );
      xhr.onload = function (e) {
        //onload
      };

      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.send(fd);
    },
    fileSelected(file) {
      if (file) {
        let fileSize = 0;
        if (file.size > 1024 * 1024)
          fileSize =
              (Math.round((file.size * 100) / (1024 * 1024)) / 100).toString() +
              "MB";
        else
          fileSize =
              (Math.round((file.size * 100) / 1024) / 100).toString() + "KB";

        this.fileName = "Name: " + file.name;
        this.fileSize = "Size: " + fileSize;
        this.fileType = "Type: " + file.type;
      }
    },
    uploadFinish() {
      let _this = this;
      let xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", this.uploadProgress, false);
      xhr.addEventListener("error", this.uploadFailed, false);
      xhr.addEventListener("abort", this.uploadCanceled, false);

      xhr.open(
          "POST",
          this.API_uploadComplete + "?" + "fileName=" + this.file.name
      );
      xhr.onload = function (e) {
        ///
      };

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            _this.$data.ImageUrl = URL.createObjectURL(_this.$data.file);
            _this.$data.MediaServerId = xhr.responseText;
            _this.fileLoad(_this.$data.MediaServerId);
            _this.$emit("setResponse", _this.$data.MediaServerId);
          } else {
            alert(xhr.responseText);
          }
          _this.$refs.fileUpload.value = null;
        }
      };
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.send();
    },
    uploadProgress(evt) {
      if (evt.lengthComputable) {
        let percentComplete = Math.round((evt.loaded * 100) / evt.total);
        this.progressNumber = percentComplete.toString();
      } else {
        this.progressNumber = "unable to compute";
      }
    },
    uploadComplete(evt) {
      if (this.start < this.SIZE) {
        this.chunk = this.blob.slice(this.start, this.end);
        this.uploadFile(this.chunk, this.part);
        this.start = this.end;
        this.end = this.start + this.BYTES_PER_CHUNK;
        this.part = this.part + 1;
      } else {
        this.uploadFinish();
      }
    },
    uploadFailed(evt) {
      alert("There was an error attempting to upload the file.");
    },
    uploadCanceled(evt) {
      this.xhr.abort();
      this.xhr = null;
      alert(
          "The upload has been canceled by the user or the browser dropped the connection."
      );
    },
    reqListener(e) {
      this.FileInfo = JSON.parse(e.currentTarget.responseText);
    },
    fileLoad(id) {
      let oReq = new XMLHttpRequest();
      oReq.addEventListener("load", this.reqListener);
      oReq.open("GET", `${this.GET_FILE_BY_ID}/${id}`);
      oReq.send();
      this.downloadLink = `${this.FILE_DOWNLOAD}/${id}`;
    }
  },
  watch: {
    id: function (val) {
      if (val) {
        this.fileLoad(val);
      }
    },
  },
  mounted() {
    if (this.id) {
      this.fileLoad(this.id);
    }
  },
};
</script>

<style scoped>
.dev-file-upload {
  background: unset !important;
  border-left: none !important;
  color: white !important;
  border-top: none !important;
  border-right: none !important;
  border-bottom: none !important;
}

.dev-file-upload-border {
  border-top: 1px solid #80808033 !important;
}

.file-list {
  text-decoration: unset;
  list-style: none;
  padding: 0;
  margin-top: 10px;
}
</style>
