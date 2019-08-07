<template>
    <div class="spinner">
        <img class="spinner_image" src="../assets/spiral-7.svg"/>
        <div class="stext">{{text}}</div>
    </div>
</template>
<script>
export default {
  props: ['text']
}
</script>

<style>
div.spinner{
    text-align: center;
    height: 128px;
    width: 128px;
    position: relative;
    text-align: center;
}
img.spinner_image{
  opacity: 0.42;
  -webkit-animation: rotation 7s infinite linear;
  height: 128px;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
div.stext {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  text-transform: uppercase;
  font-weight: 300;
}
</style>
