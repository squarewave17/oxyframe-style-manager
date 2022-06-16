<template>
  <div class="notification" :class="globalStore.saved ? '' : 'hide'">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
      <path
        d="M10.6 16.6 17.65 9.55 16.25 8.15 10.6 13.8 7.75 10.95 6.35 12.35ZM12 22Q9.925 22 8.1 21.212Q6.275 20.425 4.925 19.075Q3.575 17.725 2.788 15.9Q2 14.075 2 12Q2 9.925 2.788 8.1Q3.575 6.275 4.925 4.925Q6.275 3.575 8.1 2.787Q9.925 2 12 2Q14.075 2 15.9 2.787Q17.725 3.575 19.075 4.925Q20.425 6.275 21.212 8.1Q22 9.925 22 12Q22 14.075 21.212 15.9Q20.425 17.725 19.075 19.075Q17.725 20.425 15.9 21.212Q14.075 22 12 22ZM12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12ZM12 20Q15.325 20 17.663 17.663Q20 15.325 20 12Q20 8.675 17.663 6.337Q15.325 4 12 4Q8.675 4 6.338 6.337Q4 8.675 4 12Q4 15.325 6.338 17.663Q8.675 20 12 20Z"
      />
    </svg>
    <h4>Settings saved</h4>
  </div>
</template>
<script setup>
/**
 * import
 */
import { useGlobalStore } from '@/store/globalStore'
/**
 * store
 */
const globalStore = useGlobalStore()
</script>
<style scoped>
svg {
  fill: var(--color-text);
  margin-right: var(--global-space-xs);
}
.notification {
  color: var(--color-text);
  background: var(--color-background);
  font-family: nunito;
  font-weight: 300;
  box-shadow: var(--global-shadow);
  border-radius: var(--radius-m);
  padding: 50px;
  min-width: 200px;
  position: absolute;
  right: 50px;
  bottom: 50px;
  display: flex;
  align-items: center;
  opacity: 1;
  transition: all 1s;
  z-index: 1000;
}

.notification.hide {
  opacity: 0;
  transform: translateX(310px);
}
</style>
