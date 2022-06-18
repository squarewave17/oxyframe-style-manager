<template>
  <div class="state-order-list-container">
    <h6>Full</h6>
    <draggable
      class="dragArea state-order-list"
      v-model="selectorStates"
      :sort="true"
      @end="updateCurrentClass()"
    >
      <div
        class="state-order-list-item"
        v-for="(element, index) in selectorStates"
        :key="index"
      >
        <p>{{ element }}</p>
        <IconUpDownSmall class="icon-s" />
      </div>
    </draggable>
  </div>
  <div class="state-order-list-container" v-if="media['page-width']">
    <h6>Page Width</h6>
    <draggable
      class="dragArea state-order-list"
      v-model="media['page-width']"
      :sort="true"
      @end="updateCurrentClass()"
    >
      <div
        class="state-order-list-item"
        v-for="(element, index) in media['page-width']"
        :key="index"
      >
        <p>{{ element }}</p>
        <IconUpDownSmall class="icon-s" />
      </div>
    </draggable>
  </div>
  <div class="state-order-list-container" v-if="media['tablet']">
    <h6>Tablet</h6>
    <draggable
      class="dragArea state-order-list"
      v-model="media['tablet']"
      :sort="true"
      @end="updateCurrentClass()"
    >
      <div
        class="state-order-list-item"
        v-for="(element, index) in media['tablet']"
        :key="index"
      >
        <p>{{ element }}</p>
        <IconUpDownSmall class="icon-s" />
      </div>
    </draggable>
  </div>
  <div class="state-order-list-container" v-if="media['phone-landscape']">
    <h6>Phone Landscape</h6>
    <draggable
      class="dragArea state-order-list"
      v-model="media['phone-landscape']"
      :sort="true"
      @end="updateCurrentClass()"
    >
      <div
        class="state-order-list-item"
        v-for="(element, index) in media['phone-landscape']"
        :key="index"
      >
        <p>{{ element }}</p>
        <IconUpDownSmall class="icon-s" />
      </div>
    </draggable>
  </div>
  <div class="state-order-list-container" v-if="media['phone-portrait']">
    <h6>Phone Portrait</h6>
    <draggable
      class="dragArea state-order-list"
      v-model="media['phone-portrait']"
      :sort="true"
      @end="updateCurrentClass()"
    >
      <div
        class="state-order-list-item"
        v-for="(element, index) in media['phone-portrait']"
        :key="index"
      >
        <p>{{ element }}</p>
        <IconUpDownSmall class="icon-s" />
      </div>
    </draggable>
  </div>
</template>
<script>
export default {
  components: {
    draggable: VueDraggableNext,
  },
}
</script>
<script setup>
import { ref, computed, watch } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { useSelectorStore } from '@/store/selectorStore'
import IconUpDownSmall from '@/components/icons/IconUpDownSmall.vue'
const selectorStore = useSelectorStore()

const selectorData = ref('')
const selectorStates = ref([])
const rawSelector = ref({})
const media = ref([])
const stateIndex = computed(() => {
  return selectorStore.currentClass
})
watch(
  stateIndex,
  (x) => {
    var sData = {}
    var sStates = {}
    var mediaStates = {}
    media.value = {}
    rawSelector.value = selectorStore.selectors[selectorStore.currentClass]
    for (var key in rawSelector.value) {
      if (
        key == 'key' ||
        key == 'parent' ||
        key == 'type' ||
        key == 'friendly_name' ||
        key == 'set_name'
      ) {
        sData[key] = rawSelector.value[key]
      } else if (key == 'media') {
        mediaStates = rawSelector.value[key]
      } else {
        sStates[key] = rawSelector.value[key]
      }
    }

    if (mediaStates['page-width']) {
      media.value['page-width'] = Object.keys(mediaStates['page-width'])
    }

    if (mediaStates['tablet']) {
      media.value['tablet'] = Object.keys(mediaStates['tablet'])
    }

    if (mediaStates['phone-landscape']) {
      media.value['phone-landscape'] = Object.keys(
        mediaStates['phone-landscape']
      )
    }

    if (mediaStates['phone-portrait']) {
      media.value['phone-portrait'] = Object.keys(mediaStates['phone-portrait'])
    }
    selectorData.value = sData
    selectorStates.value = Object.keys(sStates).reverse()
  },
  { immediate: true }
)
const updateCurrentClass = () => {
  let med = { media: {} }
  for (let key in media.value) {
    med.media[key] = medObjectify(media.value[key], key)
  }
  const data = JSON.parse(JSON.stringify(selectorStates.value))
  const stat = objectify(data.reverse())
  const dat = selectorData.value

  selectorStore.selectors[selectorStore.currentClass] = recombine(
    dat,
    stat,
    med
  )
}

const medObjectify = (array, key) => {
  return array.reduce((acc, curr) => {
    acc[curr] = rawSelector.value['media'][key][curr]
    return acc
  }, {})
}
const objectify = (array) => {
  return array.reduce((acc, curr) => {
    acc[curr] = rawSelector.value[curr]
    return acc
  }, {})
}
const recombine = (a, b, c) => {
  const obj3 = {}
  for (let key in a) {
    obj3[key] = a[key]
  }
  for (let key in b) {
    obj3[key] = b[key]
  }
  for (let key in c) {
    obj3[key] = c[key]
  }
  return obj3
}
</script>
<style scoped>
h6 {
  margin-bottom: var(--global-space-s);
}
p {
  margin: 0;
  line-height: 1;
  padding-left: var(--global-space-s);
}
.state-order-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid var(--color-global-border);
  border-radius: var(--radius-m);
  margin-bottom: var(--global-space-s);
  padding: var(--global-space-s);
  cursor: pointer;
}
</style>
