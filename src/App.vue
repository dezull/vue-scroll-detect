<template>
  <div id="app">
    <div class="nav">
      <a
        v-for="(example, index) in examples"
        :key="'title' + index"
        href="#"
        @click="showExample(example)"
      >
        <h2>{{ example }}</h2>
      </a>
    </div>
    <component :is="activeExample" />
  </div>
</template>

<script>
import Simple from './examples/Simple.vue'
import Horizontal from './examples/Horizontal.vue'
import Root from './examples/Root.vue'

export default {
  name: 'App',

  components: { Simple, Horizontal, Root },

  data () {
    return {
      examples: ['Simple', 'Horizontal', 'Root'],
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

.visible-items {
  position: fixed;
  width: 100%;
  top: 70px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 161px;
}

.nav {
  background-color: lightblue;
  opacity: 0.9;
  border-bottom: 1px solid black;
  top: 0;
  position: fixed;
  width: 100%;
  text-align: center;
  height: 100px;
}

.nav h2 {
  margin-bottom: 0;
}

.nav a {
  display: inline-block;
  margin: auto 5px;
}
</style>
