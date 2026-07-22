/**
 * Convert a Payload Lexical richText object to a plain-text string.
 *
 * Lexical JSON structure:
 * { root: { type: 'root', children: [ { type: 'paragraph', children: [ { type: 'text', text: '...' } ] } ] } }
 *
 * Handles: text, paragraph, heading, list, listItem, linebreak, link nodes.
 */
type LexicalNode = {
  text?: string
  type?: string
  children?: LexicalNode[]
  root?: LexicalNode
}

export function richTextToPlainText(data: unknown): string {
  if (!data) return ''
  if (typeof data === 'string') {
    // A `textarea`/`text` field may store a stringified Lexical object
    // (e.g. when a field was switched from richText). Parse it so the
    // visible text is extracted instead of rendering the raw JSON.
    const trimmed = data.trim()
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        return extractText(JSON.parse(trimmed) as LexicalNode)
      } catch {
        // Not valid JSON — fall through and treat as plain text.
      }
    }
    return data
  }

  if (typeof data === 'object' && data !== null) {
    const node = data as LexicalNode
    return extractText(node.root ?? node)
  }

  return String(data)
}

function extractText(node: LexicalNode | undefined | null): string {
  if (!node) return ''

  // Text node
  if (node.text !== undefined) return node.text

  // Element node with children
  if (Array.isArray(node.children)) {
    const separator = node.type === 'paragraph' || node.type === 'heading' ? '\n' : ''
    return node.children.map(extractText).join(
      node.type === 'listitem' ? '' : separator,
    )
  }

  // Root node
  if (node.root) return extractText(node.root)

  return ''
}
