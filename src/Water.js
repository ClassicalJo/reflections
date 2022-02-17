export class Water {
    constructor(originCanvas) {
        this.origin = originCanvas
        this.lifetime = 0
        this.mapTarget = this.createCanvas()
        this.turbulence = this.setTurbulence()
        this.dissolveMap = this.setDissolveMap()
    
        this.target = this.createCanvas()
        this.displacement = this.setDisplacement()        
        this.animation = this.setAnimation() 
    }
    setTurbulence(){
        return kampos.effects.turbulence({
            noise: kampos.noise.perlinNoise,
            frequency: { x: 0.025, y: 1 },
            octaves: 1,
            isFractal: true,
        })
    }
    setDissolveMap(){
        let dissolveMap = new kampos.Kampos({
            target: this.mapTarget,
            effects: [this.turbulence],
            noSource: true
        });
        dissolveMap.play(time => this.turbulence.time = time * 10)
        return dissolveMap
    }
    setDisplacement() {
        let displacement = kampos.effects.displacement()
        displacement.map = this.mapTarget
        displacement.scale = { x: 0.05, y: 0 }
        displacement.textures[0].update = true
        return displacement
    }
    setAnimation(){
        let animation = new kampos.Kampos({
            target: this.target, effects: [this.displacement]
        });
        animation.setSource({
            media: this.origin,
            width: this.origin.width,
            height: this.origin.height
        })
        return animation
    }
    update() {
        this.lifetime++
        this.animation.draw(this.lifetime)
    }
    
    createCanvas() {
        let canvas = document.createElement('canvas')
        let { width, height } = this.origin
        canvas.width = width
        canvas.height = height
        return canvas
    }
}

