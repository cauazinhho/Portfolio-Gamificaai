import { Color, Direction, Engine, FadeInOut, Resource, Scene, Transition } from "excalibur";
import { Resources } from "../resources";

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

        //Adicionar o mapa na cena
        tiledMap.addToScene(this)


    }

}
