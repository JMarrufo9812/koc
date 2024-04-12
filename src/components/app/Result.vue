<template>
  <div style="height: 100vh">
    <div class="flex justify-between font1-5em text-light">
      <p> Derecho: 0005415651565 </p>
      <p> Pit: 5 </p>
    </div>
    <div>
      <span class="font1-5em text-light"> Juan manuel nombre del piloto </span>
    </div>
    <div class="flex justify-center my-20">
      <img 
        src="https://images.unsplash.com/photo-1573746943513-2f77b829a3b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="race-image"
      />
    </div>
    <div class="my-30 text-uppercase text-center font1-5em text-light text-bold">
      Negar: acceso a pista
    </div>
    <div class="flex align-center flex-wrap">
      <div class="flex-grow-1">
        <Stop :w="30" :h="30"/>
      </div>
      <div class="flex-grow-2 text-right font1-5em text-light">
        <p>Acceso previo: hace dos minutos</p>
        <p>03/Dic/23 4:57 p.m.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Stop from '@/assets/icons/Stop.vue'

</script>

<style>
.race-image{
  max-width: 100%;
  height: auto;
  max-height: 60vh
}
</style>
