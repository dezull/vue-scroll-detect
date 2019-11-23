<template>
  <div>
    <slot />
  </div>
</template>

<script>
// FIXME test this component!
const events = ['DOMContentLoaded', 'load', 'scroll', 'resize']
const instances = {}

function addInstance (vm) {
  instances[vm._uid] = { vm: vm, visible: false }
}

function removeInstance (vm) {
  delete instances[vm._uid]
}

function eventHandler (e) {
  for (const id in instances) {
    const instance = instances[id]
    const vm = instance.vm

    if (isElementInViewport(vm.$el)) {
      if (!instance.visible) vm.$emit('visible', true)
      instance.visible = true
    } else {
      if (instance.visible) vm.$emit('visible', false)
      instance.visible = false
    }
  }
}

function emitVisibility (vm) {
  const instance = instances[vm._uid]
  if (isElementInViewport(vm.$el)) {
    if (!instance.visible) {
      instance.visible = true
      vm.$emit('visible', true)
    }
  } else {
    if (instances.visible) {
      instance.visible = false
      vm.$emit('visible', false)
    }
  }
}

function isElementInViewport (el) {
  var rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function attachEventListener () {
  events.forEach(event => window.addEventListener(event, eventHandler, false))
}

function removeEventListener () {
  events.forEach(event => window.removeEventListener(event, eventHandler, false))
}

export default {
  mounted () {
    if (!instances.length) attachEventListener()
    addInstance(this)
    emitVisibility(this)
  },

  beforeDestroy () {
    removeInstance(this)
    if (!instances.length) removeEventListener()
  }
}
</script>
