'use strict'
const { html, pantone, ral } = require('color_library')

const helpers = {
    splitCamelCase: function (name) {
        return name.replace(/([A-Z])/g, ' $1').trim()
    },

    deltaE: function (lab1, lab2) {
        if (lab1 && lab2) {
            let _this = 0
            for (const _key in lab1) {
                _this += Math.pow((lab1[_key] - lab2[_key]), 2)
            }
            return Math.sqrt(_this)
        }
        return false

    },

    doubleString: function (string) {
        let temp = ''
        for (let index = 0; index < string.length; index++) {
            temp += string[index] + string[index]
        }
        return temp.toUpperCase()
    },

    sanitizeString: function (val) {
        if (val && typeof val === 'string') {
            return val.toLowerCase().replace(/[^a-z0-9]/gi, '')
        } else if (typeof val === "number") {
            return val.toString()
        }
        return false
    },

    pullDataFunction: function (a, b, rowName) {
        if (Array.isArray(rowName)) {
            for (const rowE of rowName) {
                if (this.sanitizeString(a[rowE]) == b) {
                    return true
                }
            }
            return false
        }
        return this.sanitizeString(a[rowName]) === b
    },

    pullDataFromList2: function ({ listOfColors, lookingFor, rowName = 'name' }) {
        const lookingForCash = this.sanitizeString(lookingFor)

        const temp = listOfColors.filter(a => this.pullDataFunction(a, lookingForCash, rowName))
        if (temp.length) {
            return temp[0]
        }

        return false

    },
    pullDataFromList: function (listName, coloType, refeance, query = 'name') {

        const referanceCash = this.sanitizeString(refeance)

        const temp = listName.filter(a => this.sanitizeString(a[query]) === referanceCash)

        if (temp.length) {
            if (temp[0][coloType]) {
                return temp[0][coloType]
            } else if (temp[0][query]) {
                return temp[0][query]
            }
        }

        return false
    },
    makeNumeric: function (inputNumber) {
        const temp = parseInt(inputNumber)
        return isNaN(temp) ? 0 : temp
    }
}

const colorConvert = {
    pullDataFromList: function (coloType, refeance) {
        switch (coloType) {
            case 'html':
                return helpers.pullDataFromList2({
                    listOfColors: html,
                    lookingFor: refeance,
                })
            case 'pantone':
                return helpers.pullDataFromList2({
                    listOfColors: pantone,
                    lookingFor: refeance,
                })
            case 'ral':
                return helpers.pullDataFromList2({
                    listOfColors: ral,
                    lookingFor: refeance,
                    rowName: ['ral', 'name']
                })
            default:
                return false
        }
    },

    cmyk: {
        rgb: function (cmyk) {
            return {
                r: Math.round(255 * (1 - cmyk.c / 100) * (1 - cmyk.k / 100)),
                g: Math.round(255 * (1 - cmyk.m / 100) * (1 - cmyk.k / 100)),
                b: Math.round(255 * (1 - cmyk.y / 100) * (1 - cmyk.k / 100)),
            }
        },
        pantone: function (cmyk) {
            const temp = {
                index: 768,
                name: '',
            }
            for (const elementPantone in pantone) {
                const t = helpers.deltaE(pantone[elementPantone].cmyk, cmyk)

                if (t && t < temp.index) {
                    temp.index = t
                    temp.name = pantone[elementPantone].name
                    if (temp.index === 1) {
                        return temp.name
                    }
                }
            }
            return temp.name
        },
    },

    grayscale: {
        cmyk: function (grayscale) {
            return { c: 0, m: 0, y: 0, k: grayscale }
        },
        rgb: function (grayscale) {
            const g = Math.round((100 - grayscale) / 0.392156862745098)
            return { r: g, g: g, b: g }
        }
    },

    hex3: {
        hex6: function (inputHex3) {
            return helpers.doubleString(inputHex3)
        },
    },

    hex4: {
        hex8: function (hex4) {
            return helpers.doubleString(hex4)
        }
    },

    hex6: {
        hex3: function (hex6) {
            function convertor(a, b) {
                let temp = ''
                temp = [a, b].join('')
                temp = Math.floor(parseInt(temp, 16) / 16)
                return temp.toString(16).toUpperCase()
            }
            return convertor(hex6[0], hex6[1]) + convertor(hex6[2], hex6[3]) + convertor(hex6[4], hex6[5])
        },

        hex4: function (hex6) {
            function convertor(a, b) {
                let temp = ''
                temp = [a, b].join('')
                temp = Math.floor(parseInt(temp, 16) / 16)
                return temp.toString(16).toUpperCase()
            }
            return convertor(hex6[0], hex6[1]) + convertor(hex6[2], hex6[3]) + convertor(hex6[4], hex6[5]) + 'F'
        },

        hex8: function (hex6) {
            return (hex6 + 'FF').toUpperCase()
        },

        rgb: function (inputHex6) {
            return {
                r: parseInt(inputHex6.substring(0, 2), 16),
                g: parseInt(inputHex6.substring(2, 4), 16),
                b: parseInt(inputHex6.substring(4, 6), 16),
            }
        }
    },

    hex8: {
        rgb: function (hex8) {
            const temp = {
                color: function () {
                    return {
                        r: parseInt(hex8.substring(0, 2), 16),
                        g: parseInt(hex8.substring(2, 4), 16),
                        b: parseInt(hex8.substring(4, 6), 16),
                    }
                }(),
                opacity: parseInt(hex8.substring(6, 8), 16) / 255,
            }

            for (const i in temp.color) {
                temp.color[i] *= temp.opacity
                temp.color[i] = Math.round(temp.color[i])
            }

            return temp.color
        },

        rgba: function (hex8) {
            const temp = function () {
                return {
                    r: parseInt(hex8.substring(0, 2), 16),
                    g: parseInt(hex8.substring(2, 4), 16),
                    b: parseInt(hex8.substring(4, 6), 16),
                }
            }();
            temp.a = Number((parseInt(hex8.substring(6, 8), 16) / 255).toFixed(2))

            return temp
        },
    },

    html: {
        rgb: function (htmlInput) {
            const _this = helpers.pullDataFromList2({
                listOfColors: html,
                lookingFor: htmlInput,
                rowName: "name",
            })
            return (_this) ? _this.rgb : false
        },
    },

    hsl: {
        rgb: function (hsl) {
            const rgb = { r: 0, g: 0, b: 0, }

            hsl.h /= 60
            if (hsl.h < 0) {
                hsl.h = 6 - (-hsl.h % 6)
            }
            hsl.h %= 6

            hsl.s = Math.max(0, Math.min(1, hsl.s / 100))
            hsl.l = Math.max(0, Math.min(1, hsl.l / 100))

            hsl.c = (1 - Math.abs((2 * hsl.l) - 1)) * hsl.s
            hsl.x = hsl.c * (1 - Math.abs((hsl.h % 2) - 1))

            if (hsl.h < 1) {
                rgb.r = hsl.c
                rgb.g = hsl.x
            } else if (hsl.h < 2) {
                rgb.r = hsl.x
                rgb.g = hsl.c
            } else if (hsl.h < 3) {
                rgb.g = hsl.c
                rgb.b = hsl.x
            } else if (hsl.h < 4) {
                rgb.g = hsl.x
                rgb.b = hsl.c
            } else if (hsl.h < 5) {
                rgb.r = hsl.x
                rgb.b = hsl.c
            } else {
                rgb.r = hsl.c
                rgb.b = hsl.x
            }

            hsl.m = hsl.l - hsl.c / 2
            for (const i of 'rgb') {
                rgb[i] = Math.round((rgb[i] + hsl.m) * 255)
            }

            return rgb
        },

        w: function (hsl) {
            return Math.round(620 - 170 / 270 * hsl.h)
        },
    },

    hsv: {
        rgb: function (hsv) {
            hsv.h /= 360
            hsv.s /= 100
            hsv.v /= 100

            const i = Math.floor(hsv.h * 6)
            const f = hsv.h * 6 - i
            const p = hsv.v * (1 - hsv.s)
            const q = hsv.v * (1 - f * hsv.s)
            const t = hsv.v * (1 - (1 - f) * hsv.s)

            switch (i % 6) {
                case 0:
                    return { r: hsv.v * 255, g: t * 255, b: p * 255 }
                case 1:
                    return { r: q * 255, g: hsv.v * 255, b: p * 255 }
                case 2:
                    return { r: p * 255, g: hsv.v * 255, b: t * 255 }
                case 3:
                    return { r: p * 255, g: q * 255, b: hsv.v * 255 }
                case 4:
                    return { r: t * 255, g: p * 255, b: hsv.v * 255 }
                case 5:
                    return { r: hsv.v * 255, g: p * 255, b: q * 255 }
            }

            return false
        },
    },

    lab: {
        pantone: function (labOrigin) {
            const _this = {
                index: 768,
                name: '',
            }
            for (const elementPantone in pantone) {
                const t = helpers.deltaE(pantone[elementPantone].lab, labOrigin)
                if (t && t < _this.index) {
                    _this.index = t
                    _this.name = pantone[elementPantone].name
                    if (_this.index === 1) {
                        return _this.name
                    }
                }
            }
            return _this.name
        },

        ral: function (lab) {
            const _this = {
                index: 768,
                position: ral.length - 1
            }

            for (const elementRal in ral) {
                const t = helpers.deltaE(ral[elementRal].lab, lab)
                if (t !== false && t < _this.index) {
                    _this.index = t
                    _this.position = elementRal
                    if (_this.index === 0) {
                        return {
                            ral: ral[_this.position].ral,
                            name: helpers.splitCamelCase(ral[_this.position].name),
                            lrv: ral[_this.position].LRV,
                        }
                    }
                }
            }
            return {
                ral: ral[_this.position].ral,
                name: helpers.splitCamelCase(ral[_this.position].name),
                lrv: ral[_this.position].LRV,
            }
        },

        rgb: function (lab) {
            const xyz = { x: 0, y: 0, z: 0 }

            xyz.y = (lab.l + 16) / 116,
                xyz.x = lab.a / 500 + xyz.y,
                xyz.z = xyz.y - lab.b / 200,

                xyz.x = 0.95047 * ((Math.pow(xyz.x, 3) > 0.008856) ? Math.pow(xyz.x, 3) : (xyz.x - 16 / 116) / 7.787)
            xyz.y = 1.00000 * ((Math.pow(xyz.y, 3) > 0.008856) ? Math.pow(xyz.y, 3) : (xyz.y - 16 / 116) / 7.787)
            xyz.z = 1.08883 * ((Math.pow(xyz.z, 3) > 0.008856) ? Math.pow(xyz.z, 3) : (xyz.z - 16 / 116) / 7.787)

            const rgb = { r: 0, g: 0, b: 0 }
            rgb.r = xyz.x * 3.2406 + xyz.y * -1.5372 + xyz.z * -0.4986
            rgb.g = xyz.x * -0.9689 + xyz.y * 1.8758 + xyz.z * 0.0415
            rgb.b = xyz.x * 0.0557 + xyz.y * -0.2040 + xyz.z * 1.0570

            for (const i of 'rgb') {
                rgb[i] = (rgb[i] > 0.0031308) ? (1.055 * Math.pow(rgb[i], 1 / 2.4) - 0.055) : 12.92 * rgb[i]
                rgb[i] = Math.round(Math.max(0, Math.min(1, rgb[i])) * 255)
            }

            return rgb
        }
    },

    pantone: {
        cmyk: function (pantoneInput) {
            const _this = helpers.pullDataFromList2({
                listOfColors: pantone,
                lookingFor: pantoneInput + "c",
                rowName: "name",
            })
            return (_this) ? _this.cmyk : false
        },

        rgb: function (pantoneInput) {
            const _this = helpers.pullDataFromList2({
                listOfColors: pantone,
                lookingFor: pantoneInput + "c",
                rowName: "name",
            })
            return (_this) ? _this.rgb : false
        },

        lab: function (pantoneInput) {
            const _this = helpers.pullDataFromList2({
                listOfColors: pantone,
                lookingFor: pantoneInput + "c",
                rowName: "name",
            })
            return (_this) ? _this.lab : false
        }
    },

    ral: {
        rgb: function (ralInput) {
            let ralOutput = helpers.pullDataFromList2({
                listOfColors: ral,
                lookingFor: ralInput,
                rowName: ['ral', 'name']
            })

            return (ralOutput.rgb) ? ralOutput.rgb : false

        },

        cmyk: function (ralInput) {
            let ralOutput = helpers.pullDataFromList2({
                listOfColors: ral,
                lookingFor: ralInput,
                rowName: ['ral', 'name']
            })



            return (ralOutput.cmyk) ? ralOutput.cmyk : false
        },

        lab: function (ralInput) {
            let ralOutput = helpers.pullDataFromList2({
                listOfColors: ral,
                lookingFor: ralInput,
                rowName: ['ral', 'name']
            })

            return (ralOutput.lab) ? ralOutput.lab : false
        }
    },

    rgb: {
        hex6: function (rgb) {
            function rgbNormalize(color) {
                color = helpers.makeNumeric(color)

                if (color < 16) {
                    color = '0' + Number(color).toString(16)
                } else {
                    color = color.toString(16)
                }

                return color
            }
            return [rgbNormalize(rgb.r), rgbNormalize(rgb.g), rgbNormalize(rgb.b)].join('').toUpperCase()
        },

        rgba: function (rgb) {
            rgb.a = 1
            return rgb
        },

        hsl: function (rgb) {
            const hsl = { h: 0, s: 0, l: 0 }
            for (const i of 'rgb') {
                rgb[i] /= 255
            }

            // Min Max chanel val
            rgb.cmin = Math.min(rgb.r, rgb.g, rgb.b)
            rgb.cmax = Math.max(rgb.r, rgb.g, rgb.b)
            rgb.delta = rgb.cmax - rgb.cmin

            // Calculate hue
            if (rgb.delta === 0) {
                hsl.h = 0
            } else if (rgb.cmax === rgb.r) {
                hsl.h = Math.round((((rgb.g - rgb.b) / rgb.delta) % 6) * 60)
            } else if (rgb.cmax === rgb.g) {
                hsl.h = Math.round(((rgb.b - rgb.r) / rgb.delta + 2) * 60)
            } else {
                hsl.h = Math.round(((rgb.r - rgb.g) / rgb.delta + 4) * 60)
            }

            // Make negative hues positive behind 360°
            hsl.h = (hsl.h < 0) ? hsl.h + 360 : hsl.h

            hsl.l = (rgb.cmax + rgb.cmin) / 2

            hsl.s = rgb.delta === 0 ? 0 : rgb.delta / (1 - Math.abs(2 * hsl.l - 1))

            hsl.s = +(hsl.s * 100).toFixed(1)
            hsl.l = +(hsl.l * 100).toFixed(1)

            return hsl
        },

        hsv: function (rgb) {
            for (const i of 'rgb') {
                rgb[i] /= 255
            }

            const minRGB = Math.min(rgb.r, Math.min(rgb.g, rgb.b))
            const maxRGB = Math.max(rgb.r, Math.max(rgb.g, rgb.b))
            let hsv = false

            if (minRGB === maxRGB) {
                // grayscale
                hsv = {
                    h: 0,
                    s: 0,
                    v: minRGB * 100
                }
            } else {
                // color
                const d = (rgb.r === minRGB) ? rgb.g - rgb.b : ((rgb.b === minRGB) ? rgb.r - rgb.g : rgb.b - rgb.r)
                const h = (rgb.r === minRGB) ? 3 : ((rgb.b === minRGB) ? 1 : 5)
                hsv = {
                    h: 60 * (h - d / (maxRGB - minRGB)),
                    s: ((maxRGB - minRGB) / maxRGB) * 100,
                    v: (maxRGB) * 100
                }
            }

            return hsv
        },

        grayscale: function (rgb) {
            for (const i of 'rgb') {
                rgb[i] = 255 - rgb[i]
            }
            return Math.round(((0.3 * rgb.r) + (0.59 * rgb.g) + (0.11 * rgb.b)) / 2.56)
        },

        lab: function (rgb) {
            for (const i of 'rgb') {
                rgb[i] /= 255
            }

            rgb.r = (rgb.r > 0.04045) ? Math.pow((rgb.r + 0.055) / 1.055, 2.4) : rgb.r / 12.92
            rgb.g = (rgb.g > 0.04045) ? Math.pow((rgb.g + 0.055) / 1.055, 2.4) : rgb.g / 12.92
            rgb.b = (rgb.b > 0.04045) ? Math.pow((rgb.b + 0.055) / 1.055, 2.4) : rgb.b / 12.92

            const xyz = { x: 0, y: 0, z: 0 }

            xyz.x = (rgb.r * 0.4124 + rgb.g * 0.3576 + rgb.b * 0.1805) / 0.95047
            xyz.y = (rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722) / 1.00000
            xyz.z = (rgb.r * 0.0193 + rgb.g * 0.1192 + rgb.b * 0.9505) / 1.08883

            xyz.x = (xyz.x > 0.008856) ? Math.pow(xyz.x, 1 / 3) : (7.787 * xyz.x) + 16 / 116
            xyz.y = (xyz.y > 0.008856) ? Math.pow(xyz.y, 1 / 3) : (7.787 * xyz.y) + 16 / 116
            xyz.z = (xyz.z > 0.008856) ? Math.pow(xyz.z, 1 / 3) : (7.787 * xyz.z) + 16 / 116

            return { l: ((116 * xyz.y) - 16), a: (500 * (xyz.x - xyz.y)), b: (200 * (xyz.y - xyz.z)) }
        },

        cmyk: function (rgb) {
            const cmyk = { c: 0, m: 0, y: 0, k: 0, }

            if (rgb.r === 0 && rgb.g === 0 && rgb.b === 0) {
                cmyk.k = 100
            } else {

                for (const i of 'rgb') {
                    rgb[i] /= 255
                }

                cmyk.k = 1 - Math.max(rgb.r, rgb.g, rgb.b)

                if (cmyk.k !== 1) {
                    cmyk.c = (1 - rgb.r - cmyk.k) / (1 - cmyk.k)
                    cmyk.m = (1 - rgb.g - cmyk.k) / (1 - cmyk.k)
                    cmyk.y = (1 - rgb.b - cmyk.k) / (1 - cmyk.k)

                    for (const i of 'cmyk') {
                        cmyk[i] = Math.round(cmyk[i] * 100)
                    }
                }
            }
            return cmyk
        },

        rgbdecimal: function (rgb) {
            return (rgb.r << 16) + (rgb.g << 8) + (rgb.b);
        },

        html: function (rgb) {
            const _this = {
                index: 768,
                html: '',
            }

            for (const elementHtml in html) {
                if (html[elementHtml].rgb) {
                    const t = Math.abs(html[elementHtml].rgb.r - rgb.r) + Math.abs(html[elementHtml].rgb.g - rgb.g) + Math.abs(html[elementHtml].rgb.b - rgb.b)


                    if (t < _this.index) {
                        _this.index = t
                        _this.html = helpers.splitCamelCase(html[elementHtml].name)
                        if (_this.index === 0) {
                            return _this.html
                        }
                    }
                }
            }

            return _this.html
        },

        xyz: function (rgb) {
            function pivot(n) {
                return (n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92) * 100.0
            }

            for (const i of 'rgb') {
                rgb[i] = pivot(rgb[i] / 255.0)
            }

            return {
                x: rgb.r * 0.4124 + rgb.g * 0.3576 + rgb.b * 0.1805,
                y: rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722,
                z: rgb.r * 0.0193 + rgb.g * 0.1192 + rgb.b * 0.9505
            }
        },

        yuv: function (rgb) {
            const yuv = { y: 0, u: 0, v: 0 }
            yuv.y = (0.257 * rgb.r) + (0.504 * rgb.g) + (0.098 * rgb.b) + 16
            yuv.u = (-0.148 * rgb.r) - (0.291 * rgb.g) + (0.439 * rgb.b) + 128
            yuv.v = (0.439 * rgb.r) - (0.368 * rgb.g) - (0.071 * rgb.b) + 128

            return yuv
        }
    },

    rgba: {
        rgb: function (rgba) {
            const temp = {}

            for (const i of 'rgb') {
                temp[i] = Math.round(rgba[i] * rgba.a)
            }

            return temp
        }
    },

    rgbdecimal: {
        rgb: function (RGBdecimal) {
            return {
                r: (RGBdecimal & 0xff0000) >> 16,
                g: (RGBdecimal & 0x00ff00) >> 8,
                b: (RGBdecimal & 0x0000ff)
            }
        }
    },

    w: {
        rgb: function (w) {
            const rgb = { r: 0, g: 0, b: 0, }

            if (w >= 380 && w < 440) {
                rgb.r = -1 * (w - 440) / (440 - 380)
                rgb.b = 1
            } else if (w >= 440 && w < 490) {
                rgb.g = (w - 440) / (490 - 440)
                rgb.b = 1
            } else if (w >= 490 && w < 510) {
                rgb.g = 1
                rgb.b = -1 * (w - 510) / (510 - 490)
            } else if (w >= 510 && w < 580) {
                rgb.r = (w - 510) / (580 - 510)
                rgb.g = 1
            } else if (w >= 580 && w < 645) {
                rgb.r = 1
                rgb.g = -1 * (w - 645) / (645 - 580)
            } else if (w >= 645 && w <= 780) {
                rgb.r = 1
            }

            for (const i of 'rgb') {
                rgb[i] = Math.round(rgb[i] * 255)
            }

            return rgb
        },
    },


    xyz: {
        lab: function (xyz) {
            function pivot(n) {
                return n > 0.008856 ? Math.pow(n, 0.3333) : (903.3 * n + 16) / 116
            }

            const x = pivot(xyz.x / 95.047)
            const y = pivot(xyz.y / 100.000)
            const z = pivot(xyz.z / 108.883)

            return {
                l: Math.max(0, 116 * y - 16),
                a: 500 * (x - y),
                b: 200 * (y - z)
            }
        },
    },

    yuv: {
        rgb: function (yuv) {
            return {
                r: Math.round(yuv.y + (1.140 * yuv.v)),
                g: Math.round(yuv.y - (0.395 * yuv.v) - (0.581 * yuv.v)),
                b: Math.round(yuv.y + (2.032 * yuv.u))
            }
        }
    },
}


Object.defineProperty(colorConvert, "stepsToConvert", {
    enumerable: false,
    writable: false,
    value: function (from, to) {
        if (from === to) {
            return false
        }
        let app = {
            count: 0,
            maxSteps: 5,
            maxCount: Math.pow(Object.keys(this).length, 2),
            tempArray: [],
        }

        const recursive = (a) => {
            if (a.length > 1 && a[a.length - 1] === to) {
                app.tempArray.push(a)
            }

            if (app.count++ >= app.maxCount) {
                return true
            }

            if (a.length < app.maxSteps) {
                for (const b of Object.keys(this[a[a.length - 1]])) {
                    if (a.indexOf(b) === -1) {
                        recursive(a.concat(b))
                    }
                }
            }
        }

        recursive([from])

        app.tempArray.sort(function (a, b) {
            return a.length - b.length
        })

        return app.tempArray[0]

    },
})

module.exports = colorConvert