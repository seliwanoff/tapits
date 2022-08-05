<template>
  <transition name="slide">
    <div :class="showme ? 'container' : 'secondContainer'">
      <div class="col-xl">
        <div class="bal-col cl-tr bl-ct" :class="showme ? '' : 'top'">
          <div class="bal-con" v-if="dragout == true" @click="slideme">
            <div class="hl-depo">
              <div class="main-bal-col">
                <span class="bal-tp" style="display: grid"
                  >Your Tap Balance

                  <span style="font-size: 0.6rem; color: #fff"
                    >(Tap to see your commission)</span
                  ></span
                >

                <span class="bal-tp" style="font-weight: bold"
                  >&#8358;{{ Intl.NumberFormat().format(balance) }}</span
                >
              </div>
              <div>
                <router-link to="/fund/deposit">
                  <button>Fund<span class="fa fa-paper-plane"></span></button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="bal-con" v-if="dragout == false" @click="slideme">
            <div class="hl-depo">
              <div class="main-bal-col">
                <span class="bal-tp">Your Tap Commission</span> <br />
                <span class="bal-tp" style="font-weight: bold"
                  >&#8358;{{ Intl.NumberFormat().format(commission) }}
                </span>
              </div>
              <div>
                <button @click.self="withdrawFund">Withdraw</button>
              </div>
            </div>
          </div>

          <div class="mlc-dcd">
            <div class="shw-lft-col">
              <div class="item-col">
                <div class="service-col">
                  <div class="ech-ser">
                    <router-link to="/service/transfer">
                      <div class="icon-ch">
                        <span class="fa fa-exchange"></span>
                      </div>
                      <div class="text-ch">Transfer</div>
                    </router-link>
                    <h4></h4>
                  </div>

                  <div class="ech-ser">
                    <router-link to="/service/single-airtime">
                      <div class="icon-ch">
                        <span class="fa fa-phone"></span>
                      </div>
                      <div class="text-ch">Buy Airtime</div>
                    </router-link>
                    <h4></h4>
                  </div>
                  <div class="ech-ser">
                    <router-link to="/service/single-data">
                      <div class="icon-ch">
                        <span class="fa fa-wifi"></span>
                      </div>
                      <div class="text-ch">Buy Data</div>
                    </router-link>
                    <h4></h4>
                  </div>
                </div>
                <div class="service-col">
                  <div class="ech-ser">
                    <router-link to="/service/cable">
                      <div class="icon-ch">
                        <span class="fa fa-tv"></span>
                      </div>
                      <div class="text-ch">Cable & Tv</div>
                    </router-link>
                    <h4></h4>
                  </div>
                  <div class="ech-ser">
                    <router-link to="/service/bill">
                      <div class="icon-ch">
                        <span class="fa fa-phone"></span>
                      </div>
                      <div class="text-ch">Bill Payment</div>
                    </router-link>
                    <h4></h4>
                  </div>
                  <div class="ech-ser">
                    <router-link to="/user/refer">
                      <div class="icon-ch">
                        <span class="fa fa-sack-dollar"></span>
                      </div>
                      <div class="text-ch">Refer and Earn</div>
                    </router-link>
                    <h4></h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bal-col trc-cl kt-lv tcx-l" :class="showme ? '' : 'top'">
          <div class="recent-transac" style="min-height: 100px; margin-bottom: 40px">
            <div style="float: left; margin-top: 20px">
              <h2 style="color: #fff">Recent Transaction</h2>
              <p class="txt-p">Your recent transaction are enlisted here.</p>
            </div>
            <div style="float: right; margin-top: 20px">
              <router-link to="/user/transaction">
                <button style="height: 30px; min-width: 90px">View all</button>
              </router-link>
            </div>
          </div>
          <div class="table-co">
            <TabNav
              :tabs="['Transaction', 'Schedule']"
              :selected="selected"
              @selected="setSelected"
            >
              <Tab :isSelected="selected === 'Transaction'">
                <div
                  class="ech-transt-info-col"
                  v-if="transactions.length > 0"
                  style="min-height: 300px"
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
                        item.type
                      )
                    "
                  >
                    <img
                      src="../assets/image/mtn-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-if="item.network == '1'"
                    />
                    <img
                      src="../assets/image/glo-logo.jpg"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '4'"
                    />
                    <img
                      src="../assets/image/airtel-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '2' || item.network == 'Airtel'"
                    />
                    <img
                      src="../assets/image/etisalat-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '3'"
                    />
                    <img
                      src="../assets/image/dstv.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == 'DStv'"
                    />
                    <img
                      src="../assets/image/received.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 4 && item.network != item.user"
                    />
                    <img
                      src="../assets/image/delivered.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 4 && item.network == item.user"
                    />
                    <img
                      src="../assets/image/aedc.jpg"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="
                        item.type == 5 &&
                        item.network == 'Abuja Electricity Distribution Company- AEDC'
                      "
                    />
                    <img
                      src="../assets/image/kedc.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="
                        item.type == 5 &&
                        (item.network == 'Eko Electricity' ||
                          item.network == 'Eko Electric Payment - EKEDC')
                      "
                    />
                    <img
                      src="../assets/image/ikedc.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="
                        item.type == 5 && item.network == 'Ikeja Electric Payment - IKEDC'
                      "
                    />
                    <img
                      src="../assets/image/kedc.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="
                        item.type == 5 && item.network == 'KEDCO - Kano Electric'
                      "
                    />
                    <img
                      src="../assets/image/phed.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="
                        item.type == 5 && item.network == 'PHED - Port Harcourt Electric'
                      "
                    />
                    <img
                      src="../assets/image/jed.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 5 && item.network == 'Jos Electric - JED'"
                    />
                    <img
                      src="../assets/image/kaedc.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="
                        item.type == 5 && item.network == 'Kaduna Electric - KAEDCO'
                      "
                    />
                    <img
                      src="../assets/image/ibedc.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="
                        item.type == 5 &&
                        item.network == 'IBEDC - Ibadan Electricity Distribution Company'
                      "
                    />
                    <img
                      src="../assets/image/dstv.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 3 && item.network.includes('DStv')"
                    />
                    <img
                      src="../assets/image/gotv.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 3 && item.network.includes('GOtv')"
                    />
                    <img
                      src="../assets/image/showmax.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
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
                      src="../assets/image/received.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.type == 8"
                    />
                    <img
                      src="../assets/image/received.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
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
                        <span v-else>{{ item.name }}</span>
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
                              (item.type == '1' && item.status == 1))
                          "
                          style="color: green"
                          >success</span
                        >

                        <span
                          v-else-if="
                            item.network != item.user &&
                            item.type == '4' &&
                            item.status == 1
                          "
                          style="color: green"
                          >Deliverd</span
                        >
                        <span
                          v-else-if="
                            item.network == item.user &&
                            item.type == '4' &&
                            item.status == 1
                          "
                          style="color: green"
                          >Recieved</span
                        >
                        <span v-else style="color: crimson">Failed</span>

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
                      src="../assets/image/mtn-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-if="item.network == '1'"
                    />
                    <img
                      src="../assets/image/glo-logo.jpg"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '4'"
                    />
                    <img
                      src="../assets/image/airtel-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '2' || item.network == 'Airtel'"
                    />
                    <img
                      src="../assets/image/etisalat-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == '3'"
                    />
                    <img
                      src="../assets/image/etisalat-data.png"
                      alt=""
                      style="
                        width: 40px;
                        height: 40px;
                        border: 1px solid black;
                        margin-right: 20px;
                        border-radius: 100%;
                      "
                      v-else-if="item.network == id"
                    />

                    <div class="right-inf-sid">
                      <div class="dwn-tpg">
                        <span v-if="item.network == 1">MTN</span>
                        <span v-else-if="item.network == 2">Airtel</span>
                        <span v-else-if="item.network == 3">9mobile</span>
                        <span v-else-if="item.network == 4">GLO</span>

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
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import TabNav from "../components/ccc.vue";
import Tab from "../components/cc.vue";
import moment from "moment";

export default {
  name: "Balance2-app",
  components: { TabNav, Tab },
  data() {
    return {
      transactions: [],
      moment: moment,
      schedules: [],
      selected: "Transaction",
      dragout: true,
      date: "",
    };
  },

  props: ["balance", "showme", "commission"],
  methods: {
    slideme() {
      this.dragout = !this.dragout;
    },
    clickmeCheck() {
      alert("me");
    },
    setSelected(tab) {
      this.selected = tab;
    },
    getEachTransaction(ref, status, amount, network, date, reciever, name, user, type) {
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
    async withdrawFund() {
      const data = JSON.parse(localStorage.getItem("user"));
      this.token = data.data.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token,
      };
      const datas = {
        id: 1,
      };
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/withdrawcommission`,
          datas,
          {
            headers: headers,
          }
        );

        if (response.data.Status == "true") {
          alert("Withdraw commission successful");
        } else {
          alert("Something Went wrong");
        }
      } catch (e) {
        if (e.response.status >= 400) {
          alert("Something Went Wrong");
        }
      }
    },
  },
  async mounted() {
    const data = JSON.parse(localStorage.getItem("user"));
    this.token = data.data.token;
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
      e;
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
      e;
    }
  },
};
</script>
<style scoped>
.container {
  float: right;
  padding: 10px;
  min-width: calc(100% - 286px);
  margin-top: 50px;
}
.secondContainer {
  padding: 10px;
  padding: 10px;
}
.col-xl {
  display: flex;
  justify-content: space-between;
}
.bal-col {
  float: left;

  padding: 10px;
  width: 50%;
}
.cl-tr {
  min-width: 40%;
}
.trc-cl {
  min-width: 35%;
}
.bal-con {
  background: #0a1aa8;
  padding: 10px;
  border: 1px solid #0a1aa8;
  border-radius: 10px;
  margin-top: 30px;
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 40px;
}
.bl-ct {
  width: 65%;
}
.item-col {
  font-size: 1.2rem;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
}
.hl-depo {
  height: 60px;
  margin: 10px;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.bal-tp {
  font-size: 1rem;
  color: #ccc;
}
button {
  padding: 5px;
  outline: none;
  color: #0a1aa8;
  font-weight: 600;
}
.fa-paper-plane {
  color: #0a1aa8 !important;
}
.service-col {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
}
.ech-ser {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  min-height: 70px;
  width: 100%;
  margin: 5px;
}
.icon-ch {
  align-content: center;
  display: flex;

  place-content: center;
  padding: 10px;
  line-height: 2;
}
.text-ch {
  font-size: 0.9rem;
  text-align: center;
  margin-top: 5px;
}
@media screen and (max-width: 490px) {
  .xl-plc {
    display: none;
  }
  .shw-lft-col {
    width: 100%;
  }
  .text-ch {
    font-size: 0.7rem;
  }
}
.recent-transac {
  margin-top: 30px;
  font-size: 1.2rem;
  background: #0a1aa8;
  color: #fff !important;
  padding: 10px;
  border-radius: 10px !important;
  justify-content: space-between;
  display: flex;
}
.recent-transac h2 {
  font-size: 1rem;
}
.table-co {
  overflow-y: auto;
  overflow-x: auto;
  padding: 10px;
  background: #fff;
  box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
  max-height: 500px;
  border-radius: 10px;
}

table {
  background: #fff;
  font-size: 1rem;
  width: 100%;
  box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
}
tr td {
  border-bottom: 1px solid #ccc;
  font-size: 1rem;
}
.hf-tb {
  background: #ddd;
  padding: 5px;
  font-size: 1rem;
}
.mg-tbP {
  padding: 10px;
}
@media screen and (max-width: 1100px) {
  .col-xl {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .bl-ct,
  .kt-lv {
    width: 100%;
    box-sizing: border-box;
  }
}
@media screen and (max-width: 755px) {
  .col-xl {
    display: block;
  }
  .bl-ct,
  .kt-lv {
    width: 100%;
    box-sizing: border-box;
  }
  .tcx-l {
    margin-top: -20px !important;
  }
  .table-co {
    max-height: 700px;
  }
}
.txt-p {
  color: #fff;
  font-size: 0.8rem;
}
.table-co::-webkit-scrollbar {
  width: 5px;
}
.top {
  margin-top: 50px;
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
a {
  max-width: 100px !important;
}
.slide-enter-active {
  transition: all 0.3s ease-out;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
.slide-leave-active {
  transition: all 0.3s ease-out;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translate(20px);
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>
