<template>
  <div class="spinnerLoading" v-if="isVisible">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
  </div>
</template>
<script>
import { EventBus } from "../event-bus.js";

export default {
  name: "SpinnerComponent",
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    showSpinner: function() {
      this.isVisible = true;
    },
    hideSpinner: function() {
      this.isVisible = false;
    }
  },
  created: function() {
    EventBus.$on("showSpinner", this.showSpinner);
    EventBus.$on("hideSpinner", this.hideSpinner);
  }
};
</script>

<style>
.spinnerLoading {
  position: absolute;
  margin-top: 120px;
  margin-left: 25%; 
  margin-right: 50%; 
  width: 170px;
  height: 180px;
  text-align: center;
  font-size: 10px;
  z-index: 2;
}

.spinnerLoading > div {
  background-color: teal;
  height: 100%;
  width: 17px;
  display: inline-block;

  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}

.spinnerLoading .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinnerLoading .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.spinnerLoading .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinnerLoading .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>