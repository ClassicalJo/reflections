export class Cloud {
    constructor(pos, src, size) {
        this.pos = pos
        this.src = src
        this.size = size
        this.width = 177
        this.height = 57
    }
    update() {
        let width = this.width * this.size
        this.pos.x -= this.size/10
        if (this.pos.x < -width) this.pos.x = 505 + width
    }
    render(ctx) {
        let width = this.width * this.size
        let height = this.height * this.size
        ctx.drawImage(this.src, this.pos.x, this.pos.y, width, height)
    }
}
