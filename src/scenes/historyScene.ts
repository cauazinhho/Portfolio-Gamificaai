import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene {
    elementoTexto?: HTMLElement

    //Método para esmaecer um elemento HTML
    fadeOutElement(elemento: HTMLElement) {
        // Pegar opacidade do elemento HTML
        let opacidade = parseFloat(elemento.style.opacity)


        // Repetir diminuição da opacidade
        setInterval(() => {
            // Se o elemento ainda está visivel
            if (opacidade > 0) {
                // Diminuir a opacidade
                opacidade = opacidade - 0.1

                //Atualizar a opacidade do elemento
                elemento.style.opacity = opacidade.toString()

            }

        }, 10)
    }

    // Ao entrar ou sair da cena, utiliza o efeito de transição lenta
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")

        //Criar elemento com a descrição da empresa
        this.elementoTexto = document.createElement("div") as HTMLElement

        //Definir a opacidade do elemento para 1 = visivel
        this.elementoTexto.style.opacity = "1"

        //Inserir elementoTexto no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        //Adicionando classe na div criada (elementoTexto)
        this.elementoTexto.classList.add("sobre-gamifica")

        //Adicionando titulo e paragrafo dentro do conteudo da div
        this.elementoTexto.innerHTML = `<h2>Sobre o GamificaAi</h2>
        
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`



        //Adicionando e Configurando o logoVertical
        let logoVertical = new Actor({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight),
        })

        //Carregando a imagem do logo
        let imagemLogoVertical = Resources.LogoVertical.toSprite()
        imagemLogoVertical.scale = vec(0.7, 0.7)

        //Adicionar imagem do Actor
        logoVertical.graphics.add(imagemLogoVertical)

        //Rederizar actor na tela/cena
        this.add(logoVertical)

        //Configurar a cena para monitorar o evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter || event.key == Keys.NumpadEnter) {

                //Criar transição suave do elemento texto
                this.fadeOutElement(this.elementoTexto!)

                engine.goToScene("gamificacao")
            }
        })

    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        //Remover elemento texto da tela
        this.elementoTexto?.remove()
    }
}


