import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import WikiPage from '@/components/WikiPage.vue'

describe('Page content rending component', () => {
  it('Rends wikilink with site id', () => {
    const wrapper = shallowMount(WikiPage, {
      propsData: {
        page: 'Text with a link [wiki:s s2/pp 4]',
        siteid: 'site'
      }
    })
    expect(wrapper.vm.rended).to.equal('<p>Text with a link <a href="/#/v/s-s2/pp-4">s s2/pp 4</a></p>\n')
  })
  it('Rends wikilink without site id', () => {
    const wrapper = shallowMount(WikiPage, {
      propsData: {
        page: 'Text with a link [wiki: p p4] a',
        siteid: 'siteAe'
      }
    })
    expect(wrapper.vm.rended).to.equal('<p>Text with a link <a href="/#/v/siteAe/p-p4">p p4</a> a</p>\n')
  })
  it('creates html from markdown', () => {
    const wrapper = shallowMount(WikiPage, {
      propsData: {
        page: '# A heading!',
        siteid: 'site'
      }
    })
    expect(wrapper.vm.rended).to.equal('<h1>A heading!</h1>\n')
  })
  it('creates sitelinks from [site:test]', () => {
    const wrapper = shallowMount(WikiPage, {
      propsData: {
        page: '[site: We are just testing here ]',
        siteid: 'site'
      }
    })
    expect(wrapper.vm.rended).to.equal('<p><a href="/#/v/We-are-just-testing-here">We are just testing here</a></p>\n')
  })
  /*
  it('creates wikilinks out of [wiki:link]', () => {
    const wrapper = shallowMount(Markdown, {
      propsData: {
        content: { Content: '[wiki:link]' }
      }
    })
    expect(wrapper.vm.markdown).to.equal('<p><a href="/#/page/link">link</a></p>\n')
  }) */
})
