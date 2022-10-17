<template>
  <div>
    <div style="max-height: 800px">
      <router-view></router-view>
    </div>
    <Footer v-if="$route.path != '/'" />
  </div>
</template>

<script>
import Footer from "./components/bottom.vue";
export default {
  name: "app",
  components: {
    Footer,
  },
  data: function () {
    return {
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      logoutTimer: null,
    };
  },
  mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetTimer);
    }, this);
    this.setTimers();
  },
  methods: {
    setTimers: function () {
      this.logoutTimer = setTimeout(this.logoutUser, 1200000);
    },
    logoutUser: function () {
      localStorage.removeItem("user");
      localStorage.removeItem("sub");
      localStorage.removeItem("bill");
      this.$router.push("/panel/login");
    },
    resetTimer: function () {
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
  },
  async beforeCreate() {
    const user = localStorage.getItem("user");

    if (user == null && this.$route.path != "/") {
      this.$router.push("/panel/login");
    }
  },
};
</script>
<style>
* {
  text-decoration: none;
  padding: 0px;
  margin: 0px;
  color: #464855;
  font-weight: 500;
}
body {
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.45;
}
h3 {
  font: size 1.51rem;
}
body {
  background-color: #f4f5fa;
}
</style>
