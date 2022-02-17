import { CanvasAnimation } from './src/CanvasAnimation.js'
import { Reflections } from './src/Reflections.js'
let canvas = document.querySelector('canvas')
let animation = new CanvasAnimation(canvas, Reflections)

let loader = new Promise(resolve => {
    let img = new Image()
    img.src = document.querySelector("#cloud").src
    img.onload = function () {
        resolve(this)
    }
}).then(() => animation.animate())


