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
        <span
          style="font-size: 0.8rem; color: #0a1aa8; font-weight: 800; padding-left: 10px"
          >Refer your friends</span
        >
        <h2 class="hc-x" style="margin-top: -10px !important; font-size: 1rem">
          Earn &#8358;50.00 each
        </h2>
        <main>
          <div class="rfer-col">
            <router-link
              to="./referral-reward"
              class="rtb"
              style="border-right: 2px solid #ccc"
            >
              <div class="ech-refer">
                <div class="tet-refer">
                  <span>Total Reward</span>
                  <h6>&#8358;{{ totalEr }}</h6>
                </div>
                <span class="fa fa-angle-right"></span>
              </div>
            </router-link>
            <router-link to="./referral-reward" class="rtb">
              <div class="ech-refer">
                <div class="tet-refer">
                  <span>Total Refferal</span>
                  <h6>{{ length }}</h6>
                </div>

                <span class="fa fa-angle-right"></span>
              </div>
            </router-link>
          </div>
        </main>
      </div>
    </div>
    <div class="rg-c">
      <div class="gc-xl">
        <main>
          <Message :status="status" :message="message" />
          <div class="rfer-colx">
            <div class="gbc-lkj">
              <h6>Your referral code</h6>
              <div class="inp-ref">
                <input type="text" :placeholder="username" v-model="username" readonly />
                <button class="" @click="copyText">copy</button>
              </div>
              <span style="font-size: 0.8rem; color: green; font-weight: 600"
                >How it works?</span
              >
            </div>
            <div class="inf-ref">
              <div class="ech-spc-link">
                <div class="lcho">
                  <span class="fa fa-link"></span>
                </div>

                <span class="p-thc"
                  >Invite your to install the app with your referral code and earn</span
                >
              </div>
              <div class="ech-spc-link">
                <div class="lcho">
                  <span class="fa fa-gift"></span>
                </div>

                <span class="p-thc"
                  >Your friend fund their account with a minimum of &#8358;100.00</span
                >
              </div>
              <div class="ech-spc-link">
                <div class="lcho">
                  <span class="fa fa-gift"></span>
                </div>

                <span class="p-thc"
                  >You receive &#8358;50.00 once they successfully fund their
                  account</span
                >
              </div>
            </div>
          </div>
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
  name: "Refer-app",
  components: { Header2, Message, Loading },
  data() {
    return {
      id: "",
      password: "",
      status: null,
      message: "",
      btnText: "Sign In",
      isDisabled: false,
      username: "",
      length: 0,
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
      totalEr: 0,
    };
  },
  methods: {
    copyText() {
      try {
        navigator.clipboard.writeText(this.username);
        (this.status = true), (this.message = "Copied to clipboard");
        this.interval = setInterval(() => {
          this.status = null;
        }, 2000);
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/panel/login");
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

      this.username = user.data.data.username;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/panel/login");
      }
    }
    try {
      const refer = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getrefer`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      console.log(refer);
      this.length = refer.data.data.length;
      this.refferds = refer.data.data;
      var i;
      for (i = 0; i < this.length; i++) {
        this.totalEr = this.totalEr + parseInt(this.refferds[i].er);
      }
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/panel/login");
      }
    }
    this.isLoading = false;
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
  max-width: 400px;
  width: 100%;
  margin: 100px auto;
  background: #fff;
  box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
  padding: 10px;
  border-radius: 15px;
}
.rg-c .gc-xl {
  max-width: 420px;
  width: 100%;
  margin: 0px auto;
  background: #fff;
  box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
  padding: 10px;
  border-radius: 15px;
  margin-top: -80px;
  box-sizing: border-box;
}
.rfer-col {
  display: flex;
  justify-content: space-between;
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
  width: 100%;
  padding: 10px;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.xdir,
.vdir {
  font-size: 0.9rem;
}
.ech-refer {
  justify-content: space-between;
  display: flex;
  width: 100%;
}
.fa-angle-right {
  font-size: 1rem;

  border-radius: 100%;
  padding: 5px;
  height: 10px;
  margin: 10px;
  align-items: center;
}
.tet-refer span {
  font-size: 1rem;
}
.rtb {
  width: 100%;
  margin: 5px;
}
.tet-refer h6 {
  text-align: center;
  color: #000;
  margin: 0px;
}
.gbc-lkj h6 {
  color: #0a1aa8;
  font-weight: 600;
  font-size: 1rem;
}
.inp-ref {
  display: flex;
  justify-content: space-between;

  border: 1px solid #0a1aa8;
  border-radius: 10px;
  padding: 0px;
  margin-top: 10px !important;
  background: #aeb3df !important;
}
.inp-ref input {
  width: 100%;
  border: none;
  background: none;
  padding: 5px;
  border-radius: 0px !important;
  color: #000 !important;
}
.inp-ref button {
  max-width: 90px;
  border: none !important;
}
.inf-ref {
  border: 1px dashed black;
  padding: 10px;
  margin-top: 5px;
  border-radius: 10px;
}
.ech-spc-link {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.lcho {
  background: #aeb3df;
  border-radius: 100%;
  font-size: 0.8rem;
  text-align: center;
  padding: 3px;
  align-items: center;
  color: #222;
  height: 20px;
  width: 20px;
  margin-right: 15px;
}
.p-thc {
  font-size: 0.8rem;
  color: #222;
}
@media screen and (max-width: 490px) {
  h2 {
    font-size: 1rem;
  }
}
</style>
