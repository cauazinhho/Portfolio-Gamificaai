import { Actor, Animation, CollisionType, Color, Engine, Keys, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {

    // Propriedades do player
    private velocidade: number = 180

    // Configuração do player/ Montando o jogador
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: "Jogador",
            color: Color.Cyan,
            collisionType: CollisionType.Active

        })
    }

    onInitialize(engine: Engine<any>): void {
        // Configurar o spritesheet do player
        const playerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 8
                }
            }
        })

        // Criando as animações do player
        const duracaoFrameAnimacao = 70
        // Animações Idle

        //Idle esquerda
        const leftIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12, 1) },
                { graphic: playerSpriteSheet.getSprite(13, 1) },
                { graphic: playerSpriteSheet.getSprite(14, 1) },
                { graphic: playerSpriteSheet.getSprite(15, 1) },
                { graphic: playerSpriteSheet.getSprite(16, 1) },
                { graphic: playerSpriteSheet.getSprite(17, 1) },
            ], 
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("left-idle", leftIdle)

        this.graphics.use("left-idle")

        //Idle direita
        const rightIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0, 1) },
                { graphic: playerSpriteSheet.getSprite(1, 1) },
                { graphic: playerSpriteSheet.getSprite(2, 1) },
                { graphic: playerSpriteSheet.getSprite(3, 1) },
                { graphic: playerSpriteSheet.getSprite(4, 1) },
                { graphic: playerSpriteSheet.getSprite(5, 1) },
            ], 
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("right-idle", rightIdle)

        this.graphics.use("right-idle")



        // Configurar player para monitorar evento "hold" -> que é ao segurar a tecla
        engine.input.keyboard.on("hold", (event) => {
            //Detectar qual tecla está pressionada

            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // Mover para esquerda
                    // Definir a velocidade x para negativa, que significa movimentar o player para esquerda
                    this.vel.x = -this.velocidade
                    break;

                case Keys.Right:
                case Keys.D:
                    this.vel.x = this.velocidade
                    break;

                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade
                    break;

                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade
                    break;

                default:
                    // Zera a velocidade do player, PARA a movimentação 
                    this.vel.x = 0
                    this.vel.y = 0

                    break;
            }
        })


        // Configura o player para movimentar evento "realese" -> soltar
        engine.input.keyboard.on("release", (event) => {
            //Fazer o player parar ao soltar as teclas de movimentação
            //Parar movimentação lateral ao soltar as teclas de movimentação lateral 

            if (
                event.key == Keys.A ||
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                //Zerar velocidade horizontal
                this.vel.x = 0
            }

            if (
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                //Zerar velocidade vertical
                this.vel.y = 0
            }

        })
    }
}

