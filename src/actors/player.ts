import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {

    // Propriedades do player
    private velocidade: number = 215 //180 antes
    private ultimaDirecao: string = "down"

    private temObjetoProximo: boolean = false
    private ultimoColisor?: Collider

    // Configuração do player/ Montando o jogador
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 35,
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
                    y: 0
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

        // this.graphics.use("left-idle")

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


        //Idle Up
        const upIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6, 1) },
                { graphic: playerSpriteSheet.getSprite(7, 1) },
                { graphic: playerSpriteSheet.getSprite(8, 1) },
                { graphic: playerSpriteSheet.getSprite(9, 1) },
                { graphic: playerSpriteSheet.getSprite(10, 1) },
                { graphic: playerSpriteSheet.getSprite(11, 1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("up-idle", upIdle)


        //Idle Down
        const downIdle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(18, 1) },
                { graphic: playerSpriteSheet.getSprite(19, 1) },
                { graphic: playerSpriteSheet.getSprite(20, 1) },
                { graphic: playerSpriteSheet.getSprite(21, 1) },
                { graphic: playerSpriteSheet.getSprite(22, 1) },
                { graphic: playerSpriteSheet.getSprite(23, 1) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("down-idle", downIdle)

        // Definir a animação inicial do player
        this.graphics.use("down-idle")

        // Definir o zoom do player
        // this.graphics.current!.scale = vec(1.5, 1.5)

//////////////////////////////////////////////////////////////////////////////////////

        // Animações Walk

        // Andar para esquerda
        const leftWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12, 2) },
                { graphic: playerSpriteSheet.getSprite(13, 2) },
                { graphic: playerSpriteSheet.getSprite(14, 2) },
                { graphic: playerSpriteSheet.getSprite(15, 2) },
                { graphic: playerSpriteSheet.getSprite(16, 2) },
                { graphic: playerSpriteSheet.getSprite(17, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("leaf-walk", leftWalk)

        // Andar para direita
        const rightWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(0, 2) },
                { graphic: playerSpriteSheet.getSprite(1, 2) },
                { graphic: playerSpriteSheet.getSprite(2, 2) },
                { graphic: playerSpriteSheet.getSprite(3, 2) },
                { graphic: playerSpriteSheet.getSprite(4, 2) },
                { graphic: playerSpriteSheet.getSprite(5, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("right-walk", rightWalk)

        // Andar para cima
        const upWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(6, 2) },
                { graphic: playerSpriteSheet.getSprite(7, 2) },
                { graphic: playerSpriteSheet.getSprite(8, 2) },
                { graphic: playerSpriteSheet.getSprite(9, 2) },
                { graphic: playerSpriteSheet.getSprite(10, 2) },
                { graphic: playerSpriteSheet.getSprite(11, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("up-walk", upWalk)

        // Andar para baixo
        const downWalk = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(18, 2) },
                { graphic: playerSpriteSheet.getSprite(19, 2) },
                { graphic: playerSpriteSheet.getSprite(20, 2) },
                { graphic: playerSpriteSheet.getSprite(21, 2) },
                { graphic: playerSpriteSheet.getSprite(22, 2) },
                { graphic: playerSpriteSheet.getSprite(23, 2) },
            ],
            frameDuration: duracaoFrameAnimacao
        })

        this.graphics.add("down-walk", downWalk)



        // Configurar player para monitorar evento "hold" -> que é ao segurar a tecla
        engine.input.keyboard.on("hold", (event) => {
            //Detectar qual tecla está pressionada

            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // Mover para esquerda
                    // Definir a velocidade x para negativa, que significa movimentar o player para esquerda
                    this.vel.x = -this.velocidade

                    // Definir a animação
                    this.graphics.use(leftWalk)
                    this.graphics.current!.scale = vec(1, 1)
                    
                    // Guardar ultima direção
                    this.ultimaDirecao = "left"

                    break;

                case Keys.Right:
                case Keys.D:
                    this.vel.x = this.velocidade

                    this.graphics.use(rightWalk)
                    this.graphics.current!.scale = vec(1, 1)

                    // Guardar ultima direção
                    this.ultimaDirecao = "right"

                    break;

                case Keys.Up:
                case Keys.W:
                    this.vel.y = -this.velocidade

                    this.graphics.use(upWalk)
                    this.graphics.current!.scale = vec(1, 1)

                    // Guardar ultima direção
                    this.ultimaDirecao = "up"

                    break;

                case Keys.Down:
                case Keys.S:
                    this.vel.y = this.velocidade

                    this.graphics.use(downWalk)
                    this.graphics.current!.scale = vec(1, 1)

                    // Guardar ultima direção
                    this.ultimaDirecao = "down"

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

            // Ao parar o player, definir animação idle da ultima direção
            if (this.vel.x == 0 && this.vel.y == 0 ) {
                // ultimaDirecao - left, right, up, down
                // Colar a ultimaDirecao + -idle -> ex. left-idle, right-idle, up-idle, down-idle
                this.graphics.use(this.ultimaDirecao + "-idle")
                this.graphics.current!.scale = vec(1, 1)
                
            }
        })

        // Configurar o player para monitorar evento pressionando f ou e
        engine.input.keyboard.on("press", (event) => {
            if (event.key == Keys.F || event.key == Keys.E && this.temObjetoProximo) {
                
                // Identificar o alvo da interação
                if (this.ultimoColisor?.owner.name == "mesa_stand_a") {
                    // Vai para a cena passando qual o objeto da interação
                    engine.goToScene("case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor?.owner.name  
                        }
                    })
                }

                if (this.ultimoColisor?.owner.name == "mesa_stand_b") {
                      // Vai para a cena passando qual o objeto da interação
                      engine.goToScene("case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor?.owner.name  
                        }
                    })
                }

                if (this.ultimoColisor?.owner.name == "mesa_stand_c ") {
                      // Vai para a cena passando qual o objeto da interação
                      engine.goToScene("case", {
                        sceneActivationData: {
                            nomeDoActor: this.ultimoColisor?.owner.name  
                        }
                    })
                }


            }
        })
    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Indicar que tem um objeto proximo
        this.temObjetoProximo = true

        // Registrar o ultimo objeto colidindo
        this.ultimoColisor = other      
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        // Detectar se o player está distante do ultimo objeto colidido
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 40) {
            // Marcar que o objeto não está próximo
            this.temObjetoProximo = false

            console.log("Está longe");
            
        }
    }
}

