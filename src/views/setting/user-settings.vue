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
        <div class="tab-banner">
          <TabNav
            :tabs="['Personal', 'Upgrade', 'Manage']"
            :selected="selected"
            @selected="setSelected"
          >
            <Tab :isSelected="selected === 'Personal'">
              <main>
                <h2 class="hc-x">Personal Information</h2>

                <form @submit.prevent="handleSubmit">
                  <div class="ml-xf tcg-lf">
                    <label for="email"> Username</label>
                    <strong>{{ username }}</strong>
                  </div>

                  <div class="ml-xf tcg-lf">
                    <label for="fname">First Name</label>
                    <strong>{{ fname }}</strong>
                  </div>
                  <div class="ml-xf tcg-lf">
                    <label for="lname ">Last Name</label>
                    <strong>{{ lname }}</strong>
                  </div>
                  <div class="ml-xf tcg-lf">
                    <label for="email">Email</label>
                    <strong>{{ email }}</strong>
                  </div>
                  <div class="ml-xf tcg-lf">
                    <label for="number">Phone Number</label>
                    <strong>{{ phone }}</strong>
                  </div>
                  <div class="ml-xf tcg-lf">
                    <label for="number">Account Type</label>
                    <strong v-if="type == 1">Normal </strong>
                    <strong v-if="type == 2">Merchant </strong>
                  </div>

                  <div>
                    <router-link to="/setting/edit-profile">
                      <button style="max-width: 200px; margin-top: 20px; cursor: pointer">
                        Edit
                      </button>
                    </router-link>
                  </div>
                </form>
              </main>
            </Tab>
            <Tab :isSelected="selected === 'Upgrade'">
              <h2 class="hc-x">Upgrade Account</h2>

              <Message :status="status" :message="message" />
              <main v-if="usertype == 1">
                <Message :status="status" :message="message" />
                <form @submit.prevent="upgradeAccount">
                  <!--<div class="ml-xf">
                        <label for="email">BVN(Bank Verification Number)</label> <br>
                         <input type="id" placeholder="Enter your BVN" v-model="id" required>
                    </div>
                    
                     <div class="ml-xf">
                        <label for="number">Date of Birth</label>
                         <input type="date" placeholder="Select your date of Birth" v-model="birth" required>
                    </div>
                    -->
                  <div class="ml-xf">
                    <strong>Note:</strong>
                    <span style="font-size: 0.9rem">
                      Before you are eligible to upgrade your accountto merchant. You have
                      to have atleast &#8358;1,000 in your wallet
                    </span>
                  </div>
                  <div class="ml-xf">
                    <button :disabled="isDisabled" style="margin-top: 10px !important">
                      {{ btnText }}
                    </button>
                  </div>
                </form>
              </main>
              <main v-else>
                <h5 style="text-align: center; font-size: 0.8rem">
                  You are already a merchant
                </h5>
              </main>
            </Tab>
            <Tab :isSelected="selected === 'Manage'">
              <h2 class="hc-x">Password</h2>
              <main>
                <Message :status="status" :message="message" />
                <form @submit.prevent="handlePassword">
                  <div class="ml-xf">
                    <label for="email">Password</label> <br />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      v-model="dpassword"
                      required
                      autocomplete=""
                    />
                  </div>

                  <div class="ml-xf">
                    <label for="number">New Password</label>
                    <input
                      type="password"
                      placeholder="Set a New Password"
                      v-model="npassword"
                      required
                      autocomplete=""
                    />
                  </div>
                  <div class="ml-xf">
                    <label for="number">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm Your New password"
                      v-model="cnpassword"
                      required
                      autocomplete=""
                    />
                  </div>
                  <div class="ml-xf">
                    <button :disabled="isDisabled" style="margin-top: 10px !important">
                      {{ btnPass }}
                    </button>
                  </div>
                </form>
              </main>
            </Tab>
          </TabNav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header2 from "../../components/header.vue";
import Message from "../../components/message.vue";
import TabNav from "../../components/tabnav.vue";
import Tab from "../../components/tab.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import axios from "axios";
export default {
  name: "Settings-app",
  components: { Header2, Message, TabNav, Tab, Loading },
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
      btnText: "Upgrade",
      btnPass: "Update Password",
      dpassword: "",
      npassword: "",
      cnpassword: "",
      token: "",
      isDisabled: false,
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
      type: "",
      balance: "",
      usertype: "",
    };
  },

  async mounted() {
    const data = JSON.parse(localStorage.getItem("user"));
    this.lname = data.data.data.lname;
    this.fname = data.data.data.fname;
    this.username = data.data.data.username;
    this.email = data.data.data.email;
    this.phone = data.data.data.phone;
    this.token = data.data.token;
    this.type = data.data.data.type;

    try {
      const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });

      this.balance = user.data.data.balance;
      this.usertype = user.data.data.type;
      this.isLoading = false;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/panel/login");
        localStorage.removeItem("user");
      }
    }
  },
  methods: {
    setSelected(tab) {
      this.selected = tab;
    },
    async upgradeAccount() {
      if (this.usertype == 1) {
        this.isDisabled = true;
        this.btnText = "Loading";

        if (this.balance >= "1000") {
          const datas = JSON.parse(localStorage.getItem("user"));
          this.token = datas.data.token;
          const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          };
          const data = {
            m: "web",
          };
          try {
            const response = await axios.post(
              `${process.env.VUE_APP_BASE_URL}api/updatemerachant`,
              data,
              {
                headers: headers,
              }
            );

            this.status = true;
            this.message = response.data.message;
            this.btnText = "Upgrade";
            this.interval = setTimeout(() => {
              this.status = null;
              this.$router.go();
            }, 3000);
          } catch (e) {
            if (e.response.status == 400 || e.response.status == 422) {
              this.isDisabled = false;
              this.status = false;
              this.message = e.response.data.message;
              this.btnPass = "Sign In";
              this.isDisabled = false;
              this.interval = setTimeout(() => {
                this.status = null;
              }, 3000);
            } else if (e.response.status === 401) {
              if (e.response.status === 401) {
                this.$router.push("/panel/login");
                localStorage.removeItem("user");
              }
            }
          }
        } else {
          this.status = false;
          this.message = "You balance is low to upgrade your account";
          this.interval = setTimeout(() => {
            this.status = null;
            this.isDisabled = false;
          }, 3000);
        }
      } else {
        this.status = false;
        this.message = "You already a merchant";
        this.interval = setTimeout(() => {
          this.status = null;
        }, 3000);
      }
    },
    async handlePassword() {
      this.isDisabled = true;
      this.btnPass = "Loading";
      if (this.npassword.length >= 6) {
        if (this.npassword == this.cnpassword) {
          const data = {
            password: this.dpassword,
            newpassword: this.npassword,
          };
          try {
            const response = await axios.post(
              `${process.env.VUE_APP_BASE_URL}api/updatepassword`,
              data,
              {
                headers: {
                  Authorization: "Bearer " + this.token,
                },
              }
            );

            this.status = true;
            this.message = response.data.message;
            this.npassword = "";
            this.dpassword = "";
            this.cnpassword = "";
            this.btnPass = "Update Password";
            this.interval = setTimeout(() => {
              this.status = null;
            }, 3000);
          } catch (e) {
            if (e.response.status == 400 || e.response.status == 422) {
              this.isDisabled = false;
              this.status = false;
              this.message = e.response.data.message;
              this.btnPass = "Sign In";
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
          this.status = false;
          this.message = "Password does not match ";
          this.setTimeout = setTimeout(() => {
            this.status = null;
          }, 3000);
        }
      } else {
        this.status = false;
        this.message = "Password must be atleast six ";
        this.setTimeout = setTimeout(() => {
          this.status = null;
        }, 3000);
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
  max-width: 700px;
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
</style>
