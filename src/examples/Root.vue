<template>
  <div>
    <div class="visible-items">
      {{ visibleItemsList }}
    </div>
    <ScrollContainer
      class="container"
      :root="true"
      :initial-event="true"
    >
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
.container {
  width: 170%;
}

.container ul {
  padding: 0;
  list-style: none;
  text-align: left;
}

.container li {
  height: 50vh;
  width: 50vh;
  margin: 20px;
  display: inline-block;
}

.container .item {
  border: 4px solid red;
  box-sizing: border-box;
}
</style>
