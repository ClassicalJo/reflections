export class CanvasAnimation {
    constructor(canvas, animation) {
        this.canvas = canvas
        this.animation = animation(this.canvas)
    }
    animate() {
        this.animation.update()
        this.animation.render()
        requestAnimationFrame(() => this.animate())
    }
}
