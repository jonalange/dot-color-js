'use strict'

const _removeFromArray = require('./frame/_remove_array_from_array')

class AcceptedColors {
    constructor () {
        this.cmyk = {}
        this.grayscale = {}
        this.hex3 = {}
        this.hex4 = {}
        this.hex6 = {}
        this.hex8 = {}
        this.html = {}
        this.hsl = {}
        this.hsv = {}
        this.lab = {}
        this.pantone = {}
        this.ral = {}
        this.rgb = {}
        this.rgba = {}
        this.rgbDecimal = {}
        this.w = {}
        this.xyz = {}
        this.yuv = {}
    }

    get keys () {
        return Object.keys(this)
    }

    get paintKeys () {
        const { keys } = this 
        return _removeFromArray(keys,['ral', 'rgbDecimal' , 'pantone', 'grayscale', 'hex3', 'hex4', 'rgba', 'yuv'])
    }

    get sanitaryKeys () {
        const { keys } = this 
        return _removeFromArray(keys,['isHex', 'hex', 'isHexVerbos']).sort(function(a, b){
            return b.length - a.length;
          })
    }

    // get letters () {
    //     let { keys } = this 
    //     keys = _removeFromArray(keys,['pantone', 'grayscale', 'ral', 'rgbDecimal','html','yuv','lab','w'] )

    //     let _letterOutput = {}
    //     let _letter = keys.join('').replace(/([^a-z]|hex)/gi,'').split('')
    //     _letter = _letter.filter((v, i, a) => a.indexOf(v) === i)

    //     for(const a of _letter) {
    //         for (const b of keys ) {
    //             if (b.indexOf(a) > -1){
    //                 _letterOutput[a] = b
    //             }
    //         }
    //     }

    //     return _letterOutput
    // }
}

module.exports = AcceptedColors;