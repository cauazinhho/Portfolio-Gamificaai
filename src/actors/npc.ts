import { Animation, Actor, CollisionType, Color, Engine, SpriteSheet, Vector } from "excalibur";
import { Resources } from "../resources";


export class Npc extends Actor {
    constructor(posicao: Vector, nome: string) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: nome,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Carregando os sprites
        const spriteNpcA = SpriteSheet.fromImageSource({
            image: Resources.NpcASpriteSheet,
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

        const spriteNpcB = SpriteSheet.fromImageSource({
            image: Resources.NpcBSpriteSheet,
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

        const spriteNpcC = SpriteSheet.fromImageSource({
            image: Resources.NpcCSpriteSheet,
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

        // Definir o sprite de acordo com o NPC
        let spriteDefinido

        if (this.name == "npc_a") {
            spriteDefinido = spriteNpcA
        } else if (this.name == "npc_b") {
            spriteDefinido = spriteNpcB

        } else if (this.name == "npc_c") {
            spriteDefinido = spriteNpcC
        } else {
            console.log("Nome do NPC não previsto:", this.name); // Tratamento de erro

        }

        // Se tiver um sprite definido -> Criar animação
        if (spriteDefinido) {
            //Idle Down
            const downIdle1 = new Animation({
                frames: [
                    { graphic: spriteDefinido.getSprite(18, 1) },
                    { graphic: spriteDefinido.getSprite(19, 1) },
                    { graphic: spriteDefinido.getSprite(20, 1) },
                    { graphic: spriteDefinido.getSprite(21, 1) },
                    { graphic: spriteDefinido.getSprite(22, 1) },
                    { graphic: spriteDefinido.getSprite(23, 1) },
                ],
                frameDuration: 70
            })

            this.graphics.add(downIdle1)



            // Criando as animações do player
            const duracaoFrameAnimacao = 70

            const downIdle2 = new Animation({
                frames: [
                    { graphic: spriteNpcB.getSprite(18, 1) },
                    { graphic: spriteNpcB.getSprite(19, 1) },
                    { graphic: spriteNpcB.getSprite(20, 1) },
                    { graphic: spriteNpcB.getSprite(21, 1) },
                    { graphic: spriteNpcB.getSprite(22, 1) },
                    { graphic: spriteNpcB.getSprite(23, 1) },
                ],
                frameDuration: duracaoFrameAnimacao
            })
            const downIdle3 = new Animation({
                frames: [
                    { graphic: spriteNpcA.getSprite(18, 1) },
                    { graphic: spriteNpcA.getSprite(19, 1) },
                    { graphic: spriteNpcA.getSprite(20, 1) },
                    { graphic: spriteNpcA.getSprite(21, 1) },
                    { graphic: spriteNpcA.getSprite(22, 1) },
                    { graphic: spriteNpcA.getSprite(23, 1) },
                ],
                frameDuration: duracaoFrameAnimacao
            })
        }

    }
}