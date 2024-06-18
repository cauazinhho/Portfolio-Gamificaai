import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetoInteracao: any

    private textoDaCena?: string = ""
    caseTexto?: HTMLElement

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray
        // criar elemento com descricao da empresa
        this.caseTexto = document.createElement("div") as HTMLElement
        // defiinir opacidade do elemento para 1 = visivel
        this.caseTexto.style.opacity = "1"
        // inserir caseTexto no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.caseTexto)
        
        // Adicionar classe na div criada (caseTexto)
        this.caseTexto.classList.add("sobre-gamifica")
        
        engine.input.keyboard.on("press", (event) => {
                if (event.key == Keys.E) {
                    engine.goToScene("expoScene")
                }
        
        })
    }
    
    onActivate(context: SceneActivationContext<unknown>): void {
        // pegar dados vindo da cena passada
        this.objetoInteracao = context.data
        
        console.log(this.objetoInteracao);
        
        //  se for a mesa a 
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {
            this.textoDaCena = "Essa é a descrição do case A"
            // adicionar titulo e paragrafo dentro do conteudo da div
            this.caseTexto!.innerHTML = ` <h2>${this.textoDaCena}😉  </h2>`
            
            //Carregando a imagem do logo
            let imagemTec = Resources.Tec.toSprite()
            
            //Definir o tamanho da imagem
            imagemTec.scale = vec(0.5, 0.5)
            
            //Adicionar imagem do Actor
            let actorTec = new Actor({
                pos: vec(-300, 300)
            })
            
            actorTec.graphics.add(imagemTec)
            
            //Rederizar actor na tela/cena
            this.add(actorTec)
            
        }
        
        // se for b
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_b") {
            this.textoDaCena = "Essa é a descrição do case B"
            // adicionar titulo e paragrafo dentro do conteudo da div
            this.caseTexto!.innerHTML = ` <h2>${this.textoDaCena}😉  </h2>`
            
        }
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_c") {
            this.textoDaCena = "Essa é a descrição do case C"
            // adicionar titulo e paragrafo dentro do conteudo da div
            this.caseTexto!.innerHTML = ` <h2>${this.textoDaCena}😉  </h2>`
        }
        
        
        
    }
    
}
