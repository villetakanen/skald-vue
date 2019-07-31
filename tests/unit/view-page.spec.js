import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Markdown from '@/components/Markdown.vue'

describe('Page content rending component', () => {
  it('creates html from markdown', () => {
    const wrapper = shallowMount(Markdown, {
      propsData: {
        content: { Content: '# A heading!' }
      }
    })
    expect(wrapper.vm.markdown).to.equal('<h1>A heading!</h1>\n')
  })

  it('creates empty paragraph from missing {content: { markdown: ... } }', () => {
    const wrapper = shallowMount(Markdown, {
      propsData: {
        content: { something: 'else' }
      }
    })
    expect(wrapper.vm.markdown).to.equal('<p>- empty -</p>')
  })
})
