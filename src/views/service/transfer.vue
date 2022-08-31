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
        <h2 class="hc-x">Transfer</h2>
        <main>
          <Message :status="status" :message="message" />

          <form @submit.prevent="handleSubmit">
            <div class="ml-xf">
              <label for="email">Phone Number</label> <br />
              <input
                type="number"
                placeholder="08132112841"
                v-model="phone"
                required
                @keyup="getUser"
                @keypress="checkAll"
              />
            </div>
            <div class="ml-xf">
              <label for="email">Receiver Name</label> <br />
              <input type="id" placeholder="name" v-model="receiver" disabled />
            </div>
            <div class="ml-xf">
              <label for="email">Amount</label> <br />
              <input type="number" placeholder="0.00" v-model="amount" required />
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import axios from "axios";
import moment from "moment";
export default {
  name: "Transfer-app",
  components: { Header, Message, Loading },
  data() {
    return {
      phone: "",
      password: "",
      amount: "",
      status: null,
      message: "",
      btnText: "Transfer",
      isDisabled: true,
      receiver: "",
      plan: "",
      balance: "",
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
      username: "",
      id: "",
    };
  },
  methods: {
    async handleSubmit() {
      if (parseInt(this.amount) <= parseInt(this.balance)) {
        const current = new Date();
        this.btnText = "Loading";
        //const datas  = JSON.parse(localStorage.getItem('user'));

        const data = {
          reciever: "234" + this.phone, //.slice(1),
          type: 4,
          status: 1,
          ref: moment(current).format("YYYYMMDDHHm"),
          amount: this.amount,
          plan: this.receiver,
          name: this.username,
          network: this.id,
        };
        localStorage.setItem("transfer", JSON.stringify(data));

        (this.status = true), (this.message = "Transaction generated successfully");
        this.setTimeout = setTimeout(() => {
          this.$router.replace("/makepayment/sendmoney");
        }, 3000);
      } else {
        (this.status = false),
          (this.message = "The balance is lower than transaction limit.");
        this.interval = setInterval(() => {
          this.status = null;
        }, 3000);
      }
    },
    async getUser() {
      const data = JSON.parse(localStorage.getItem("user"));
      this.token = data.data.token;
      try {
        const resp = await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/getuser?phone=${"234" + this.phone}`,
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );

        this.receiver = resp.data.data.fname + " " + resp.data.data.lname;
        this.id = resp.data.data.id;

        if (this.receiver != null) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      } catch (e) {
        this.receiver = NaN;
        if (e.response.status === 401) {
          this.$router.push("/panel/login");
        }
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
      this.username = user.data.data.username;
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
</style>
