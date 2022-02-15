import { Rect } from './Rect.js'
import { Water } from './Water.js'

export const Reflections = canvas => {
    let ctx = canvas.getContext('2d')
    let water = new Water(canvas)
    return ({
        bodies: Array(100).fill("").map(() => new Rect(canvas.width, canvas.height)),
        update: function () {
            this.bodies.forEach(k => k.update())
        },
        reflect: function () {
            let memCanvas = document.createElement('canvas')
            memCanvas.width = canvas.width
            memCanvas.height = canvas.height
            let memCtx = memCanvas.getContext('2d')
            memCtx.setTransform(1, 0, 0, -1, 0, canvas.height)
            memCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height / 2, 0, 0, canvas.width, canvas.height / 2)
            return memCanvas
        },
        drawWater: function () {
            //get the temporary canvas
            let memCanvas = this.reflect()
            //Clear non reflected items
            ctx.clearRect(0, canvas.height / 2, canvas.width, canvas.height / 2)
            //Paint it blue
            ctx.fillStyle = "rgba(0,0,255,0.01)"
            ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2)
            //Paint the reflections
            ctx.drawImage(memCanvas, 0, canvas.height / 2, canvas.width, canvas.height / 2, 0, canvas.height / 2, canvas.width, canvas.height / 2)
            //Paint the wave effect
            ctx.drawImage(water.target, 0, canvas.height / 2, canvas.width, canvas.height / 2, 0, canvas.height / 2, canvas.width, canvas.height / 2)
        },
        render: function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            this.bodies.forEach(k => k.render(ctx))
            this.drawWater()
        }
    })
}
