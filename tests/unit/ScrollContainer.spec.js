import ScrollContainer from '@/components/ScrollContainer.vue'
import Scrollable from '@/components/Scrollable.vue'
import { mountApp } from './spec_helper'

describe('ScrollContainer', () => {
  it('saves initial scrollable visibility', () => {
    const wrapper = mountApp('<ScrollContainer><Scrollable /><Scrollable /></ScrollContainer>')
    const scrollContainer = wrapper.find(ScrollContainer)
    expect(scrollContainer.vm.$data.children.length).toBe(2)
    expect(Object.keys(scrollContainer.vm._childrenVisibility).length).toBe(2)
  })

  it('emits initial event', () => {
    const wrapper = mountApp('<ScrollContainer :initialEvent="true"><Scrollable /></ScrollContainer>')
    const scrollable = wrapper.find(Scrollable)
    expect(scrollable.emitted().invisible.length).toBe(1)
  })

  it("doesn't emit initial event", () => {
    const wrapper = mountApp('<ScrollContainer><Scrollable /></ScrollContainer>')
    const scrollable = wrapper.find(Scrollable)
    expect(scrollable.emitted()).toEqual({})
  })

  describe('root mode', () => {
    it('emit children visibility on window scroll', () => {
      const wrapper = mountApp(
        '<ScrollContainer :root="true"><Scrollable /></ScrollContainer>'
      )

      const container = wrapper.find(ScrollContainer)
      const child = wrapper.find(Scrollable)
      expect(container.vm.isVisible(child.vm)).toBe(false)
      expect(child.emitted()).toEqual({})

      container.vm.isVisible = jest.fn(() => true)
      window.dispatchEvent(new Event('scroll'))

      expect(container.vm.isVisible.mock.calls.length).toBe(1)
      expect(child.emitted().visible.length).toBe(1)
    })

    it('removes window scroll listener on destroyed', () => {
      const events = ['DOMContentLoaded', 'load', 'scroll', 'resize']
      window.removeEventListener = jest.fn(() => true)
      const wrapper = mountApp('<ScrollContainer :root="true"></ScrollContainer>')
      wrapper.destroy()
      expect(window.removeEventListener.mock.calls.length).toBe(4)
      expect(window.removeEventListener.mock.calls.map(v => v[0])).toEqual(events)
    })
  })

  describe('container mode', () => {
    it('emit children visibility on container scroll', () => {
      const wrapper = mountApp(
        '<ScrollContainer><Scrollable /></ScrollContainer>'
      )
      const container = wrapper.find(ScrollContainer)
      const child = wrapper.find(Scrollable)
      expect(container.vm.isVisible(child.vm)).toBe(false)
      expect(child.emitted()).toEqual({})

      container.vm.isVisible = jest.fn(() => true)
      container.element.dispatchEvent(new Event('scroll'))

      expect(container.vm.isVisible.mock.calls.length).toBe(1)
      expect(child.emitted().visible.length).toBe(1)
    })

    it('removes scroll listener on destroyed', () => {
      const wrapper = mountApp('<ScrollContainer></ScrollContainer>')
      expect(wrapper.element.onscroll).not.toBeFalsy()
      wrapper.destroy()
      expect(wrapper.element.onscroll).not.toBeUndefined()
    })
  })
})
