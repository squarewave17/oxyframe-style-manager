<template>
  <div class="selector-info panel">
    <div>
      <h5>Selector Info</h5>
      <p>Class Name: <span>class</span></p>
      <p>Instances: <span>10</span></p>
      <p>Page: <span>Home</span></p>
      <p>Component type: <span>Div</span></p>
      <p>Component Name: <span>nice Name</span></p>
      <p>In Code Block: <span>True</span></p>
    </div>
    <div class="selector-nav">
      <IconBack class="icon" />
      1/28
      <IconForward class="icon" />
    </div>
  </div>
</template>
<script setup>
import IconForward from '@/components/icons/IconForward'
import IconBack from '@/components/icons/IconBack'
</script>
<style scoped>
.selector-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--global-space-m);
}
.selector-info p {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.selector-info h5 {
  padding: var(--global-space-s) 0 var(--global-space-m) 0;
}
.selector-info button {
  margin: var(--global-space-m) 0;
}
.selector-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
