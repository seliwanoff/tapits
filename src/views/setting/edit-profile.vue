<template>
  <div>
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      :color="color"
    />
    <Header2 />

    <div class="rg-c">
      <div class="gc-x">
        <h2 class="hc-x">Edit Profile</h2>
        <main>
          <Message :status="status" :message="message" />

          <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <div class="ml-xfs-v">
              <div v-if="imageUrl != ''">
                <img :src="imageUrl" alt="" style="" />
              </div>
              <div v-else-if="image != null">
                <img :src="url + image" alt="" style="" />
              </div>
              <div v-else class="nhi">
                {{ fn }}
              </div>

              <span class="fa fa-pencil" @click="$refs.fileInput.click()"></span>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                @change="onSelectedFile"
                accept="image/*"
              />
            </div>
            <div class="ml-xf">
              <label for="email">Username</label> <br />
              <input type="text" v-model="username" disabled />
            </div>

            <div class="ml-xf">
              <label for="number">First Name</label>
              <input type="text" v-model="fname" required />
            </div>
            <div class="ml-xf">
              <label for="number">Last Name</label>
              <input type="text" placeholder="********" v-model="lname" required />
            </div>
            <div class="ml-xf">
              <label for="number">Email</label>
              <input type="text" v-model="email" required disabled />
            </div>
            <div class="ml-xf">
              <label for="number">Phone Number</label>
              <input type="text" v-model="phone" required disabled />
            </div>
            <div class="ml-xf">
              <button :disabled="isDisabled" style="margin-top: 10px !important">
                {{ btnText }}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Header2 from "../../components/header.vue";
import Message from "../../components/message.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import axios from "axios";

export default {
  name: "profile-app",
  components: { Header2, Message, Loading },
  data() {
    return {
      selected: "Personal",
      message: "",
      status: null,
      username: "",
      fname: "",
      lname: "",
      phone: "",
      email: "",
      btnText: "Update",

      dpassword: "",
      npassword: "",
      cnpassword: "",
      token: "",
      isDisabled: false,
      fn: "",
      imageUrl: "",
      image: null,
      storage: "https://api.tapit.ng/public/storage/images/",
      url: "https://api.tapit.ng/public/storage/images/",
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
    };
  },

  async mounted() {
    const datas = JSON.parse(localStorage.getItem("user"));
    this.token = datas.data.token;

    try {
      const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });

      this.username = user.data.data.username;
      this.fn = user.data.data.username.charAt(0);
      this.lname = user.data.data.lname;
      this.fname = user.data.data.fname;
      this.image = user.data.data.image;
      this.email = user.data.data.email;
      this.phone = user.data.data.phone;

      this.isLoading = false;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/panel/login");
      }
    }
    const data = JSON.parse(localStorage.getItem("user"));

    this.token = data.data.token;
  },
  methods: {
    async handlePassword() {
      this.isDisabled = true;
      this.btnPass = "Loading";
      if (this.npassword.length >= 6) {
        console.log("l");
      } else {
        this.status = false;
        this.message = "Insufficient Fund to upgrade your account";
        this.setTimeout = setTimeout(() => {
          this.status = null;
        }, 3000);
      }
    },
    onSelectedFile(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        alert("no");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      console.log(this.image);
    },
    async handleSubmit() {
      // const ext = filename.slice(filename.lastIndexOf('.'))
      (this.isDisabled = true), (this.btnText = "Loading");
      if (this.image) {
        const formdata = new FormData();
        formdata.append("image", this.image, this.image.name);
        formdata.append("fname", this.fname);
        formdata.append("lname", this.lname);

        const datas = JSON.parse(localStorage.getItem("user"));
        this.token = datas.data.token;
        try {
          const response = await axios.post(
            `${process.env.VUE_APP_BASE_URL}api/updateuser`,
            formdata,
            {
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          this.status = true;
          this.message = response.data.message;
          this.isDisabled = false;
          this.btnText = "Update";
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        } catch (e) {
          if (e.response.status == 400 || e.response.status == 422) {
            this.isDisabled = false;
            this.status = false;
            this.message = e.response.data.message;
            this.btnText = "Update";
            this.isDisabled = false;
            this.interval = setTimeout(() => {
              this.status = null;
            }, 3000);
          } else {
            this.status = false;
            this.message = "Connection problem, try checking your network";
            this.isDisabled = false;
            this.interval = setTimeout(() => {
              this.status = null;
            }, 3000);
          }
        }
      } else {
        const data = {
          fname: this.fname,
          lname: this.lname,
        };

        const datas = JSON.parse(localStorage.getItem("user"));
        this.token = datas.data.token;

        try {
          const response = await axios.post(
            `${process.env.VUE_APP_BASE_URL}api/updateuser`,
            data,
            {
              headers: {
                Authorization: "Bearer " + this.token,
              },
            }
          );
          this.status = true;
          this.message = response.data.message;
          this.isDisabled = false;
          this.btnText = "Update";
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        } catch (e) {
          if (e.response.status == 400 || e.response.status == 422) {
            this.isDisabled = false;
            this.status = false;
            this.message = e.response.data.message;
            this.btnText = "Update";
            this.isDisabled = false;
            this.interval = setTimeout(() => {
              this.status = null;
            }, 3000);
          } else if (e.response.status === 401) {
            if (e.response.status === 401) {
              this.$router.push("/panel/login");
            }
          } else {
            this.status = false;
            this.message = "Connection problem, try checking your network";
            this.isDisabled = false;
            this.interval = setTimeout(() => {
              this.status = null;
            }, 3000);
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.rg-c {
  font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;
  font-size: 1.6rem;
  padding: 10px;
}
.rg-c .gc-x {
  margin: 50px;
  max-width: 500px;
  width: 100%;
  margin: 100px auto;
  background: #fff;
  box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
  padding: 10px;
  border-radius: 15px;
}
@media screen and (max-width: 490px) {
  .rg-c .gc-x {
    margin-top: 60px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 20px;
    margin-top: 100px;
  }
}
.hc-x {
  font-size: 1rem;

  margin: 0px;
  color: #222;
  font-weight: 700;
}
main {
  margin-top: 20px;
}
.xl-f {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.rm-bl {
  margin-left: 5px;
}

label {
  font-size: 1rem;
  width: 100%;
  color: #000;
}
input {
  outline: none;
  box-sizing: border-box;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 96%;
  padding: 10px;
}
button {
  padding: 10px;
  color: #fff;
  font-size: 1rem;
  background: #0a1aa8;
  border: 1px solid #0a1aa8;
  border-radius: 10px;
  width: 96%;
  box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
}
input::-webkit-input-placeholder {
  font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;
}
.xdir,
.vdir {
  color: #0a1aa8;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
}
@media screen and (max-width: 490px) {
  label {
    font-size: 0.9rem;
    margin: 5px;
  }
  input {
    width: 95%;
    margin: 5px;
  }
  button {
    width: 95%;
    font-size: 0.9rem;
  }
  .rm-bl {
    margin-left: 12px;
  }
}
.ml-xf {
  padding: 10px;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.xdir,
.vdir {
  font-size: 0.9rem;
}

.tab-banner {
  padding: 10px;
}
.tab-banner ul {
  display: flex;
  justify-content: space-around;
  border: 1px solid black;
}
.css {
  border-bottom: 2px solid #0a1aa8;
}
.tcg-lf {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
}
strong {
  font-size: 0.8rem;
}
.ml-xfs-v {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: 1px solid #ccc;
  align-items: center;
  margin: 0px auto;
  text-align: center;
  font-size: 4.5rem !important;
  color: #0a1aa8;
  z-index: 0;
}
.fa-pencil {
  position: absolute;
  font-size: 0.8rem;
  margin-top: -45px;
  display: inline-block;
  border: 1px solid #0a1aa8;
  border-radius: 100%;
  padding: 5px;
  background: #0a1aa8;
  color: #fff !important;
  margin-left: 15px;
  z-index: 0;
}
.nhi {
  color: #0a1aa8;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 1px solid black;
  font-size: 4.5rem !important;
  z-index: 0;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  box-sizing: box-sizing;
  z-index: 0 !important;
}
</style>
