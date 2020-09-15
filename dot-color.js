'use strict'
const sanitize = require('./components/sanitization')
const identify = require('./components/identify')
const AcceptedColors = require('./components/accepted_colors')
const convertColor = require('./components/convert_color')


const colorFrame = {
    clone: function (data) {

        if (typeof data === "object") {
            // return Object.create(data)
            return JSON.parse(JSON.stringify(data))
        } else {
            return data
        }
    },
    get acceptedColors() {
        return new AcceptedColors()
    }
}

class objectiveColor {
    constructor(inputColor) {
        this.init()
        this.colorExtractor(inputColor)
    }

    colorExtractor(inputColor, setFormat) {
        delete this.format
        delete this.sanitizedColor
        if (inputColor) {
            this.format = (setFormat) ? ((identify(inputColor, setFormat)) ? setFormat : false) : identify(inputColor)
            if (this.format) {
                this.sanitizedColor = sanitize(inputColor, this.format)
            } else {
                this.format = false
                this.sanitizedColor = false
            }
        }
    }

    init() {
        for (const aColor of this.acceptedColors.keys) {
            Object.defineProperty(this, aColor, {
                get() {
                    if (this.format === aColor) {
                        return this.sanitizedColor
                    } else if (this.format) {
                        const stepsToConvert = convertColor.stepsToConvert(this.format, aColor)
                        let tempColor = this.clone(this.sanitizedColor);
                        if (stepsToConvert) {
                            for (let i = 0; i < stepsToConvert.length - 1; i++) {
                                if (tempColor) {
                                    tempColor = convertColor[stepsToConvert[i]][stepsToConvert[i + 1]](this.clone(tempColor))
                                }
                            }
                        }

                        return tempColor
                    }
                    return false
                },
                set(input) {
                    this.colorExtractor(input, aColor)
                }
            })
        }

        Object.defineProperty(this, 'color', {
            get() {
                return this.sanitizedColor
            },
            set(input) {
                this.colorExtractor(input)
            }
        })

        Object.defineProperty(this, 'htmlref', {
            get() {
                const stepsToConvert = convertColor.stepsToConvert("html", "hex6")
                let tempColor = this.clone(this.html);
                if (stepsToConvert) {
                    for (let i = 0; i < stepsToConvert.length - 1; i++) {
                        if (tempColor) {
                            tempColor = convertColor[stepsToConvert[i]][stepsToConvert[i + 1]](this.clone(tempColor))
                        }
                    }
                }
                return (tempColor) ? "#" + tempColor : false
            }
        })
    }
}

Object.assign(objectiveColor.prototype, colorFrame);

module.exports = objectiveColor