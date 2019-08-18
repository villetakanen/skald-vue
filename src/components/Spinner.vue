<template>
    <div class="spinner">
         <img class="monster" src="../assets/noun_Monster_693509.svg"/>
         <img class="monster" src="../assets/noun_Monster_57335.svg"/>
         <img class="monster" src="../assets/noun_Cat_37446.svg"/>
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
    width: 384px;
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
img.monster{
  max-height: 128px;
  max-width: 128px;
  opacity: 0.23;
}
</style>
