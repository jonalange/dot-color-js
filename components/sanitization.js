'use strict'

class indexColor {
    constructor() {
        this.indexRegex = {
            default: '[+-]?([0-9]*[.])?[0-9]+',
            cmyk: '[+-]?([0-9]*[.])?[0-9]+',
            hsl: '([0-9]*[.])?[0-9]+',
            rgb: '([0-9]*[.])?[0-9]?[0-9%]+',
            rgba: '([0-9]*[.])?[0-9]+',
            xyz: '[+-]?([0-9]*[.])?[0-9]+',
            yuv: '[+-]?([0-9]*[.])?[0-9]+',
        }
    }

    fullindex(index, string) {
        if (string.indexOf(index) > -1) {
            const sanitizeRegex = (this.indexRegex[index]) ? this.indexRegex[index] : this.indexRegex.default
            return string.match(new RegExp(sanitizeRegex, 'g'))
        }
        return false
    }

    partialIndex(index, string) {
        if (index && string && string.indexOf(index) === -1) {
            const tempOut = []
            const sanitizeRegex = (this.indexRegex[index]) ? this.indexRegex[index] : this.indexRegex.default

            for (const i of index) {
                const colorIndex = string.indexOf(i)
                if (colorIndex !== -1) {
                    const match = string.substring(colorIndex + 1).match(sanitizeRegex)
                    if (match) {
                        tempOut.push(match[0])
                    }
                } else {
                    return false
                }

            }
            return tempOut
        }
        return false
    }

    abstractIndex(string, type) {
        let temp = []

        temp = this.fullindex(type, string)
        if (temp && temp.length === type.length) {
            return temp
        }

        temp = this.partialIndex(type, string)
        if (temp && temp.length === type.length) {
            return temp
        }

        return false
    }

    makeInt(inputNumber) {
        const temp = parseInt(inputNumber)
        return isNaN(temp) ? 0 : temp
    }
}

class colorHelper {
    arrayToObject(data, keys) {
        if (data.length === keys.length) {
            const temp = {}
            for (const i in keys) {
                temp[keys[i]] = data[i]
            }
            return temp
        }
        return false
    }

    abstractMakeInt(a, b = 100) {
        if (typeof a === 'string') {
            let aClean = parseFloat(a.replace(/[^0-9,.]/g, ''))

            if (a.indexOf('%') > -1) {
                return (aClean / 100) * b
            }
            if (parseFloat(aClean) < 1) {
                return aClean
            }
            return aClean
        }

        return isNaN(a) ? false : a
    }

    abastractKey(colorKey) {
        let { raw } = this

        if (typeof raw === 'string') {
            raw = (this.reindex[colorKey]) ? this.reindex[colorKey](raw) : this.reindex.abstractIndex(raw, colorKey)
        }
        if (Array.isArray(raw) && raw.length === colorKey.length) {
            raw = this.arrayToObject(raw, colorKey)
        }
        if (typeof raw === 'object') {

            for (const i of colorKey) {
                if (!raw[i]) {
                    return false
                }
            }

            return raw
        }

        return false
    }
}

class abstractSanitizer extends colorHelper {
    constructor(color) {
        super()
        this.raw = color
        if (typeof this.raw === "string") {
            this.raw = this.raw.toLowerCase()
        }

        this.reindex = new indexColor()
    }


    get cmyk() {
        return this.abastractKey('cmyk')
    }

    get grayscale() {
        let { raw } = this

        if (typeof raw === 'string') {
            const rawLong = raw.replace(/android|hex3|hex4|hex6|hex8|hex|0x|ox|grayscale|g|mono|[^a-z0-9]|/gi, '').trim()
            const rawShort = rawLong.replace(/[^0-9]/g, '')
            if (rawLong && rawShort) {
                if ((rawLong.length < 3 && rawShort <= 100) || rawShort == 100) {
                    return rawShort
                }
            }
        }

        return false
    }

    get hex() {
        let { raw } = this
        if (typeof raw === 'string') {
            // if (!this.cmyk && !this.hsl && !this.hsv && !this.lab && !this.rgb && !this.rgba && !this.xyz && !this.yuv) {
            //     const rawText = raw.replace(/android|hex3|hex4|hex6|hex8|hex|0x|ox|[^a-z^0-9]/gi, '')
            //     const rawHex = rawText.replace(/[^a-f0-9]/gi, '')
            //     return ((rawText.length / 2) > rawHex.length) ? false : rawHex
            // }
            return raw.replace(/android|hex3|hex4|hex6|hex8|hex|0x|ox|[^a-f0-9]/gi, '')
        }

        return false
    }

    get hex3() { return this.hex }
    get hex4() { return this.hex }
    get hex6() { return this.hex }
    get hex8() { return this.hex }

    get html() {
        let { raw } = this
        if (raw) {
            return raw.toLowerCase().replace(/[^a-z]|html|color/gi, '')
        }
        return false
    }

    get hsl() {
        return this.abastractKey('hsl')
    }

    get hsv() {
        return this.abastractKey('hsv')
    }

    get lab() {
        return this.abastractKey('lab')
    }

    get pantone() {
        let { raw } = this
        if (raw) {
            return this.reindex.makeInt(this.raw.replace(/[^0-9]/gi, ''))
        }
        return false
    }

    get ral() {
        let { raw } = this
        if (raw) {
            return raw.toLowerCase().replace(/[^a-z0-9]|ral|color/gi, '')
        }
        return false
    }

    get rgb() {
        return this.abastractKey('rgb')
    }

    get rgba() {
        return this.abastractKey('rgba')
    }

    get rgbdecimal() {
        let { raw } = this
        return raw.replace(/[^0-9]/g, '')
    }

    get w() {
        let { raw } = this
        if (typeof raw === 'string') {
            raw = this.abstractMakeInt(raw.replace(/[^0-9]/, ''))
            return raw
        }

        return false
    }

    get xyz() {
        return this.abastractKey('xyz')
    }

    get yuv() {
        return this.abastractKey('yuv')
    }
}

module.exports = function (inputColor, colorType) {
    if (colorType) {

        const sanitizer = new abstractSanitizer(inputColor)
        return sanitizer[colorType]
    }

    return new abstractSanitizer(inputColor)
}