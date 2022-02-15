import { CanvasAnimation } from './src/CanvasAnimation.js'
import { Reflections } from './src/Reflections.js'
let canvas = document.querySelector('canvas')
let animation = new CanvasAnimation(canvas, Reflections)
animation.animate()
