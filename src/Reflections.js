import { Cloud } from './Cloud.js'
import { Water } from './Water.js'


export const Reflections = canvas => {
    let ctx = canvas.getContext('2d')
    let water = new Water(canvas)
    let [WIDTH, HEIGHT, W2, H2] = [canvas.width, canvas.height, canvas.width / 2, canvas.height / 2]
    let grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
    grad.addColorStop(0, 'yellow')
    grad.addColorStop(0.5, 'orange')
    
    const CLOUD = document.querySelector("#cloud")

    return ({
        bodies: [
            new Cloud({ x: 100, y: 100 }, CLOUD, 1),
            new Cloud({ x: 500, y: 150 }, CLOUD, 1.5),
            new Cloud({ x: 350, y: 130 }, CLOUD, 1.2),
            new Cloud({ x: 50, y: 325 }, CLOUD, 2),
            new Cloud({ x: 450, y: 300 }, CLOUD, 2),
        ],
        update: function () {
            this.bodies.forEach(k => k.update())
        },
        ripples: function () {
            water.update()
            ctx.drawImage(water.target, 0, H2, WIDTH, H2, 0, H2, WIDTH, H2)
        },
        sunset: function () {
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, WIDTH, H2)
            ctx.fillStyle = "hsl(58,100%,92%)"
            ctx.arc(W2, H2 + 25, 100, 0, Math.PI * 2)
            ctx.fill()
        },
        generateReflection: function () {
            let memCanvas = document.createElement('canvas')
            memCanvas.width = WIDTH
            memCanvas.height = HEIGHT
            let memCtx = memCanvas.getContext('2d')
            memCtx.save()
            memCtx.setTransform(1, 0, 0, -1, 0, HEIGHT)
            memCtx.drawImage(canvas, 0, 0, WIDTH, H2, 0, 0, WIDTH, H2)
            memCtx.restore()
            return memCanvas
        },
        paintPool: function (color) {
            ctx.fillStyle = color
            ctx.fillRect(0, H2, WIDTH, H2)
        },
        paintReflection: function (canvas) {
            this.paintPool("white")
            ctx.drawImage(canvas, 0, H2, WIDTH, H2, 0, H2, WIDTH, H2)
        },
        render: function () {
            ctx.clearRect(0, 0, WIDTH, HEIGHT)
            this.sunset()
            this.bodies.forEach(k => k.render(ctx))
            this.paintReflection(this.generateReflection())
            this.paintPool("rgba(0,125,50,0.3)")
            this.ripples()
        }
    })
}
