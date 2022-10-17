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
        <h2 class="hc-x">API</h2>
        <main>
          <Message :status="status" :message="message" />
          <label>Token:</label> <br />
          <span
            class="fa fa-copy"
            @click="copyText"
            style="float: right; margin-bottom: 20px"
          ></span>
          <div style="text-align: center; font-size: 0.8rem; width: 100%">
            {{ apitoken }}
            <input type="hidden" v-model="apitoken" />
          </div>

          <div style="display: flex; justify-content: space-between; margin-top: 40px">
            <button
              style="
                color: #fff;
                background: crimson !important;
                margin: 10px;
                border: none;
              "
              @click="changeToken"
              v-if="key == '1'"
            >
              Deactivate
            </button>
            <button
              style="
                color: #fff;
                background: green !important;
                margin: 10px;
                border: none;
              "
              @click="changeToken"
              v-if="key == '0'"
            >
              Activate
            </button>
            <button style="margin: 10px; border: none" @click="generateToken">
              Regenerate
            </button>
          </div>
          <div>
            <a
              href="https://documenter.getpostman.com/view/10682260/VUjQkj66"
              style="font-size: 0.8rem"
              >View API Documentation</a
            >
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Header2 from "../../components/header.vue";
import Message from "../../components/message.vue";
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "Register-app",
  components: { Header2, Message, Loading },
  data() {
    return {
      id: "",
      password: "",
      status: null,
      message: "",
      btnText: "Sign In",
      isDisabled: false,
      usertype: "",
      apitoken: "",
      key: "0",
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
    };
  },
  methods: {
    copyText() {
      try {
        navigator.clipboard.writeText(this.apitoken);
        (this.status = true), (this.message = "Copied to clipboard");
        this.interval = setInterval(() => {
          this.status = null;
        }, 2000);
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/panel/login");
          localStorage.removeItem("user");
        }
      }
    },

    async changeToken() {
      const data = JSON.parse(localStorage.getItem("user"));
      this.token = data.data.token;
      if (this.key == 1) {
        this.key = "0";
      } else {
        this.key = "1";
      }
      const datas = {
        status: this.key,
      };
      try {
        const changeStatus = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/updatetokenstaus`,
          datas,
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );
        if (changeStatus.data.status == "true") {
          this.key = changeStatus.data.data.tstatus;
          this.status = true;
          this.message = "Token state changed Successfully";
          this.setTimeout = setTimeout(() => {
            this.$router.go();
          }, 3000);
        } else {
          this.key = changeStatus.data.data.tstatus;
          this.status = true;
          this.message = "Error Changing state";
          this.setTimeout = setTimeout(() => {
            this.$router.go();
          }, 3000);
        }
      } catch (e) {
        if (e.response.status == 400 || e.response.status == 422) {
          this.status = false;
          this.message = e.response.data.message;
          this.setTimeout = setTimeout(() => {
            this.$router.go();
          }, 3000);
        } else if (e.response.status === 401) {
          if (e.response.status === 401) {
            this.$router.push("/panel/login");
            localStorage.removeItem("user");
          }
        } else {
          this.status = false;
          this.message = "Connection problem, try checking your network";
          this.setTimeout = setTimeout(() => {
            this.$router.go();
          }, 3000);
        }
      }
    },
    async generateToken() {
      const data = JSON.parse(localStorage.getItem("user"));
      this.token = data.data.token;
      const datas = {
        ids: "1",
      };
      try {
        await axios.post(`${process.env.VUE_APP_BASE_URL}api/chnagetoken`, datas, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        });
        this.status = true;
        this.message = "Token Changed";
        this.setTimeout = setTimeout(() => {
          this.$router.go();
        }, 3000);
      } catch (e) {
        if (e.response.status == 400 || e.response.status == 422) {
          this.status = false;
          this.message = e.response.data.message;
          this.setTimeout = setTimeout(() => {
            this.$router.go();
          }, 3000);
        } else if (e.response.status === 401) {
          if (e.response.status === 401) {
            this.$router.push("/panel/login");
            localStorage.removeItem("user");
          }
        } else {
          this.status = false;
          this.message = "Connection problem, try checking your network";
          this.setTimeout = setTimeout(() => {
            this.$router.go();
          }, 3000);
        }
      }
    },
  },
  async mounted() {
    const data = JSON.parse(localStorage.getItem("user"));
    this.token = data.data.token;
    try {
      const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      console.log(user);
      this.usertype = user.data.data.type;
      this.apitoken = user.data.data.token;
      this.key = user.data.data.tstatus;
      this.isLoading = false;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/panel/login");
        localStorage.removeItem("user");
      }
    }
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
  font-size: 1.2rem;
  padding: 10px;
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
.fa-copy {
  color: #0a1aa8;
  cursor: pointer;
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
  width: 100%;
  padding: 10px;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.xdir,
.vdir {
  font-size: 0.9rem;
}
.forget {
  font-size: 0.9rem;
  width: 100%;
  text-align: right !important;
  color: #0a1aa8 !important;

  font-weight: 800;
  float: right;
  margin: 10px;
}
</style>
