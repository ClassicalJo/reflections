export class Water {
    constructor(originCanvas) {
        this.origin = originCanvas
        this.mapTarget = this.makeMapTarget()
        this.turbulence = kampos.effects.turbulence({
            noise: kampos.noise.perlinNoise,
            frequency: { x: 0.05, y: 1 },
            octaves: 3,
            isFractal: true,
        })
        this.dissolveMap = new kampos.Kampos({
            target: this.mapTarget,
            effects: [this.turbulence],
            noSource: true
        });
        this.dissolveMap.draw();

        this.dissolve = kampos.transitions.dissolve();
        this.dissolve.map = this.mapTarget;
        this.dissolve.high = 0.03;

        this.displacement = kampos.transitions.displacement()
        this.displacement.map = this.mapTarget;
        this.displacement.sourceScale = { x: 0.025 }
        this.displacement.toScale = { x: 0.05 }

        this.target = this.makeMapTarget()
        this.anotherTarget = this.makeMapTarget()

        this.animation = new kampos.Kampos({
            target: this.target, effects: [this.displacement]
        });

        this.animation.setSource({
            media: this.origin,
            width: this.origin.width,
            height: this.origin.height
        })
        this.displacement.to = this.anotherTarget
        this.animation.play(time => {
            this.displacement.progress = 0.18
        })


    }
    makeMapTarget() {
        let canvas = document.createElement('canvas')
        let { width, height } = this.origin
        canvas.width = width
        canvas.height = height
        return canvas
    }
}
