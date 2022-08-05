<template>
  <footer>
    <div class="container">
      <div class="copy-text" style="font-size: 0.9rem">&copy;Tapit 2022</div>

      <div class="copy-text">
        <a href="/privacy/privacy.html" style="color: #0a1aa8; font-size: 0.8rem"
          >Privarcy</a
        >
        <a href="/term/term.html" style="color: #0a1aa8; font-size: 0.8rem">
          Term & condition</a
        >
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "bottom-app",
};
</script>
<style scoped>
footer {
  max-width: 1519.2px;

  width: 100%;
  box-sizing: border-box;
  background: #fff !important;
  position: fixed;
  bottom: 0;
  z-index: -100;
}
.container {
  display: grid;
  justify-content: center;
}
.copy-text {
  text-align: center;
  color: blue;
}
</style>
