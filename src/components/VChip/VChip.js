import '../../stylus/components/_chips.styl'

import VIcon from '../VIcon'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import Toggleable from '../../mixins/toggleable'

/* @vue/component */
export default {
  name: 'v-chip',

  mixins: [Colorable, Themeable, Toggleable],

  props: {
    close: Boolean,
    disabled: Boolean,
    label: Boolean,
    outline: Boolean,
    // Used for selects/tagging
    selected: Boolean,
    small: Boolean,
    textColor: String,
    value: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes () {
      return {
        'v-chip--disabled': this.disabled,
        'v-chip--selected': this.selected,
        'v-chip--label': this.label,
        'v-chip--outline': this.outline,
        'v-chip--small': this.small,
        'v-chip--removable': this.close,
        'theme--light': this.light,
        'theme--dark': this.dark
      }
    }
  },

  methods: {
    genClose (h) {
      const data = {
        staticClass: 'v-chip__close',
        on: {
          click: e => {
            e.stopPropagation()

            this.$emit('input', false)
          }
        }
      }

      return h('div', data, [
        h(VIcon, '$vuetify.icons.delete')
      ])
    },
    genContent (h) {
      const children = [this.$slots.default]

      this.close && children.push(this.genClose(h))

      return h('span', {
        staticClass: 'v-chip__content'
      }, children)
    }
  },

  render (h) {
    const data = this.setBackgroundColor(this.color, {
      staticClass: 'v-chip',
      'class': this.classes,
      attrs: { tabindex: this.disabled ? -1 : 0 },
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    })

    const color = this.textColor || (this.outline && this.color)
    return h('span', this.setTextColor(color, data), [this.genContent(h)])
  }
}
