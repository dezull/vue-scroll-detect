<template>
  <div class="scrollable">
    <slot />
  </div>
</template>

<script>
let _scrollableId = 0

function findParent (component) {
  if (component.$options.name === 'ScrollContainer') {
    return component
  } else if (!component.$parent) {
    return null
  } else {
    return findParent(component.$parent)
  }
}

export default {
  _scrollableId: null,

  created () {
    this.$options._scrollableId = ++_scrollableId
  },

  mounted () {
    const parent = findParent(this.$parent)
    if (!parent) throw new Error('Parent ScrollContainer not found')
    parent.$data.children.push(this)
  },

  beforeDestroy () {
    const parent = findParent(this.$parent)
    delete parent.$data.children[parent.$data.children.indexOf(this)]
  },

  methods: {
    emitVisibility (visible, parentEvent) {
      visible ? this.$emit('visible', parentEvent) : this.$emit('invisible', parentEvent)
    }
  }
}
</script>

<style>
.scrollable {
  height: 100%;
}
</style>
