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

  childrenVisibility: {},

  mounted () {
    if (this.root) {
      events.forEach(event => window.addEventListener(event, this.emitChildrenVisibility, false))
    } else {
      this.$el.onscroll = this.emitChildrenVisibility
    }

    if (this.initialEvent) {
      this.emitChildrenVisibility()
    } else {
      // Store initial visibility of children
      this.children.forEach(c => {
        this.$options.childrenVisibility[c.$options._scrollableId] = this.isVisible(c)
      })
    }
  },

  beforeDestroy () {
    if (this.root) {
      events.forEach(event => window.removeEventListener(event, this.emitChildrenVisibility, false))
    }
    this.$el.onscroll = undefined
  },

  methods: {
    emitChildrenVisibility (e) {
      this.children.forEach(c => this.emitChildVisibility(c, e))
    },

    emitChildVisibility (child, parentEvent) {
      const visible = this.root ? this.isInViewport(child) : this.isVisible(child)
      const childId = child.$options._scrollableId

      if (visible !== this.$options.childrenVisibility[childId]) {
        this.$options.childrenVisibility[childId] = visible
        child.emitVisibility(visible, parentEvent)
      }
    },

    // Adapted from https://stackoverflow.com/a/24768959
    isInViewport (child) {
      const rect = child.$el.getBoundingClientRect()

      const scrollTop = document.body.scrollTop
      const scrollLeft = document.body.scrollLeft
      const scrollBottom = scrollTop + document.documentElement.clientHeight
      const scrollRight = scrollTop + document.documentElement.clientWidth
      const containerTop = this.$el.clientTop
      const containerLeft = this.$el.clientLeft
      const containerBottom = containerTop + this.$el.clientHeight
      const containerRight = containerLeft + this.$el.clientWidth
      const visibleTop = containerTop < scrollTop ? scrollTop : containerTop
      const visibleBottom = containerBottom > scrollBottom ? scrollBottom : containerBottom
      const visibleLeft = containerLeft < scrollLeft ? scrollLeft : containerLeft
      const visibleRight = containerRight > scrollRight ? scrollRight : containerRight

      return (rect.bottom > visibleTop && rect.top < visibleBottom) &&
        (rect.right > visibleLeft && rect.left < visibleRight)
    },

    isVisible (child) {
      const rect = child.$el.getBoundingClientRect()
      const containerRect = this.$el.getBoundingClientRect()
      const topOffset = child.$el.clientTop
      const leftOffset = child.$el.clientLeft
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
