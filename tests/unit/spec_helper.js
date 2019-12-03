import { mount, createLocalVue } from '@vue/test-utils'
import ScrollContainer from '@/components/ScrollContainer.vue'
import Scrollable from '@/components/Scrollable.vue'

export function mountApp (template, options = {}) {
  const components = { Scrollable, ScrollContainer }
  return mount({
    template,
    components,
    localVue: createLocalVue(),
    ...options
  })
}
