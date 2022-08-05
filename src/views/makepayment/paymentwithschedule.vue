<template>
  <div>
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
                    <p>{{ network }}</p>
                  </div>
                  <div class="each-de">
                    <p>Amount</p>
                    <p>&#8358;{{ Intl.NumberFormat().format(amount) }}</p>
                  </div>
                  <div class="each-de" v-if="usertype == 2">
                    <p>Commission</p>
                    <p>&#8358;{{ Intl.NumberFormat().format(com) }}</p>
                  </div>

                  <div class="each-de">
                    <p>Recipient</p>
                    <p>{{ phone }}</p>
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
//import moment from 'moment'
import Message from "../../components/message.vue";
import axios from "axios";
export default {
  name: "Account3-app",
  components: { Header, Message },
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
      redam: "",
      com: "",
      tfee: "",
      cairtime: "",
      usertype: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.btnText = "Loading";
      this.isDisabled = true;
      const data = {
        network_id: this.network_id,
        phone: this.phone,
        type: this.type,
        amount: this.amount,
        plan_id: "",
      };

      const datas = JSON.parse(localStorage.getItem("user"));
      this.token = datas.data.token;

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/sme`,
          data,
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );
        if (response.data.data.status == true) {
          const data = {
            type: this.type,
            status: 1,
            ref: response.data.data.reference,
            amount: this.amount,
            plan: this.name,
            plan_id: this.plan_id,
          };

          const datas = JSON.parse(localStorage.getItem("user"));
          this.token = datas.data.token;

          try {
            await axios.post(`${process.env.VUE_APP_BASE_URL}api/transaction`, data, {
              headers: {
                Authorization: "Bearer " + this.token,
              },
            });
            const datas = JSON.parse(localStorage.getItem("user"));
            this.token = datas.data.token;
            const datass = {
              type: this.type,
              status: 1,
              amount: this.amount,
              plan: "",
              time: this.time,
              start: this.start,
              reciever: this.phone,
              end: this.end,
              fr: this.fr,
              network: this.network_id,
              m: "web",
            };

            try {
              const response = await axios.post(
                `${process.env.VUE_APP_BASE_URL}api/scheadule`,
                datass,
                {
                  headers: {
                    Authorization: "Bearer " + this.token,
                  },
                }
              );
              this.status = true;
              this.message = response.data.message;
              this.setTimeout = setTimeout(() => {
                this.$router.push("/account/dashboard");
              }, 3000);
            } catch (e) {
              if (e.response.status == 400 || e.response.status == 422) {
                this.isDisabled = false;
                this.status = false;
                this.message = e.response.data.message;
                this.btnText = "Payment";
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
                  this.btnText = "Payment";
                }, 3000);
              }
            }
          } catch (e) {
            if (e.response.status == 400 || e.response.status == 422) {
              this.isDisabled = false;
              this.status = false;
              this.message = e.response.data.message;
              this.btnText = "Payment";
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
                this.btnText = "Payment";
              }, 3000);
            }
          }
        } else {
          (this.status = false), (this.message = "Something went wrong");
          this.isDisabled = false;
          this.interval = setTimeout(() => {
            this.status = null;
            this.btnText = "Payment";
          }, 3000);
        }
      } catch (e) {
        if (e.response.status == 400 || e.response.status == 422) {
          this.isDisabled = false;
          this.status = false;
          this.message = e.response.data.message;
          this.isDisabled = false;
          this.btnText = "Payment";
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        } else {
          this.status = false;
          this.message = "Connection problem, try checking your network";
          this.btnText = "Payment";
          this.isDisabled = false;
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        }
      }
    },
  },

  async mounted() {
    const billdata = JSON.parse(localStorage.getItem("sub"));

    this.phone = billdata.reciever;
    this.network_id = billdata.network;
    this.plan_id = billdata.plan_id;
    this.name = billdata.name;
    (this.network = billdata.networks),
      (this.amount = billdata.amount),
      (this.type = billdata.type);

    this.time = billdata.time;
    (this.start = billdata.start), (this.end = billdata.end);
    this.fr = billdata.fr;
    const data = JSON.parse(localStorage.getItem("user"));
    this.token = data.data.token;

    try {
      const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });
      this.usertype = user.data.data.type;
      this.bankName = user.data.data.bankname;
      this.accountName = user.data.data.accountName;
      this.accountNumber = user.data.data.bank;
      this.balance = user.data.data.balance;
    } catch (e) {
      e;
    }
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/getmanagement`
      );
      console.log(response);
      if (this.usertype == 1) {
        this.redam = this.amount - response.data.data.nairtime * 100;
        this.tfee = response.data.data.nairtime;
        this.cairtime = response.data.data.caitime;
        this.com = parseInt(this.amount * this.cairtime);
      } else if (this.usertype == 2) {
        this.redam = this.amount - response.data.data.mairtime * 100;
        this.tfee = response.data.data.mairtime;
        this.cairtime = response.data.data.caitime;
        this.com = parseInt(this.amount * this.cairtime);
      }
    } catch (e) {
      e.response;
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
