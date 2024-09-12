import { mergeAttributes, Node } from '@tiptap/core'

/**
 * The tip divType options.
 */
export type DivType = "default" | "tip" | "note"

export interface AcademyDivOptions {
  /**
   * The available classes divTypes.
   * @default ["default" | "tip" | "note"]
   * @example ["default" | "tip" | "note"]
   */
  divType: DivType[],

  /**
   * The HTML attributes for a tip node.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    div: {
      /**
       * Set a div node
       * @param attributes The div attributes
       * @example editor.commands.setDiv({ divType: "tip" })
       */
      setDiv: (attributes: { divType: DivType }) => ReturnType,
      /**
       * Toggle a div node
       * @param attributes The div attributes
       * @example editor.commands.toggleDiv({ divType: "tip" })
       */
      toggleDiv: (attributes: { divType: DivType }) => ReturnType,
    }
  }
}

export const AcademyDiv = Node.create<AcademyDivOptions>({
  name: 'div',

  addOptions() {
    return {
      divType: ["default", "tip", "note"],
      HTMLAttributes: {},
    }
  },

  content: 'block+',

  group: 'block academy',

  draggable: true,

  defining: true,

  addAttributes() {
    return {
      divType: {
        default: "default",
        rendered: false,
      },
    }
  },

  parseHTML() {
    return this.options.divType
      .map((divType: DivType) => ({
        tag: `div`,
        attrs: { divType },
      }))
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasClass = this.options.divType.includes(node.attrs.divType)
    const class_ = hasClass
      ? node.attrs.divType
      : this.options.divType[0];

    const attr = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: `academy-${class_}` });
    return [`div`, attr, 0]
  },

  addCommands() {
    return {
      setDiv: attributes => ({ commands }) => {
        if (!this.options.divType.includes(attributes.divType)) {
          return false
        }

        return commands.wrapIn(this.name, attributes);
      },
      toggleDiv: attributes => ({ commands }) => {
        if (!this.options.divType.includes(attributes.divType)) {
          return false
        }

        return commands.toggleWrap(this.name, attributes);
      },
    }
  },
})

export default AcademyDiv