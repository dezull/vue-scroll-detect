<template>
  <div class="option">
    <ul>
      <li
        v-for="(v, key) in option"
        :key="key"
      >
        <label><code>{{ key }}</code></label>
        <input
          v-model="option[key]"
          type="text"
          @change="emitChange(key, $event.target.value)"
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    option () { return this.value }
  },

  methods: {
    emitChange (key, value) { this.$emit('change', key, value) }
  }
}
</script>

<style scoped>
.option {
  background-color: white;
  margin: 20px;
  padding: 20px;
  border: 4px solid black;
  width: auto;
  box-shadow: 4px 4px #999999c4;
}

.option label {
  display: block;
}

.option input {
  width: 120px;
}
</style>
