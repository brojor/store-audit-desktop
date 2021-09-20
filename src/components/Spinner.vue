<template>
  <div class="spinner">
    <div class="pulse pulse1 spinner-delay1"></div>
    <div class="pulse pulse2 spinner-delay2"></div>
    <div class="pulse pulse3 spinner-delay3"></div>
  </div>
</template>

<script>
export default {
  name: 'PulseLoader',
};
</script>

<style>
.spinner {
  margin-top: 2px;
}
.pulse {
  background-color: #444;
  width: 10px;
  height: 10px;
  margin: 3px;
  border-radius: 100%;
  display: inline-block;
  animation-name: 'pulseStretchDelay';
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(.2,.68,.18,1.08);
  animation-fill-mode: both;
}
.spinner-delay1 {
  animation-delay: 0.12s;
}
.spinner-delay2 {
  animation-delay: 0.24s;
  background-color: #e60001;
}
.spinner-delay3 {
  background-color: #ffc2c2;
  animation-delay: 0.36s;
}
@-webkit-keyframes pulseStretchDelay {
  0%,
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    -webkit-opacity: 0.7;
    opacity: 0.7;
  }
}

@keyframes pulseStretchDelay {
  0%,
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    -webkit-opacity: 0.7;
    opacity: 0.7;
  }
}
</style>
