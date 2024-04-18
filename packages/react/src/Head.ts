import {
  Children,
  type FunctionComponent,
  type PropsWithChildren,
  cloneElement,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import HeadContext from './HeadContext'

export type InertiaHeadProps = PropsWithChildren<{
  title?: string
}>

export type InertiaHead = FunctionComponent<InertiaHeadProps>

const Head: InertiaHead = function ({ children, title }) {
  const headManager = useContext(HeadContext)
  const provider = useMemo(() => headManager.createProvider(), [headManager])

  useEffect(() => {
    return () => {
      provider.disconnect()
    }
  }, [provider])

  function isUnaryTag(node) {
    return (
      [
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr',
      ].indexOf(node.type) > -1
    )
  }

  function renderTagStart(node) {
    const attrs = Object.keys(node.props).reduce((carry, name) => {
      if (['head-key', 'children', 'dangerouslySetInnerHTML'].includes(name)) {
        return carry
      }
      const value = node.props[name]
      if (value === '') {
        return carry + ` ${name}`
      } else {
        return carry + ` ${name}="${value}"`
      }
    }, '')
    return `<${node.type}${attrs}>`
  }

  function renderTagChildren(node) {
    return typeof node.props.children === 'string'
      ? node.props.children
      : node.props.children.reduce((html, child) => html + renderTag(child), '')
  }

  function renderTag(node) {
    let html = renderTagStart(node)
    if (node.props.children) {
      html += renderTagChildren(node)
    }
    if (node.props.dangerouslySetInnerHTML) {
      html += node.props.dangerouslySetInnerHTML.__html
    }
    if (!isUnaryTag(node)) {
      html += `</${node.type}>`
    }
    return html
  }

  function ensureNodeHasInertiaProp(node) {
    return cloneElement(node, {
      inertia:
        node.props['head-key'] !== undefined ? node.props['head-key'] : '',
    })
  }

  function renderNode(node) {
    return renderTag(ensureNodeHasInertiaProp(node))
  }

  function renderNodes(nodes) {
    const computed = Children.toArray(nodes)
      .filter((node) => node)
      .map((node) => renderNode(node))
    if (title && !computed.find((tag) => tag.startsWith('<title'))) {
      computed.push(`<title inertia>${title}</title>`)
    }
    return computed
  }

  provider.update(renderNodes(children))

  return null
}
export default Head
