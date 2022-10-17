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
        <h2 class="hc-x">Transaction</h2>
        <main>
          <form @submit.prevent="handleSubmit">
            <!--- <div class="trnx-col">
                            <span class="fa fa-search" ></span>
                            <input type="search" placeholder="Search Transaction">
                            <input type="date">
                        </div>
                        -->
            <TabNav
              :tabs="['Transaction', 'Schedule']"
              :selected="selected"
              @selected="setSelected"
            >
              <Tab :isSelected="selected === 'Transaction'">
                <div
                  class="ech-transt-info-col"
                  v-if="transactions.length > 0"
                  style="min-height: 400px"
                >
                  <div
                    class="md-lb-info"
                    v-for="item in transactions"
                    :key="item.ref"
                    @click="
                      getEachTransaction(
                        item.ref,
                        item.status,
                        item.amount,
                        item.network,
                        item.updated_at,
                        item.reciever,
                        item.name,
                        item.user,
                        item.type,
                        item.commission,
                        item.plan,
                        item.eletoken
                      )
                    "
                  >
                    <img
                      src="../../assets/image/mtn-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-if="item.network == '1'"
                    />
                    <img
                      src="../../assets/image/glo-logo.jpg"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '4'"
                    />
                    <img
                      src="../../assets/image/airtel-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '2' || item.network == 'Airtel'"
                    />
                    <img
                      src="../../assets/image/etisalat-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '3'"
                    />
                    <img
                      src="../../assets/image/dstv.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == 'DStv'"
                    />
                    <img
                      src="../../assets/image/received.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 4 && item.network == userId"
                    />
                    <img
                      src="../../assets/image/delivered.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 4 && item.network != userId"
                    />
                    <span
                      v-else-if="item.type == 5"
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      <i
                        class="fa fa-lightbulb-o"
                        style="
                          color: black !important;
                          font-size: 1.7rem;
                          align-items: center;
                          display: flex;
                        "
                      ></i>
                    </span>

                    <img
                      src="../../assets/image/dstv.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 3 && item.network.includes('DStv')"
                    />
                    <img
                      src="../../assets/image/gotv.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 3 && item.network.includes('GOtv')"
                    />
                    <img
                      src="../../assets/image/showmax.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="
                        item.type == 3 &&
                        (item.network == 'Full - N2,900' ||
                          item.network == 'Mobile Only - N1,450' ||
                          item.network == 'Sports Full - N6,300' ||
                          item.network == 'Sports Mobile Only - N3,200')
                      "
                    />
                    <img
                      src="../../assets/image/received.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 8"
                    />
                    <img
                      src="../../assets/image/received.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 6"
                    />
                    <div class="right-inf-sid">
                      <div class="dwn-tpg">
                        <span v-if="item.plan != null && item.type == 8">Commission</span>
                        <span v-else-if="item.plan != null && item.type == 6"
                          >Wallet Fund</span
                        >
                        <span v-else-if="item.type == 4">{{ item.plan }}</span>
                        <span v-else-if="item.type == 5"
                          >{{ item.network }}{{ item.name }}</span
                        >
                        <span v-else>
                          <span v-if="item.name == 1 || item.name == 'MTN'"
                            >MTN {{ item.plan }}</span
                          >
                          <span v-else-if="item.name == 2 || item.name == 'AIRTEL'"
                            >Airtel {{ item.plan }}</span
                          >
                          <span v-else-if="item.name == 3 || item.name == '9mobile'"
                            >9mobile {{ item.plan }}</span
                          >
                          <span v-else-if="item.name == 4 || item.name == 'GLO'"
                            >GLO {{ item.plan }}</span
                          ></span
                        >
                        <span>&#8358;{{ Intl.NumberFormat().format(item.amount) }}</span>
                      </div>
                      <div class="dwn-tpg">
                        <span
                          v-if="
                            item.status == 1 &&
                            (item.type == '3' ||
                              item.type == '2' ||
                              item.type == '5' ||
                              item.type == 8 ||
                              item.type == 6 ||
                              item.type == 10 ||
                              (item.type == '1' && item.status == 1))
                          "
                          style="color: green"
                          >sucess</span
                        >
                        <span
                          v-else-if="
                            item.network != userId && item.type == '4' && item.status == 1
                          "
                          >sent</span
                        >
                        <span
                          v-else-if="
                            item.network == userId && item.type == '4' && item.status == 1
                          "
                          style="color: green"
                          >Recieved</span
                        >
                        <span v-else style="color: crimson">Failed</span>

                        <span>{{
                          moment(item.updated_at).format("DD-MM-YYYY hh:mm")
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  style="
                    text-align: center;
                    font-weight: 700;
                    font-size: 0.9rem;
                    margin-top: 30px;
                    min-height: 500px;
                  "
                >
                  No Transaction
                </div>
              </Tab>
              <Tab :isSelected="selected === 'Schedule'">
                <div class="ech-transt-info-col" v-if="schedules.length > 0">
                  <div
                    class="md-lb-info"
                    v-for="item in schedules"
                    :key="item.reference"
                    @click="
                      getEachSchedules(
                        item.ref,
                        item.status,
                        item.amount,
                        item.network,
                        item.updated_at,
                        item.reciever,
                        item.end,
                        item.start,
                        item.time,
                        item.fr,
                        item.plan
                      )
                    "
                  >
                    <img
                      src="../../assets/image/mtn-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-if="item.network == '1'"
                    />
                    <img
                      src="../../assets/image/glo-logo.jpg"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '4'"
                    />
                    <img
                      src="../../assets/image/airtel-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '2' || item.network == 'Airtel'"
                    />
                    <img
                      src="../../assets/image/etisalat-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '3'"
                    />
                    <img
                      src="../../assets/image/etisalat-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid grey;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == id"
                    />

                    <div class="right-inf-sid">
                      <div class="dwn-tpg">
                        <span v-if="item.network == 1 || item.name == 1">MTN</span>
                        <span v-else-if="item.network == 2 || item.name == 2"
                          >Airtel</span
                        >
                        <span v-else-if="item.network == 3 || item.name == 3"
                          >9mobile</span
                        >
                        <span v-else-if="item.network == 4 || item.name == 4">GLO</span>

                        <span>&#8358;{{ Intl.NumberFormat().format(item.amount) }}</span>
                      </div>
                      <div class="dwn-tpg">
                        <span
                          v-if="
                            item.status == 1 &&
                            item.network == '1' &&
                            item.network == '2' &&
                            item.network == '3' &&
                            item.network == '4'
                          "
                          >sent</span
                        >

                        <span>{{ moment(item.updated_at).format("DD-MM-YYYY") }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  style="
                    text-align: center;
                    font-weight: 700;
                    font-size: 0.9rem;
                    margin-top: 30px;
                    min-height: 700px;
                  "
                >
                  No Sechedules Transaction
                </div>
              </Tab>
            </TabNav>
          </form>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Header2 from "../../components/header.vue";
//import Message from '../../components/message.vue'
import axios from "axios";
import TabNav from "../../components/ccc.vue";
import Tab from "../../components/cc.vue";
import moment from "moment";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "Transaction-app",
  components: { Header2, TabNav, Tab, Loading },
  data() {
    return {
      id: "",
      password: "",
      status: null,
      message: "",
      btnText: "Sign In",
      isDisabled: false,
      selected: "Transaction",
      transactions: [],
      moment: moment,
      schedules: [],
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
      userId: "",
    };
  },
  methods: {
    setSelected(tab) {
      this.selected = tab;
    },
    getEachTransaction(
      ref,
      status,
      amount,
      network,
      date,
      reciever,
      name,
      user,
      type,
      commission,
      plan,
      token
    ) {
      const data = {
        ref: ref,
        status: status,
        amount: amount,
        network: network,
        date: date,
        receiver: reciever,
        name: name,
        user: user,
        type: type,
        commission: commission,
        plan: plan,
        token: token,
      };
      localStorage.setItem("data", JSON.stringify(data));

      this.$router.push(`/user/transaction-details/${ref}`);
    },
    getEachSchedules(
      ref,
      status,
      amount,
      network,
      date,
      reciever,
      end,
      start,
      time,
      fr,
      plan
    ) {
      const datas = {
        ref: ref,
        status: status,
        amount: amount,
        network: network,
        date: date,
        receiver: reciever,
        end: end,
        start: start,
        time: time,
        occurence: fr,
        plan: plan,
      };
      localStorage.setItem("datas", JSON.stringify(datas));
      this.$router.push(`/user/schedules-details`);
    },
  },
  async mounted() {
    const data = JSON.parse(localStorage.getItem("user"));
    this.token = data.data.token;
    this.userId = data.data.data.id;

    try {
      const transaction = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/gettransaction`,
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      );
      this.transactions = transaction.data.data.reverse();
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/panel/login");
        localStorage.removeItem("user");
      }
    }
    try {
      const schedule = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/getscheadule`,
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      );
      this.schedules = schedule.data.data.reverse();
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/panel/login");
        localStorage.removeItem("user");
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
  max-width: 450px;
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
.trnx-col {
  display: flex;
  justify-content: space-between;
  border: 1px solid #0a1aa8;
  padding: 5px;
  border-radius: 10px;
}
.fa-search {
  font-size: 1rem;
  margin-top: 10px;
  margin-right: 10px;
}
input[type="date"] {
  width: 40px;
  background: #0a1aa8;
  color: #fff !important;
  height: 40px;
}
input[type="search"] {
  border: none;
  height: 40px !important;
}
.ech-transt-info-col {
  background: #fff;

  margin-top: 20px;
}
.md-lb-info {
  padding: 10px;

  height: 45px;
  justify-content: space-between;
  display: flex;
}
.right-inf-sid {
  width: 100%;
  display: grid;
}
.dwn-tpg {
  display: flex;
  justify-content: space-between;

  box-sizing: border-box;
}
.dwn-tpg span {
  color: #000;
  font-weight: 800;
  font-size: 0.8rem;
}
@media screen and (max-width: 499px) {
  .fa-search {
    margin-top: 18px !important;
  }
}
</style>
