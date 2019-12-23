<template>
  <div>
    <ScrollContainer
      class="scroll-container"
      v-bind="options"
      :initial-event="true"
    >
      <div class="popup">
        {{ visibleItems.join(', ') }}
      </div>
      <ul class>
        <li
          v-for="(item, index) in items"
          ref="items"
          :key="index"
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
.scroll-container {
  margin: 0 auto;
  display: block;
  border: 4px solid black;
  width: 400px;
  overflow-x: scroll;
  height: auto;
}

.scroll-container ul {
  width: 820px;
}

.scroll-container li {
  height: 90px;
  width: 180px;
  margin: 20px 10px;
  display: inline-block;
}

.scroll-container li:first-child {
  margin-left: 20px;
}

.scroll-container li:last-child {
  margin-right: 20px;
}

.scroll-container .item {
  border: 4px solid red;
  box-sizing: border-box;
}
</style>
