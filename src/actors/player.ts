import { Actor, CollisionType, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor {

    // Propriedades do player
    private velocidade: number = 180

    // Configuração do player/ Montando o jogador
    constructor() {
        super({
            pos: vec(600, 520),
            width: 32,
            height: 40,
            name: "Jogador",
            color: Color.Cyan,
            collisionType: CollisionType.Active

        })
    }

    onInitialize(engine: Engine<any>): void {
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

