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
        <h2 class="hc-x">Bill Payment</h2>
        <main>
          <Message :status="status" :message="message" />

          <form @submit.prevent="handleSubmit">
            <div class="ml-xf">
              <label for="provider">Service Provider</label>
              <select v-model="service" @blur="getVariation()">
                <option
                  :value="{ ename: item.name, service: item.serviceID }"
                  v-for="item in servicesIDs"
                  :key="item.name"
                >
                  <img :src="item.image" alt="" />
                  <input type="hidden" v-model="item.service" />
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="ml-xf">
              <label for="Payment Plan">Payment Plan</label> <br />
              <select v-model="variation_code" placeholder="Choose a Payment method">
                <option
                  :value="item.variation_code"
                  v-for="item in variations"
                  :key="item.variation_code"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="ml-xf">
              <label for="meter">Meter Number</label> <br />
              <input
                type="number"
                placeholder="123456789"
                v-model="billerCode"
                required
                @keyup="verifyNumber"
                step="any"
              />
            </div>
            <span
              style="
                color: crimson;
                font-weight: 800;
                font-size: 1rem;
                text-align: center;
                padding-left: 20px;
              "
              v-show="showwarn"
              >Please choose a provider first</span
            >

            <div class="ml-xf">
              <label for="Name">Name </label> <br />
              <input
                type="name"
                placeholder="123456789"
                v-model="name"
                required
                disabled
              />
            </div>
            <div class="ml-xf">
              <label for="meter">Address</label> <br />
              <input
                type="name"
                placeholder="123456789"
                v-model="address"
                required
                disabled
              />
            </div>
            <div class="ml-xf">
              <label for="meter">Amount</label> <br />
              <input
                type="number"
                placeholder="0.00"
                v-model="amount"
                required
                step="any"
              />
            </div>

            <div class="ml-xf">
              <button
                :disabled="isDisabled"
                :class="isDisabled ? 'disableClass' : 'activeClass'"
              >
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
import Header from "../../components/header.vue";
import Message from "../../components/message.vue";
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "Bill-app",
  components: { Header, Message, Loading },
  data() {
    return {
      phone: "",
      password: "",
      status: null,
      message: "",
      btnText: "Continue",
      isDisabled: true,
      receiver: "",
      plan: "",
      balance: "",
      servicesIDs: [],
      service: "",
      variation_code: "",
      billerCode: "",
      amount: "",
      name: "",
      variations: [],
      address: "",
      fullname: "",
      username: "",
      id: "",
      token: "",
      showwarn: true,
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
    };
  },
  methods: {
    async getVariation() {
      const datas = JSON.parse(localStorage.getItem("user"));
      this.token = datas.data.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      };
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/getcableorbillplan?serviceid=` +
            this.service.service,
          {
            headers: headers,
          }
        );

        this.variations = response.data.content.varations;
        this.showwarn = false;
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/panel/login");
        }
      }
    },
    async verifyNumber() {
      const datas = JSON.parse(localStorage.getItem("user"));
      this.token = datas.data.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      };
      const data = {
        serviceID: this.service.service,
        billersCode: this.billerCode,
        type: this.variation_code,
      };

      try {
        const verify = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/getmearchant`,
          data,
          {
            headers: headers,
          }
        );

        if (verify.data.content.Customer_Name) {
          this.name = verify.data.content.Customer_Name;
          this.address = verify.data.content.Address;
          this.isDisabled = false;
        } else {
          this.name = verify.data.content.error;
          this.address = verify.data.content.error;
          this.isDisabled = true;
        }
      } catch (e) {
        this.isDisabled = true;
      }
    },
    async handleSubmit() {
      if (parseInt(this.amount) <= parseInt(this.balance)) {
        if (this.amount >= 500) {
          const data = {
            serviceID: this.service.service,
            billersCode: this.billerCode,
            variation_code: this.variation_code,
            amount: this.amount,
            phone: this.phone,
            service: this.service,
            metername: this.name,
            ename: this.service.ename,
            type: 5,
          };

          localStorage.setItem("bill", JSON.stringify(data));
          (this.status = true), (this.message = "Transaction generated successfully");
          this.setTimeout = setTimeout(() => {
            this.$router.replace("/makepayment/payment");
          }, 3000);
        } else {
          (this.status = false), (this.message = "Minimum meter token is 500");
          this.interval = setInterval(() => {
            this.status = null;
          }, 3000);
        }
      } else {
        (this.status = false),
          (this.message = "The balance is lower than transaction limit.");
        this.interval = setInterval(() => {
          this.status = null;
        }, 3000);
      }
    },
  },
  async mounted() {
    try {
      const getService = await axios.get(
        "https://vtpass.com/api/services?identifier=electricity-bill"
      );

      this.servicesIDs = getService.data.content;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/panel/login");
      }
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

      this.balance = user.data.data.balance;
      this.phone = user.data.data.phone;
      this.fullname = user.data.data.fname + " " + user.data.data.lname;
      this.username = user.data.data.username;
      this.id = user.data.data.id;
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
.disableClass {
  background: #ccc !important;
  border: 1px solid #ccc;
}
.activeClass {
  background: #0a1aa8 !important;
  border: 1px solid #0a1aa8;
}

option {
  padding: 10px;
}
img {
  width: 40px;
  height: 40px;
}
</style>
