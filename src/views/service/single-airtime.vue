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
        <h2 class="hc-x">Buy Airtime</h2>
        <main>
          <Message :status="status" :message="message" />

          <form @submit.prevent="handleSubmit">
            <div class="ml-xf">
              <label for="email">Network</label> <br />
              <select name="" id="" placeholder="Chosse Network" v-model="network">
                <option :value="{ networkid: '1', networkname: 'MTN' }">MTN</option>
                <option :value="{ networkid: '2', networkname: 'AIRTEL' }">Airtel</option>
                <option :value="{ networkid: '3', networkname: '9MOBILE' }">
                  9mobile
                </option>
                <option :value="{ networkid: '4', networkname: 'GLO' }">Glo</option>
              </select>
            </div>
            <div class="ml-xf">
              <label for="email">Phone Number</label> <br />
              <input
                type="number"
                placeholder="08132112841"
                v-model="phone"
                required
                maxlength="11"
              />
            </div>
            <div class="ml-xf">
              <label for="email">Amount</label> <br />
              <input type="number" placeholder="0.00" v-model="amount" required />
            </div>
            <div class="scd-cl">
              <div class="h4cl">
                <h4>Schedule recharge</h4>
              </div>
              <div class="h4cl">
                <span class="fa fa-angle-down" @click="showSchedule"></span>
              </div>
            </div>
            <transition name="fade">
              <div class="dt-cal" v-show="showsce">
                <div class="scd-cl">
                  <div class="h4cl">
                    <label for="start-date">Start Date</label>
                    <input type="date" v-model="start" />
                  </div>
                  <div class="h4cl">
                    <label for="start-date">End Date</label>
                    <input type="date" v-model="end" />
                  </div>
                </div>
                <div class="scd-cl">
                  <div class="h4cl">
                    <label for="start-date">Time</label>
                    <input type="time" v-model="time" />
                  </div>
                  <div class="h4cl">
                    <label for="start-date">Occurence</label>
                    <select name="" id="" v-model="occurence">
                      <option value="Every Day">Every Day</option>
                      <option value="Every 7 Days">Every 7 Days</option>
                      <option value="Every 30 Days">Every 30 Days</option>
                    </select>
                  </div>
                </div>
              </div>
            </transition>
            <div class="ml-xf">
              <button :disabled="isDisabled">{{ btnText }}</button>
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
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "Singleairtime -app",
  components: { Header2, Message, Loading },
  data() {
    return {
      id: "",
      password: "",
      status: null,
      message: "",
      btnText: "Continue",
      isDisabled: false,
      showsce: false,
      amount: "",
      network: "",
      phone: "",
      occurence: "",
      time: "",
      start: "",
      end: "",
      token: "",
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
    };
  },
  methods: {
    showSchedule() {
      this.showsce = !this.showsce;
    },
    async handleSubmit() {
      this.btnText = "Loading";
      if (this.amount <= this.balance) {
        if (this.amount >= 50) {
          if (this.phone.toString().length == 10) {
            if (this.occurence && this.start && this.end && this.time) {
              const data = {
                network: this.network.networkid,
                plan: "",
                reciever: "0" + this.phone,
                type: 1,
                amount: this.amount,
                status: 1,
                time: this.time,
                start: new Date(this.start).getTime() / 1000,
                end: new Date(this.end).getTime() / 1000,
                fr: this.occurence,
                networks: this.network.networkname,
              };
              localStorage.setItem("sub", JSON.stringify(data));
              (this.status = true), (this.message = "Transaction generated successfully");
              this.setTimeout = setTimeout(() => {
                this.$router.replace("/makepayment/paymentwithschedule");
              }, 3000);

              /*try{
                const response = await axios.post(`${process.env.VUE_APP_BASE_URL}api/scheadule`,data,{
                  headers:{
                    Authorization: "Bearer "+ this.token
                  }
                })
                console.log(response)
              }catch(e){
                  if (e.response.status === 401) {
        this.$router.push("/panel/login");
      }
              }*/
            } else {
              const data = {
                network_id: this.network.networkid,
                plan_id: "",
                phone: "0" + this.phone,
                type: 1,
                amount: this.amount,
                network: this.network.networkname,
              };
              localStorage.setItem("sub", JSON.stringify(data));

              (this.status = true), (this.message = "Transaction generated successfully");
              this.setTimeout = setTimeout(() => {
                this.$router.replace("/makepayment/payment3");
              }, 3000);
            }
          } else {
            this.status = false;
            this.message = "Invalid Phone Number";
            this.setTimeout = setTimeout(() => {
              this.status = null;
              this.isDisabled = false;
            }, 3000);
          }
        } else {
          this.status = false;
          this.message = "Minimum amount is 50";
          this.setTimeout = setTimeout(() => {
            this.status = null;
            this.isDisabled = false;
            this.btnText = "Continue";
          }, 3000);
        }
      } else {
        this.status = false;
        this.message = "Insufficient balance for this transaction";
        this.setTimeout = setTimeout(() => {
          this.status = null;
          this.isDisabled = false;
          this.btnText = "Continue";
        }, 3000);
      }
    },
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

      this.balance = user.data.data.balance;
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
    width: 100%;
    margin: 0px;
    box-sizing: border-box;
    border-radius: 20px;
    margin-top: 90px;
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
input,
select {
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
}
.xdir,
.vdir {
  font-size: 0.9rem;
}
.scd-cl {
  display: flex;
  justify-content: space-between;
}
.h4cl {
  font-weight: 800;
  font-size: 1rem;
  color: #000 !important;
  padding: 10px;
}
.h4cl h4 {
  color: #000 !important;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
