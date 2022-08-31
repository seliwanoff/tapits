<template>
  <div class="container">
    <header>
      <nav>
        <div class="left-side-con">
          <div class="hidden-icon onhover-show">
            <span class="fa fa-bars hiddenicon" @click="closeDrop"></span>
          </div>

          <div class="image-home">
            <router-link to="/" class="router">
              <img src="../assets/image/logo.png" alt="" />
              <h3>TAPIT</h3>
            </router-link>
          </div>

          <div
            class="hidden-icon onhover-show"
            style="justify-content: space-between; float: left"
          >
            <div class="pic-nl" v-if="image != null" style="margin-top: -7px !important">
              <img :src="url + image" alt="" class="img" />
            </div>
            <div class="pic-nl" v-else>
              {{ fn }}
            </div>
          </div>
        </div>
        <div class="right-side-con">
          <div class="main-head-nav">
            <div class="left-main-icon">
              <i class="fa fa-bars" @click="closeDrop"></i>
            </div>
            <div class="right-main-icon">
              <div class="pic-nl" v-if="image != null">
                <img :src="url + image" alt="" class="img" />
              </div>
              <div class="pic-nl" v-else>
                {{ fn }}
              </div>
              <span class="grtuser">Hi,{{ username }}</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <Sidebar :hideme="showDrop" />
  </div>
</template>
<script>
import Sidebar from "../components/sidebar.vue";
import axios from "axios";
export default {
  name: "Header-App",
  components: {
    Sidebar,
  },
  data() {
    return {
      showDrop: true,
      username: "",
      letdrops: true,
      fn: "",
      image: null,
      url: "https://api.tapit.ng/public/storage/images/",
    };
  },
  props: {
    getme: Function,
  },

  methods: {
    closeDrop() {
      this.showDrop = !this.showDrop;
      this.$emit("letdrop", true);
    },
  },
  async mounted() {
    console.log(screen.width + "px");
    if (screen.width <= 600) {
      this.showDrop = false;
    } else {
      this.showDrop = true;
    }
    const data = JSON.parse(localStorage.getItem("user"));
    this.username = data.data.data.username;
    this.token = data.data.token;
    try {
      const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`, {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      });

      this.username = user.data.data.username;
      this.fn = user.data.data.username.charAt(0);
      this.image = user.data.data.image;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
<style>
.container {
  max-width: 1519.2px;
  margin: 0px auto;
}
header {
  width: 100% !important;
  position: fixed;
  background: #fff;
  box-shadow: 0px 2px 30px 2px rgb(0 0 0 / 10%);
  height: 70px;
  z-index: 100000;
}
nav {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.left-side-con {
  width: 250px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 100%;
  padding: 10px;
}
.right-side-con {
  background: #0a1aa8;
  height: 100%;
  width: calc(100% - 260px);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.hidden-icon {
  display: none;
  padding: 10px;
}
.image-home img {
  width: 36px;
  float: left;
}
.image-home {
  width: 100%;
  animation: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s normal forwards 1 fadein;
  vertical-align: middle;
}
h3 {
  float: left;

  animation: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s normal forwards 1 fadein;
  vertical-align: middle;
  font-size: 1.51rem;
  margin: 6px;
}
.main-head-nav {
  padding: 10px;

  width: 100%;
  display: flex;
  justify-content: space-between;
}
.left-main-icon {
  place-items: center;
  align-content: center;
  padding: 10px;
}
.right-main-icon {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
i {
  font-size: 1.3rem;
  color: #fff !important;
}
.grtuser {
  color: #fff;
  font-weight: 800;
  margin-right: 20px;
  font-size: 0.8rem;
}
@media screen and (max-width: 490px) {
  .left-side-con {
    width: 100%;

    display: flex;
    justify-content: space-between;
  }
  .right-side-con {
    display: none;
  }
  .image-home {
    width: 100%;
    justify-content: center;
    display: flex;
  }
  .hidden-icon {
    display: inline;

    padding: 10px;
  }
}

.hiddenicon {
  font-size: 1.3rem;
  margin: 10px;
}
.fa {
  cursor: pointer;
}
.pic-nl {
  height: 40px;
  width: 40px;
  border-radius: 100%;
  border: 1px solid #ccc;
  margin-top: -10px;
  margin-right: 10px;
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
}
.img {
  height: 40px;
  width: 40px;
  border-radius: 100%;
}
@media screen and (max-width: 755px) {
  .pic-nl {
    color: #000 !important;
  }
}
</style>
