import { Actor, CollisionType, Color, Engine, FadeInOut, HiddenEvent, Scene, Transition, obsolete, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Para carregar o mapa
        let tiledMap = Resources.Mapa

        // Definir offset para renderizar no mapa/ Ajustando o mapa que ficou torno
        let offsetX = 138
        let offsetY = 100

        // Adicionar o mapa na cena
        tiledMap.addToScene(this, {
            pos: vec(offsetX, offsetY),

        })

        // Definir o zoom da camera da cena
        this.camera.zoom = 1.1

        // Criação e configuração do player 
        let jogador = new Player()

        // Define z-index do player, util ser outro elemento estiver por cima do player
        jogador.z = 1

        // Adicionando o player em cena
        this.add(jogador)

        // Adicionar colisão com cada objeto
        // Pegar a camada de objetos colisores
        let camadaObjetosColisores =  tiledMap.getObjectLayers("ObjetosColisores")[0]

        // Percorrer objetos com forEach e para cada objeto, renderizar um actor
        camadaObjetosColisores.objects.forEach(objeto => {

            // Configurar o actor
            const objetoAtual = new Actor({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed,
                color: Color.Red

            })

            // Adicionar o colisor objeto na cena
            this.add(objetoAtual)
        })

    }
}
