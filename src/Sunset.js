export class Sunset {
    constructor(canvas) {
        this.canvas = this.createCanvas(canvas)
        this.paint()
    }
    createCanvas(origin) {
        let canvas = document.createElement('canvas')
        canvas.width = origin.width
        canvas.height = origin.height
        return canvas
    }
    paint() {
        let ctx = this.canvas.getContext('2d')
        let grad = ctx.createLinearGradient(0, 0, 0, this.canvas.height)
        let [WIDTH, HEIGHT] = [this.canvas.width, this.canvas.height]
        let [W2, H2] = [WIDTH / 2, HEIGHT / 2]
        grad.addColorStop(0, 'orange')
        grad.addColorStop(0.5, 'hsl(21, 52%, 38%)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, WIDTH, H2)
        ctx.fillStyle = "hsl(58,100%,92%)"
        ctx.arc(W2, H2 + 25, 100, 0, Math.PI * 2)
        ctx.fill()
    }
}
