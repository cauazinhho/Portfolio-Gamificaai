import { Color, Direction, Engine, FadeInOut, Resource, Scene, Transition, vec } from "excalibur";
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

        //Definir offset para renderizar no mapa/ Ajustando o mapa que ficou torno
        let offsetX = 138
        let offsetY = 100

        //Adicionar o mapa na cena
        tiledMap.addToScene(this, {
            pos: vec(offsetX, offsetY),

        })

        //Definir o zoom da camera da cena
        this.camera.zoom = 1.1

        // Criação e configuração do player 
        let jogador = new Player()

        // Define z-index do player, util ser outro elemento estiver por cima do player
        jogador.z = 1

        // Adicionando o player em cena
        this.add(jogador)
    }
}
