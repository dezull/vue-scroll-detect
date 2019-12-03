<template>
  <div>
    <slot />
  </div>
</template>

<script>
const events = ['DOMContentLoaded', 'load', 'scroll', 'resize']
export default {
  name: 'ScrollContainer',

  props: {
    root: {
      type: Boolean,
      default: () => false
    },

    initialEvent: {
      type: Boolean,
      default: () => false
    }
  },

  data () {
    return {
      children: []
    }
  },

  created () {
    this._childrenVisibility = {}
  },

  mounted () {
    if (this.root) {
      events.forEach(e => window.addEventListener(e, this.emitChildrenVisibility, false))
    } else {
      this.$el.onscroll = this.emitChildrenVisibility
    }

    if (this.initialEvent) {
      this.emitChildrenVisibility()
    } else {
      // Store initial visibility of children
      this.children.forEach(c => {
        this._childrenVisibility[c._scrollableId] = this.isInContainer(c)
      })
    }
  },

  beforeDestroy () {
    if (this.root) {
      events.forEach(e => window.removeEventListener(e, this.emitChildrenVisibility, false))
    }
    this.$el.onscroll = undefined
  },

  methods: {
    emitChildrenVisibility (e) {
      this.children.forEach(c => this.emitChildVisibility(c, e))
    },

    emitChildVisibility (child, parentEvent) {
      const visible = this.isVisible(child)
      const childId = child._scrollableId

      if (visible !== this._childrenVisibility[childId]) {
        this._childrenVisibility[childId] = visible
        child.emitVisibility(visible, parentEvent)
      }
    },

    isVisible (vm) {
      return this.root ? this.isInViewport(vm) : this.isInContainer(vm)
    },

    // Adapted from https://stackoverflow.com/a/24768959
    isInViewport (vm) {
      const rect = vm.$el.getBoundingClientRect()
      const containerRect = this.$el.getBoundingClientRect()
      const scrollTop = document.body.scrollTop
      const scrollLeft = document.body.scrollLeft
      const scrollBottom = scrollTop + document.documentElement.clientHeight
      const scrollRight = scrollLeft + document.documentElement.clientWidth
      const visibleTop = containerRect.top < scrollTop ? scrollTop : containerRect.top
      const visibleBottom = containerRect.bottom > scrollBottom ? scrollBottom : containerRect.bottom
      const visibleLeft = containerRect.left < scrollLeft ? scrollLeft : containerRect.left
      const visibleRight = containerRect.right > scrollRight ? scrollRight : containerRect.right

      return (rect.bottom > visibleTop && rect.top < visibleBottom) &&
        (rect.right > visibleLeft && rect.left < visibleRight)
    },

    isInContainer (vm) {
      const rect = vm.$el.getBoundingClientRect()
      const containerRect = this.$el.getBoundingClientRect()
      const topOffset = vm.$el.clientTop
      const leftOffset = vm.$el.clientLeft
      const containerTop = containerRect.top + topOffset
      const containerBottom = containerRect.bottom - topOffset
      const containerLeft = containerRect.left + leftOffset
      const containerRight = containerRect.right - leftOffset

      return (rect.bottom > containerTop && rect.top < containerBottom) &&
        (rect.right > containerLeft && rect.left < containerRight)
    }
  }
}
</script>
