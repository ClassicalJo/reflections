
export class Rect {
    constructor(canvasWidth, canvasHeight) {
        this.pos = {
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
        }
        this.size = {
            width: Math.random() * 200,
            height: Math.random() * 50,
        }
        this.angle = Math.random() * Math.PI * 2
        this.direction = Math.random()  > .5 ? 1 : -1
        this.color = {
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
        }
    }
    render(ctx) {
        let { x, y } = this.pos
        let { width, height } = this.size
        let {angle} = this        
        let { r, g, b } = this.color
        ctx.save()
        ctx.beginPath()
        ctx.setTransform(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), x, y)
        ctx.fillStyle = `rgba(${r},${g},${b},1)`
        ctx.fillRect(width / -2, height / -2, width, height)
        ctx.restore()

    }
    update() {
        this.angle += Math.PI / 180 * this.direction
        this.pos.x += Math.sin(this.angle) * 2
        this.pos.y += Math.sin(this.angle) * 2
    }
}
