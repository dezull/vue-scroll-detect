<template>
  <div>
    <slot />
    <!-- only used for length unit conversion -->
    <span
      ref="calc"
      style="display: none"
    />
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
    },

    enterOffset: {
      type: String,
      default: () => '0px'
    },

    exitOffset: {
      type: String,
      default: () => '0px'
    }
  },

  data () {
    return {
      children: []
    }
  },

  computed: {
    enterOffsetPx () { return this.toPx(this.enterOffset) },
    exitOffsetPx () { return this.toPx(this.exitOffset) }
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
        this.updateChildData(c._scrollableId, { wasVisible: this.isVisible(c) })
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
    // Data. wasVisible, lastScrollTop, lastScrollLeft
    updateChildData (childId, data = {}) {
      this._childrenVisibility[childId] = this._childrenVisibility[childId] || {}
      this._childrenVisibility[childId] = { ...this._childrenVisibility[childId], ...data }
    },

    getChildData (childId, key) {
      const data = this._childrenVisibility[childId]
      return data ? data[key] : null
    },

    emitChildrenVisibility (e) {
      this.children.forEach(c => this.emitChildVisibility(c, e))
    },

    emitChildVisibility (child, parentEvent) {
      const childId = child._scrollableId
      const wasVisible = this.getChildData(childId, 'wasVisible')
      const visible = this.isVisible(child)

      if (visible !== wasVisible) {
        this.updateChildData(childId, { wasVisible: visible })
        child.emitVisibility(visible, parentEvent)
      }
    },

    isVisible (vm) {
      const rect = vm.$el.getBoundingClientRect()
      const lastScrollTop = this.getChildData(vm._scrollableId, 'lastScrollTop') || rect.top
      const lastScrollLeft = this.getChildData(vm._scrollableId, 'lastScrollLeft') || rect.left
      this.updateChildData(vm._scrollableId, { lastScrollTop: rect.top, lastScrollLeft: rect.left })

      let direction
      if (rect.left === lastScrollLeft && rect.top !== lastScrollTop) {
        direction = rect.top > lastScrollTop ? 'top' : 'down'
      } else if (rect.left !== lastScrollLeft && rect.top === lastScrollTop) {
        direction = rect.left > lastScrollLeft ? 'left' : 'right'
      }

      const offsetRect = direction ? this.offsetRect(rect, direction) : rect

      return this.root ? this.isInViewport(vm, offsetRect) : this.isInContainer(vm, offsetRect)
    },

    // Adapted from https://stackoverflow.com/a/24768959
    isInViewport (vm, { top, right, bottom, left }) {
      const containerRect = this.$el.getBoundingClientRect()
      const scrollTop = document.body.scrollTop
      const scrollLeft = document.body.scrollLeft
      const scrollBottom = scrollTop + document.documentElement.clientHeight
      const scrollRight = scrollLeft + document.documentElement.clientWidth
      const visibleTop = containerRect.top < scrollTop ? scrollTop : containerRect.top
      const visibleBottom = containerRect.bottom > scrollBottom ? scrollBottom : containerRect.bottom
      const visibleLeft = containerRect.left < scrollLeft ? scrollLeft : containerRect.left
      const visibleRight = containerRect.right > scrollRight ? scrollRight : containerRect.right

      return (bottom > visibleTop && top < visibleBottom) &&
        (right > visibleLeft && left < visibleRight)
    },

    isInContainer (vm, { top, right, bottom, left }) {
      const containerRect = this.$el.getBoundingClientRect()
      const topOffset = vm.$el.clientTop
      const leftOffset = vm.$el.clientLeft
      const containerTop = containerRect.top + topOffset
      const containerBottom = containerRect.bottom - topOffset
      const containerLeft = containerRect.left + leftOffset
      const containerRight = containerRect.right - leftOffset

      return (bottom > containerTop && top < containerBottom) &&
        (right > containerLeft && left < containerRight)
    },

    offsetRect (rect, direction) {
      const topOrLeft = direction === 'top' || direction === 'left'
      const startOffset = topOrLeft ? -this.exitOffsetPx : this.enterOffsetPx
      const endOffset = topOrLeft ? -this.enterOffsetPx : this.exitOffsetPx

      return {
        top: rect.top - startOffset,
        bottom: rect.bottom - endOffset,
        left: rect.left - startOffset,
        right: rect.right - endOffset
      }
    },

    toPx (length) {
      this.$refs.calc.style.marginTop = length
      return parseInt(window.getComputedStyle(this.$refs.calc).marginTop)
    }
  }
}
</script>
