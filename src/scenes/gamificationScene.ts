import { Actor, Color, Engine, Scene, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene {
    elementoHTML?: HTMLElement

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")


        this.elementoHTML = document.createElement("div") as HTMLElement
        this.elementoHTML.style.opacity = "1"

        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame?.appendChild(this.elementoHTML)

        this.elementoHTML.classList.add(".sobre-gamificacao")

        this.elementoHTML.innerHTML = `<h2>O que é gamificação?</h2>
    
        <p>Gamificação é a aplicação de elementos típicos de jogos em contextos não lúdicos, com o objetivo de engajar e motivar indivíduos a atingir determinados objetivos. Esta abordagem se utiliza de componentes como pontuação, níveis, recompensas, desafios, e feedback imediato, visando promover comportamentos desejados e aumentar a participação e o comprometimento dos participantes.</p>`

        this.elementoHTML.classList.add("gamificacao")


        

        //Carregando a imagem do logo
        let imagemFuria = Resources.Furia.toSprite()

        //Definir o tamanho da imagem
        imagemFuria.scale = vec(0.7, 0.7)

        //Adicionar imagem do Actor
        let actorFuria = new Actor ({
            pos: vec(300, engine.halfDrawHeight)
        })

        actorFuria.graphics.add(imagemFuria)

        //Rederizar actor na tela/cena
        this.add(actorFuria)

    }

}