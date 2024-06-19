import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Sprite, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetoInteracao: any
    private empresa?: Actor

    private listaImagens?: Sprite[]

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
        // Adicionar classe na div criada (caseTexto)
        this.caseTexto.classList.add("sobre-gamifica")

        // defiinir opacidade do elemento para 1 = visivel
        this.caseTexto.style.opacity = "1"

        // inserir caseTexto no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.caseTexto)

        // Para voltar para cena
        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Esc) {
                engine.goToScene("exposicao")
            }
        })

        this.empresa = new Actor({
            pos: vec(engine.drawWidth - 260, engine.halfDrawHeight)
        })

        // Carregar imagem das empresas
        let imagemEmpresa1 = Resources.Img1.toSprite()
        let imagemEmpresa2 = Resources.Atendente.toSprite()
        let imagemEmpresa3 = Resources.Img3.toSprite()

        this.listaImagens = [imagemEmpresa1, imagemEmpresa2, imagemEmpresa3]

    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        //Remover elemento texto da tela
        this.caseTexto!.style.opacity = "0"
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        //Adicionando a caixinha novamente elemento texto da tela
        this.caseTexto!.style.opacity = "1"

        // pegar dados vindo da cena passada/ receber os dados da cena anterior
        this.objetoInteracao = context.data

        console.log(this.objetoInteracao);

        //  se for a mesa a 
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_a") {

            this.textoDaCena = "Essa é a descrição do case A"

            // Mesa A detectada 
            this.caseTexto!.innerHTML = ` <h2>${this.textoDaCena} </h2> 
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`


            // Inserir sprite da mesa A
            this.empresa?.graphics.add(this.listaImagens![1])

            // Mudar zoom da imagem -> se necessario
            this.empresa!.graphics.current!.scale = vec(0.2, 0.2)

        }

        // se for b
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_b") {
            
            this.textoDaCena = "Essa é a descrição do case B"

            // Mesa B detectada
            this.caseTexto!.innerHTML = ` <h2>${this.textoDaCena}  </h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`


            // adicionar titulo e paragrafo dentro do conteudo da div

            // Inserir sprite da mesa B
            this.empresa?.graphics.add(this.listaImagens![1])

            this.empresa!.graphics.current!.scale = vec(0.2, 0.2)
        }

        // se for c
        if (this.objetoInteracao.nomeDoActor == "mesa_stand_c") {

            this.textoDaCena = "Essa é a descrição do case C"
            
            // adicionar titulo e paragrafo dentro do conteudo da div
            this.caseTexto!.innerHTML = ` <h2>${this.textoDaCena}  </h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`
       
            // Inserir sprite da mesa C
            this.empresa?.graphics.add(this.listaImagens![1])

            this.empresa!.graphics.current!.scale = vec(0.2, 0.2)
        }


        this.add(this.empresa!)
    }


}
