<template>
  <div>
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      :color="color"
    />
    <Header />

    <div class="rg-c">
      <div class="gc-x">
        <main>
          <Message :status="status" :message="message" />
          <form action="" @submit.prevent="handleSubmit">
            <div class="ml-xf">
              <div class="lcl-xj">
                <div class="acc-de">
                  <div class="each-de">
                    <p>Network</p>
                    <p style="font-size: 0.8rem !important">{{ network }}</p>
                  </div>
                  <div class="each-de">
                    <p>Plan</p>

                    <p style="font-size: 0.8rem !important">{{ name }}</p>
                  </div>
                  <div class="each-de">
                    <p>Amount</p>
                    <p style="font-size: 0.8rem !important">&#8358;{{ amount }}</p>
                  </div>
                  <div class="each-de">
                    <p>Transaction Fee</p>
                    <p style="font-size: 0.8rem !important">&#8358;{{ tfee }}</p>
                  </div>
                  <div class="each-de">
                    <p>commission</p>
                    <p style="font-size: 0.8rem !important">&#8358;{{ comm }}</p>
                  </div>
                  <div class="each-de">
                    <p>Recipient</p>
                    <p style="font-size: 0.8rem !important">{{ phone }}</p>
                  </div>

                  <div class="each-de">
                    <input type="hidden" name="" v-model="billersCode" />
                    <input type="hidden" name="" v-model="serviceID" />
                    <input type="hidden" name="" v-model="variation_code" />
                    <input type="hidden" name="" v-model="amount" />
                    <input type="hidden" name="" v-model="phone" />
                    <button :disabled="isDisabled" style="width: 100%; margin-top: 20px">
                      {{ btnText }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/header.vue";
import moment from "moment";
import Message from "../../components/message.vue";
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "Account2-app",
  components: { Header, Message, Loading },
  data() {
    return {
      password: "",

      status: null,
      message: "",
      btnText: "Payment",
      isDisabled: false,
      receiver: "",
      token: "",
      accountNumber: "",
      bankName: "",
      accountName: "",
      balance: "",
      request_id: "",
      serviceID: "",
      billersCode: "",
      variation_code: "",
      amount: 0,
      phone: "",
      service: "",
      ename: "",
      type: "",
      network_id: "",
      name: "",
      network: "",
      usertype: "",
      redam: 0,
      tfee: 0.0,
      mtnapi: "",
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
      cdata: "",
      ncdata: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.isDisabled = true;
      this.btnText = "Loading";

      if (this.network_id == 1 && this.mtnapi == 1) {
        const current = new Date();
        const data = {
          type: this.type,
          status: 1,
          ref: moment(current).format("YYYYMMDDHHm"),
          am: this.amount,
          plan: this.name,
          planid: this.plan_id,
          network: this.network_id,
          reciever: this.phone,
          amount: this.redam,
          name: this.network,
          mtn: "mtn",
          m: "web",
        };
        const datas = JSON.parse(localStorage.getItem("user"));
        this.token = datas.data.token;
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        };
        try {
          const resp = await axios.post(
            `${process.env.VUE_APP_BASE_URL}api/transaction`,
            data,
            {
              headers: headers,
            }
          );
          if (resp.data.success == "false") {
            this.status = false;
            this.message = "Failed";
            this.setTimeout = setTimeout(() => {
              this.status = null;
              this.btnText = "Payment";
              this.isDisabled = false;
            }, 3000);
          } else {
            this.status = true;
            this.message = "Transaction Succesful";
            this.setTimeout = setTimeout(() => {
              this.$router.push("/account/dashboard");
            }, 3000);
          }
        } catch (e) {
          if (e.response.status == 400 || e.response.status == 422) {
            this.isDisabled = false;
            this.status = false;
            this.message = "Failed";
            this.btnText = "Payment";
            this.isDisabled = false;
            this.interval = setTimeout(() => {
              this.status = null;
            }, 3000);
          } else if (e.response.status === 401) {
            if (e.response.status === 401) {
              this.$router.push("/panel/login");
              localStorage.removeItem("user");
            }
          } else {
            this.status = false;
            this.message = "Connection problem, try checking your network";
            this.isDisabled = false;
            this.interval = setTimeout(() => {
              this.status = null;
              this.btnText = "Payment";
            }, 3000);
          }
        }
      } else {
        const current = new Date();
        const data = {
          type: this.type,
          status: 1,
          ref: moment(current).format("YYYYMMDDHHm"),
          am: this.amount,
          plan: this.name,
          planid: this.plan_id,
          network: this.network_id,
          reciever: this.phone,
          amount: this.redam,
          name: this.network,
          mtn: "",
          m: "web",
        };
        const datas = JSON.parse(localStorage.getItem("user"));
        this.token = datas.data.token;
        try {
          const resp = await axios.post(
            `${process.env.VUE_APP_BASE_URL}api/transaction`,
            data,
            {
              headers: {
                Authorization: "Bearer " + this.token,
              },
            }
          );
          if (resp.data.data.status == false) {
            this.status = false;
            this.message = "Failed";
            this.setTimeout = setTimeout(() => {
              this.status = null;
              this.btnText = "Payment";
              this.isDisabled = false;
            }, 3000);
          } else {
            this.status = true;
            this.message = "Transaction Sucessful";
            this.setTimeout = setTimeout(() => {
              this.$router.push("/account/dashboard");
            }, 3000);
          }
        } catch (e) {
          if (e.response.status == 400 || e.response.status == 422) {
            this.isDisabled = false;
            this.status = false;
            this.message = "Failed";
            this.btnText = "Payment";
            this.isDisabled = false;
            this.interval = setTimeout(() => {
              this.status = null;
            }, 3000);
          } else if (e.response.status === 401) {
            if (e.response.status === 401) {
              this.$router.push("/panel/login");
              localStorage.removeItem("user");
            }
          } else {
            this.status = false;
            this.message = "Connection problem, try checking your network";
            this.isDisabled = false;
            this.interval = setTimeout(() => {
              this.status = null;
              this.btnText = "Payment";
            }, 3000);
          }
        }
      }
    },
  },

  async mounted() {
    const billdata = JSON.parse(localStorage.getItem("sub"));
    const datas = JSON.parse(localStorage.getItem("user"));
    this.token = datas.data.token;
    this.phone = billdata.phone;
    this.network_id = billdata.network_id;
    this.plan_id = billdata.plan_id;
    this.name = billdata.name;
    (this.network = billdata.network),
      (this.amount = billdata.amount),
      (this.type = billdata.type);
    try {
      const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });

      this.usertype = user.data.data.type;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/panel/login");
        localStorage.removeItem("user");
      }
    }

    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/getmanagement`
      );
      if (this.usertype == 1) {
        this.redam = parseInt(this.amount - response.data.data.ncdata * 100);
        this.tfee = response.data.data.ndata;
        this.comm = response.data.data.ncdata * this.amount;
      } else {
        this.redam = parseInt(this.amount - response.data.data.mdata * 100);
        this.tfee = response.data.data.mdata;
        this.comm = response.data.data.cdata * this.amount;
      }

      if (response.data.data.mtnapi == 1 && this.network_id == 1) {
        this.name = billdata.plan;
        this.mtnapi = response.data.data.mtnapi;
      } else {
        this.name = billdata.name;
        this.mtnapi = response.data.data.mtnapi;
      }
      this.isLoading = false;
    } catch (e) {
      e.response;
    }
  },
  async beforeCreate() {
    const data = JSON.parse(localStorage.getItem("user"));
    this.token = data.data.token;

    try {
      const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });

      this.bankName = user.data.data.bankname;
      this.accountName = user.data.data.accountName;
      this.accountNumber = user.data.data.bank;
      (this.balance = user.data.data.balance), (this.usertype = user.data.data.type);
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
  margin: 120px auto;
  background: #fff;
  box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
  padding: 10px;
  border-radius: 15px;
}
@media screen and (max-width: 490px) {
  .rg-c .gc-x {
    width: 100%;
    margin: 0px;
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
  border-radius: 10px;
  padding: 10px;
  background: #fff;
  border: 1px dashed #0a1aa8;
  margin-top: 15px;
  box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
}
.xdir,
.vdir {
  font-size: 0.9rem;
}
.disableClass {
  background: #ccc !important;
  border: 1px solid #ccc;
}
.activeClass {
  background: #0a1aa8 !important;
  border: 1px solid #0a1aa8;
}

.each-pre {
  margin-left: 20px;
}
.each-pre h4 {
  font-weight: 800;
  font-size: 1rem;
  color: #000;
  margin: 0px !important;
  padding: 0px;
}
.each-pre span {
  font-weight: 500;
  font-size: 0.7rem;
  line-height: 1.3px;
}
.icox-col {
  height: 30px;
  width: 30px;
  border-radius: 100%;
}
.lcl-xj {
  font-size: 1rem;

  padding: 10px;
  color: #fff;
}
p {
  font-size: 0.8rem !important;
}
.each-de {
  padding: 3px;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
}
.each-de p {
  color: #000;
  font-size: 0.7rem;
}
.each-de h3 {
  font-weight: 800;
  color: #000;
  font-size: 1rem;
  width: 100%;
}
.fa-copy {
  color: #0a1aa8;
  cursor: pointer;
}
</style>
