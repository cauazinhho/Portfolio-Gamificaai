import { Actor, Color, Engine, FadeInOut, Font, Keys, Label, Scene, TextAlign, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class welcomeScene extends Scene {
    textoIniciar?: Label

    // Ao entrar ou sair da cena, utiliza o efeito de transição lenta
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction, 
            color: Color.Black,
            duration: 1000
        })
    }

    //Ou Seja, o onInitialize é pra quando iniciar uma cena
    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Violet


        //Configura o objeto para ser a frase Bem-Vindo
        //CRIAÇÃO DO MENU DO GAME
        let fraseBemVindo = new Label({
            text: "Bem vindo ao Portfolio",
            width: 400,
            height: 50,
            // Posição X = metade da tela, Posição Y 300
            pos: vec(engine.drawWidth / 2, 300),
            font: new Font({
                color: Color.White,
                size: 40,
                textAlign: TextAlign.Center,
                family: "Anta"
            })
        })

        this.textoIniciar = new Label({
            text: 'Pressione "Enter" para iniciar...',
            height: 50,
            width: 200,

            pos: vec(engine.drawWidth / 2, 630),
            font: new Font({
                color: Color.White,
                size: 20,
                textAlign: TextAlign.Center,
                family: "Anta"
            })


        })

        //Adiciona a frase na cena (tela)
        this.add(fraseBemVindo)

        //Configurar o ator do logo
        let actorLogo = new Actor({
            pos: vec(engine.drawWidth / 2, 430),
        })

        //Utilizar imagem do logo
        let imagemLogo = Resources.Logo.toSprite()

        // Aplicar zoom na imagem
        imagemLogo.scale = vec(0.4, 0.4)

        //Configurar o actor para usar a imagem
        actorLogo.graphics.add(imagemLogo)

        //Adicionando logo na tela
        this.add(actorLogo)

        // Criação do textoIniciar - Pressione "Enter" para iniciar...

        this.add(this.textoIniciar)
        
        // onPreUpdate(engine: Engine<any>, delta: number): void {
            //     this.textoIniciar?.actions.fade(0 , 1000)
            //     this.textoIniciar?.actions.fade(1000 , 0)
            // }
            
            //Configurar para ficar piscando
            
            this.textoIniciar?.actions.repeatForever(context => {
                context.fade(0, 1000)
                context.fade(1, 1000)
            })
            
            //Monitora o evento da tecla pressionada
            this.input.keyboard.on("press", (event) => {
                // Caso a tecla pressionada for "Enter", deve ir para proxima cena
                if (event.key == Keys.Enter || event.key == Keys.NumpadEnter) {
                    //Direciona para a cena Historia
                    engine.goToScene("historia")
                }
            })
        }
}