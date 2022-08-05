<template>
  <div>
    <Header2 />

    <div class="rg-c">
      <div class="gc-x">
        <h2 class="hc-x">Signup & enjoy Tap</h2>
        <main>
          <Message :status="status" :message="message" />

          <form @submit.prevent="handleSubmit">
            <div class="xl-f">
              <div class="inp-xl">
                <label for="firstname">First name</label>
                <input
                  type="text"
                  placeholder="Your First name"
                  v-model="fname"
                  required
                />
              </div>
              <div class="inp-xl">
                <label for="lastname">Last name</label>
                <input
                  type="text"
                  placeholder="Your Last name"
                  class="rm-bl"
                  v-model="lname"
                  required
                />
              </div>
            </div>
            <div class="ml-xf">
              <label for="email">Email</label> <br />
              <input
                type="email"
                placeholder="Enter your email"
                v-model="email"
                required
              />
              <span style="color: crimson">{{ erroremail }}</span>
            </div>
            <div class="ml-xf">
              <label for="username">Username</label>
              <input
                type="username"
                placeholder="Enter your Username"
                v-model="username"
                required
              />
              <span style="color: crimson">{{ erroruser }}</span>
            </div>

            <div class="ml-xf">
              <label for="number">Phone number</label>
              <input type="number" placeholder="081********" v-model="phone" required />
              <span style="color: crimson">{{ errorphone }}</span>
            </div>
            <div class="ml-xf">
              <label for="number">Password</label>
              <input
                type="password"
                placeholder="**********"
                v-model="password"
                required
                autocomplete=""
              />
            </div>
            <div class="ml-xf">
              <button :disabled="checkButton" style="margin-top: 10px !important">
                {{ btnText }}
              </button>
            </div>
            <div class="ml-xf xdir" style="margin-top: 20px">
              <router-link to="/panel/login" class="vdir">
                Already have an account?Login</router-link
              >
            </div>
          </form>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Header2 from "../../components/header2.vue";
import Message from "../../components/message.vue";
import axios from "axios";
export default {
  name: "Register-app",
  components: { Header2, Message },
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      username: "",
      phone: "",
      password: "",
      rusername: "",
      message: "",
      status: null,
      checkButton: false,
      btnText: "Create your account",
      errorphone: "",
      erroremail: "",
      erroruser: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.checkButton = true;
      if (this.password.length >= 6) {
        if (this.phone.toString().length == 10) {
          const data = {
            fname: this.fname,
            lname: this.lname,
            email: this.email,
            username: this.username,
            phone: "234" + this.phone, //.slice(1),
            password: this.password,
            rusername: "",
            m: "web",
          };

          this.btnText = "Loading...";
          try {
            const response = await axios.post(
              `${process.env.VUE_APP_BASE_URL}api/auth/register`,
              data
            );

            localStorage.setItem("data", JSON.stringify(data));
            const datas = {
              phone: "234" + this.phone,
            };

            await axios.post(
              `${process.env.VUE_APP_BASE_URL}api/auth/verifyphone`,
              datas
            );
            this.status = true;
            this.message =
              response.data.message +
              ". A code has been sent to your number for verification.";
            this.interval = setTimeout(() => {
              this.status = null;
              this.$router.push("/panel/verify");
            }, 3000);
          } catch (e) {
            if (e.response.status == 400 || e.response.status == 422) {
              this.checkButton = false;
              this.status = false;
              this.message = "Email or Username has been choosen";
              this.btnText = "Create your account";
              this.interval = setTimeout(() => {
                this.status = null;
              }, 3000);
            } else {
              this.checkButton = false;
              this.status = false;
              this.message = "Connection problem, try checking your network";
              this.interval = setTimeout(() => {
                this.status = null;
              }, 3000);
            }
          }
        } else {
          this.status = false;
          this.message = "Invalid Number";
          this.interval = setTimeout(() => {
            (this.status = null), (this.checkButton = false);
          }, 3000);
        }
      } else {
        this.status = false;
        this.message = "Password should be atleast 6 longer ";
        this.interval = setTimeout(() => {
          (this.status = null), (this.checkButton = false);
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
  max-width: 400px;
  width: 100%;
  margin: 100px auto;
  background: #fff;
  box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
  padding: 10px;
  border-radius: 15px;
}
@media screen and (max-width: 490px) {
  .rg-c .gc-x {
    margin-top: 30px;
    width: 100%;
    margin-top: 90px;
    box-sizing: border-box;
    border-radius: 20px;
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
  padding-top: 0px !important;
  padding-bottom: 0px !important;
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
  padding-top: 0px !important;
  width: 100%;
  padding: 10px;
  padding-bottom: 0px !important;
}
.xdir,
.vdir {
  font-size: 0.9rem;
}
</style>
