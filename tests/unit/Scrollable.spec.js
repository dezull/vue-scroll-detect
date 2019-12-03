import ScrollContainer from '@/components/ScrollContainer.vue'
import Scrollable from '@/components/Scrollable.vue'
import { mountApp } from './spec_helper'

describe('Scrollable', () => {
  it('throws if parent ScrollContainer not found', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {})

    expect(() => {
      mountApp('<Scrollable />')
    }).toThrow('Parent ScrollContainer not found')
    spy.mockRestore()
  })

  it('must be child of ScrollContainer', () => {
    expect(() => {
      mountApp('<ScrollContainer><Scrollable /></ScrollContainer>')
    }).not.toThrow()
  })

  describe('on mounted', () => {
    it('adds child to parent', () => {
      const wrapper = mountApp('<ScrollContainer><Scrollable /></ScrollContainer>')
      const scrollContainer = wrapper.find(ScrollContainer).vm
      expect(scrollContainer.$data.children.length).toBe(1)
      expect(scrollContainer.$data.children[0]).toBe(wrapper.find(Scrollable).vm)
    })
  })

  describe('on destroyed', () => {
    it('has removed child from parent', () => {
      const wrapper = mountApp('<ScrollContainer><Scrollable /></ScrollContainer>')
      const scrollContainer = wrapper.find(ScrollContainer).vm
      expect(scrollContainer.$data.children.length).toBe(1)
      wrapper.find(Scrollable).destroy()
      expect(scrollContainer.$data.children.length).toBe(0)
    })
  })
})
