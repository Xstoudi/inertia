import type { Modal } from './types'

const modal: Modal = {
  modal: null,
  listener: null,

  show(html: Record<string, unknown> | string): void {
    if (typeof html === 'object') {
      html = `All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(
        html
      )}`
    }

    const page = document.createElement('html')
    page.innerHTML = html
    page.querySelectorAll('a').forEach((a) => a.setAttribute('target', '_top'))

    this.modal = document.createElement('div')
    this.modal.style.position = 'fixed'
    this.modal.style.width = '100vw'
    this.modal.style.height = '100vh'
    this.modal.style.padding = '50px'
    this.modal.style.boxSizing = 'border-box'
    this.modal.style.backgroundColor = 'rgba(0, 0, 0, .6)'
    this.modal.style.zIndex = '200000'
    this.modal.addEventListener('click', () => this.hide())

    const iframe = document.createElement('iframe')
    iframe.style.backgroundColor = 'white'
    iframe.style.borderRadius = '5px'
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    this.modal.appendChild(iframe)

    document.body.prepend(this.modal)
    document.body.style.overflow = 'hidden'
    if (!iframe.contentWindow) {
      throw new Error('iframe not yet ready.')
    }
    iframe.contentWindow.document.open()
    iframe.contentWindow.document.write(page.outerHTML)
    iframe.contentWindow.document.close()

    this.listener = this.hideOnEscape.bind(this)
    document.addEventListener('keydown', this.listener)
  },

  hide(): void {
    if (this.modal != null) {
      this.modal.outerHTML = ''
    }
    this.modal = null
    document.body.style.overflow = 'visible'
    if (this.listener != null) {
      document.removeEventListener('keydown', this.listener)
    }
  },

  hideOnEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.hide()
    }
  },
}

export default modal
