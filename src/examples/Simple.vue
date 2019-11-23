<template>
  <div>
    <div class="visible-items">
      {{ visibleItems.join(', ') }}
    </div>
    <ScrollContainer
      class="container"
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
            @visible="onVisible(item, index, $event)"
            @invisible="onInvisible(item, index, $event)"
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

export default {
  components: { ScrollContainer, Scrollable },

  data () {
    return {
      items: ['apple', 'orange', 'banana', 'watermelon'],
      visibleItems: []
    }
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
  margin: 0 auto;
  display: block;
  border: 4px solid black;
  width: 400px;
  height: 200px;
  overflow-y: scroll;
}

.container ul {
  padding: 0;
  list-style: none;
}

.container li {
  height: 90px;
  margin: 20px;
}

.container .item {
  border: 4px solid red;
  box-sizing: border-box;
}
</style>
