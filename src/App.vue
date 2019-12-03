<template>
  <div id="app">
    <div class="nav">
      <h1>Vue Scroll Detect</h1>
      <a
        v-for="(example, index) in examples"
        :key="'title' + index"
        :href="index !== active && '#'"
        :class="index === active && 'active'"
        @click="showExample(example)"
      >
        {{ example }}
      </a>
    </div>
    <component :is="activeExample" />
  </div>
</template>

<script>
import Simple from './examples/Simple.vue'
import Horizontal from './examples/Horizontal.vue'
import Root from './examples/Root.vue'
import Nested from './examples/Nested.vue'

export default {
  name: 'App',

  components: { Simple, Horizontal, Root, Nested },

  data () {
    return {
      examples: ['Simple', 'Horizontal', 'Root', 'Nested'],
      active: 0
    }
  },

  computed: {
    activeExample () { return this.examples[this.active] }
  },

  methods: {
    showExample (name) {
      this.active = this.examples.indexOf(name)
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 8rem;
}

.nav {
  background-color: lightblue;
  opacity: 0.9;
  border-bottom: 1px solid black;
  top: 0;
  position: fixed;
  width: 100%;
  text-align: center;
  z-index: 1000;
}

.nav h1 {
  font-size: 2rem;
  margin: 0.5rem 0 0.3rem;
}

.nav a {
  font-size: 1.5rem;
  margin: 0 0.3rem 0.5rem;
  display: inline-block;
}

.nav a.active {
  font-weight: bold;
  cursor: normal;
}

ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
}

.popup {
  color: white;
  background: #3f51b5d1;
  font-size: 120%;
  padding: 5px 10px;
  position: fixed;
}

.popup-container .popup {
  position: absolute;
}

.scroll-container {
  border: 4px solid black;
}
</style>
