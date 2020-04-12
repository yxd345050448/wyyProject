<template>
  <div class="v-title">
    <h1>{{title}}</h1>
  </div>
</template>
<script>
export default {
  props: ["title"],
  data() {
    return {

    };
  },
  methods: {},
  components: {}
};
</script>
<style lang='less'>
.v-title {
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  h1 {
    width: 100vw;
    text-align: center;
    font-size: 0.5rem;
    background: #c20c0c;
    color: #fff;
    padding: 0.1rem;
  }
}
</style>