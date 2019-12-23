<template>
  <div>
    <div class="examples">
      <div class="example-container">
        <ScrollContainer
          class="scroll-container"
          :root="true"
          v-bind="options"
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
      <div class="example-container popup-container">
        <Simple :options="options" />
        <Horizontal :options="options" />
        <Simple :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
import ScrollContainer from '../components/ScrollContainer.vue'
import Scrollable from '../components/Scrollable.vue'
import Simple from '../examples/Simple.vue'
import Horizontal from '../examples/Horizontal.vue'

const letters = []
for (let i = 0; i < 26; i++) letters.push(String.fromCharCode(i + 65))

export default {
  components: { ScrollContainer, Scrollable, Simple, Horizontal },

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
.examples {
  text-align: center;
  vertical-align: top;
}

.example-container {
  display: inline-block;
  vertical-align: top;
}

.example-container > div {
  margin: 0 10px 20px;
}

.scroll-container li {
  margin: 20px;
}

.scroll-container .item {
  width: 400px;
  height: 90px;
  border: 4px solid red;
  box-sizing: border-box;
}
</style>
