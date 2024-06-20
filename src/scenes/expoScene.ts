import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { Npc } from "../actors/npc";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        // Ativar o modo de Debug
        engine.toggleDebug()

        // Carregar musica de fundo (BGM)
        let musicaFundo = Resources.FreshPrinceBGM

        // Configurar a musica e executar
        musicaFundo.loop = true

        // Fazendo a musica toca, com o volume
        // musicaFundo.play(0.5)

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

        // Carregar o spawnpoint do player
        let spawnPoint = tiledMap.getObjectsByName("player_spawn")[0]

        // Criação e configuração do player 
        let jogador = new Player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsetY))

        // Define z-index do player, util ser outro elemento estiver por cima do player
        jogador.z = 1

        // Adicionando o player em cena
        this.add(jogador)

        // Pegar spawnpoint dos NPCs
        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPointB = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]

        // Configurando NPCs
        let npcA = new Npc(
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),
           npcSpawnPointA.tiledObject.name!
        )

        let npcB = new Npc(
            vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY),
            npcSpawnPointB.tiledObject.name!

        )

        let npcC = new Npc(
            vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),
            npcSpawnPointC.tiledObject.name!

        )

        // Adicionar os NPCs
        this.add(npcA)
        this.add(npcB)
        this.add(npcC)

        // Focar a camera no player
        this.camera.strategy.lockToActor(jogador)
        // this.camera.zoom = 1.2

        // Adicionar colisão com cada objeto
        // Pegar a camada de objetos colisores
        let camadaObjetosColisores = tiledMap.getObjectLayers("ObjetosColisores")[0]

        // Percorrer objetos com forEach e para cada objeto, renderizar um actor
        camadaObjetosColisores.objects.forEach(objeto => {

            // Configurar o actor
            const objetoAtual = new Actor({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed


            })

            // Adicionar o colisor objeto na cena
            this.add(objetoAtual)
        })

    }
}
