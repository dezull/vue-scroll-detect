<template>
  <div>
    <ScrollContainer
      class="scroll-container"
      :root="true"
      :options="options"
      :initial-event="true"
    >
      <div class="popup">
        {{ visibleItemsList }}
      </div>
      <ul>
        <li
          v-for="(item, index) in items"
          ref="items"
          :key="'item' + index"
        >
          <Scrollable
            class="item"
            @visible="onVisible(item, $event)"
            @invisible="onInvisible(item, $event)"
          >
            {{ item }}
          </Scrollable>
        </li>
      </ul>
    </ScrollContainer>
  </div>
</template>

<script>
import ScrollContainer from '../components/ScrollContainer.vue'
import Scrollable from '../components/Scrollable.vue'

const letters = []
for (let i = 0; i < 26; i++) letters.push(String.fromCharCode(i + 65))

export default {
  components: { ScrollContainer, Scrollable },

  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      items: letters,
      visibleItems: []
    }
  },

  computed: {
    visibleItemsList () { return [...this.visibleItems].sort().join(', ') }
  },

  methods: {
    onVisible (item, e) {
      if (!this.visibleItems.includes(item)) this.visibleItems.push(item)
    },

    onInvisible (item, e) {
      const index = this.visibleItems.indexOf(item)
      if (index !== -1) this.visibleItems.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.scroll-container {
  width: 170%;
}

.scroll-container li {
  height: 50vh;
  width: 50vh;
  margin: 20px;
  display: inline-block;
}

.scroll-container .item {
  border: 4px solid red;
  box-sizing: border-box;
}
</style>
