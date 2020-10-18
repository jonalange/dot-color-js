# Accepted String Values.

 | Input value | detect as | 
 | ---- | ---- | 
 | cmyk 10 20 50 6 | format: cmyk | 
 | cMyk 10 20 50 6 | format: cmyk | 
 | 10 20 50 6 | format: cmyk | 
 | 10 20 50 6 cmyk | format: cmyk | 
 | c: 10 m:20 y:50 k:6 | format: cmyk | 
 | c: 10 m:20 k:50 y:6 | format: cmyk | 
 | c:10m:20k:50y:6 | format: cmyk | 
 | c10m20k50y6 | format: cmyk | 
 | cmyk=39,0,39,7 | format: cmyk | 
 | cmyk(39 0 39 7) | format: cmyk | 
 | cmyk(39,0,39,7) | format: cmyk | 
 | cmyk(39/0/39/7) | format: cmyk | 
 | cmyk(39;0;39;7) | format: cmyk | 
 | 21 | format: grayscale | 
 | 21% | format: grayscale | 
 | g 21 | format: grayscale | 
 | g:21 | format: grayscale | 
 | g=21 | format: grayscale | 
 | grayscale 21 | format: grayscale | 
 | grayscale:21 | format: grayscale | 
 | grayscale=21 | format: grayscale | 
 | mono 21 | format: grayscale | 
 | mono:21 | format: grayscale | 
 | mono=21 | format: grayscale | 
 | mono 21% | format: grayscale | 
 | 9E9 | format: hex3 | 
 | #9E9 | format: hex3 | 
 | hex 9E9 | format: hex3 | 
 | hex #9E9 | format: hex3 | 
 | hex3 9E9 | format: hex3 | 
 | hex3 #9E9 | format: hex3 | 
 | hex9E9 | format: hex3 | 
 | hex3 9E9 | format: hex3 | 
 | 0x9E9 | format: hex3 | 
 | Ox9E9 | format: hex3 | 
 | hex 0x9E9 | format: hex3 | 
 | hex3 0x9E9 | format: hex3 | 
 | hex3 #0x9E9 | format: hex3 | 
 | hex ox9E9 | format: hex3 | 
 | AF02 | format: hex4 | 
 | FFAA21 | format: hex6 | 
 | 1212FF21 | format: hex8 | 
 | magenta | format: html | 
 | red | format: html | 
 | html red | format: html | 
 | hsl 10 20 14 | format: hsl | 
 | hsv 10 20 14 | format: hsv | 
 | lab 10 20 14 | format: lab | 
 | pantone 100 | format: pantone | 
 | pantone 100C | format: pantone | 
 | ral 7015 | format: ral | 
 | 10 20 15 | format: rgb | 
 | rgb 10 20 15 | format: rgb | 
 | rgba 10 20 15 0.2 | format: rgba | 
 | rgb 16711680 | format: rgbdecimal | 
 | rgbdecimal 16711680 | format: rgbdecimal | 
 | rgb decimal 16711680 | format: rgbdecimal | 
 | rgb numeric 16711680 | format: rgbdecimal | 
 | w 450 | format: w | 
 | xyz 10 20 4 | format: xyz | 
 | yuv 20 20 4 | format: yuv | 
 | black | format: html | 
 | bac | format: hex3 | 
 | nimic | format: false | 
 | c: 10 m:20 k:50 y:6 | format: cmyk | 
 | c: 10 m:20 k:50 y:6 | cmyk: c,10,k,50,m,20,y,6 | 
 | g: 30 | format: grayscale | 
 | g: 30 | cmyk: c,0,k,30,m,0,y,0 | 
 | rgb 0 255 0 | format: rgb | 
 | rgb 0 255 0 | rgb: b,0,g,255,r,0 | 
 | rgb(0 255 0) | invert: b,255,g,0,r,255 | 
 | rgb 60 8 10 | invert: b,58,g,60,r,8 | 
 | rgb 60 8 10 | invert: b,58,g,60,r,8 | 
 | rgb 60 8 10 | primary: b,0,g,0,r,255 | 
 | red | primary: Red | 
 | ral 7015 | primary: lrv,10,name,Signal Brown,ral,8002 | 
 | rgb 60 8 10 | secondary: b,255,g,0,r,255 | 
 | red | secondary: Yellow | 
 | rgb 60 8 10 | tertiary: b,128,g,0,r,255 | 
 | red | tertiary: Dark Orange | 
