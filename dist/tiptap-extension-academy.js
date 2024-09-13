// https://github.com/ssvet/tiptap-extension-academy
import { mergeAttributes, Node } from '@tiptap/core';
export var AcademyDiv = Node.create({
    name: 'div',
    addOptions: function () {
        return {
            divType: ["default", "tip", "note"],
            HTMLAttributes: {},
        };
    },
    content: 'block+',
    group: 'block academy',
    draggable: true,
    defining: true,
    addAttributes: function () {
        return {
            divType: {
                default: "default",
                rendered: false,
            },
        };
    },
    parseHTML: function () {
        return this.options.divType
            .map(function (divType) { return ({
            tag: "div",
            attrs: { divType: divType },
        }); });
    },
    renderHTML: function (_a) {
        var node = _a.node, HTMLAttributes = _a.HTMLAttributes;
        var hasClass = this.options.divType.includes(node.attrs.divType);
        var class_ = hasClass
            ? node.attrs.divType
            : this.options.divType[0];
        var attr = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: "academy-".concat(class_) });
        return ["div", attr, 0];
    },
    addCommands: function () {
        var _this = this;
        return {
            setDiv: function (attributes) { return function (_a) {
                var commands = _a.commands;
                if (!_this.options.divType.includes(attributes.divType)) {
                    return false;
                }
                return commands.wrapIn(_this.name, attributes);
            }; },
            toggleDiv: function (attributes) { return function (_a) {
                var commands = _a.commands;
                if (!_this.options.divType.includes(attributes.divType)) {
                    return false;
                }
                return commands.toggleWrap(_this.name, attributes);
            }; },
        };
    },
});
export default AcademyDiv;
