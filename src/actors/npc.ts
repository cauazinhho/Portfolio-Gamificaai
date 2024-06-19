import { Actor, CollisionType, Color, Engine, SpriteSheet, Vector } from "excalibur";
import { Resources } from "../resources";


export class Npc extends Actor {
    constructor(posicao: Vector, cor: Color, nome: string) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: nome,
            color: cor,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(engine: Engine<any>): void {
        const npcSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.NpcSpriteSheet,
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
         





    }
}