module.exports = [
    ['cmyk 10 20 50 6', { format: 'cmyk' }],
    ['cMyk 10 20 50 6', { format: 'cmyk' }],
    ['10 20 50 6', { format: 'cmyk' }],
    ['10 20 50 6 cmyk', { format: 'cmyk' }],
    ['c: 10 m:20 y:50 k:6', { format: 'cmyk' }],
    ['c: 10 m:20 k:50 y:6', { format: 'cmyk' }],
    ['c:10m:20k:50y:6', { format: 'cmyk' }],
    ['c10m20k50y6', { format: 'cmyk' }],
    ['cmyk(39 0 39 7)', { format: 'cmyk' }],
    ['cmyk(39,0,39,7)', { format: 'cmyk' }],
    ['cmyk(39/0/39/7)', { format: 'cmyk' }],
    ['cmyk(39;0;39;7)', { format: 'cmyk' }],
    ['21', { format: 'grayscale' }],
    ['21%', { format: 'grayscale' }],
    ['g 21', { format: 'grayscale' }],
    ['grayscale 21', { format: 'grayscale' }],
    ['mono 21', { format: 'grayscale' }],
    ['9E9', { format: 'hex3' }],
    ['hex 9E9', { format: 'hex3' }],
    ['hex9E9', { format: 'hex3' }],
    ['hex3 9E9', { format: 'hex3' }],
    ['0x9E9', { format: 'hex3' }],
    ['Ox9E9', { format: 'hex3' }],

    ['AF02', {format: 'hex4'}],

    ['FFAA21', {format: 'hex6'}],

    ['1212FF21', {format: 'hex8'}],

    ['magenta', {format: 'html'}],
    ['red', { format: 'html' }],
    ['html red', { format: 'html' }],

    ['hsl 10 20 14', {format: 'hsl'}],

    ['hsv 10 20 14', {format: 'hsv'}],

    ['lab 10 20 14', {format: 'lab'}],

    ['100C', {format: 'pantone'}],
    ['pantone 100', {format: 'pantone'}],
    ['pantone 100C', {format: 'pantone'}],
    
    ['ral 7015', {format: 'ral'}],

    ['rgb 10 20 15', {format: 'rgb'}],

    ['rgba 10 20 15 0.2', {format: 'rgba'}],

    ['rgb 16711680', { format: 'rgbdecimal' }],
    ['rgbdecimal 16711680', { format: 'rgbdecimal' }],
    ['rgb decimal 16711680', { format: 'rgbdecimal' }],
    ['rgb numeric 16711680', { format: 'rgbdecimal' }],

    ['w 450', {format: 'w'}],

    ['xyz 10 20 4', {format: 'xyz' }],

    ['yuv 20 20 4', {format: 'yuv'}],

    ['nimic', { format: false }],
    ['c: 10 m:20 k:50 y:6', { format: 'cmyk', cmyk: { c: 10, m: 20, k: 50, y: 6 } }],
]
