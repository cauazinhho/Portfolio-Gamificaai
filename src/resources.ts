import { ImageFiltering, ImageSource, Loader, Sound } from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logoVertical from "./images/logo-vertical.png";
import furia from "./images/furia.png"
import tec from "./images/tec.png"

import img1 from "./images/img1.jpg"
import atendente from "./images/atendente c.jpg"
import img3 from "./images/img.3.jpg"


import ritmada from "./sounds/ritmada_zelda.mp3"
import zelda from "./sounds/zelda.mp3"
import prince from "./sounds/freshprince.mp3"

import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic.tsx?url"
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url"
import tsxBibliotecaPath from "./maps/tileset_biblioteca.tsx?url"

import tmxMapaPath from "./maps/showroom_map.tmx?url"

// import do Player
import playerSpritePath from "./sprites/player.png"
import npcSpritePath from "./sprites/npc.png"




export const Resources = {

RitmadaBGM: new Sound(ritmada),
ZeldaBGM: new Sound(zelda),
FreshPrinceBGM: new Sound(prince),

Img1: new ImageSource(img1),
Atendente: new ImageSource(atendente),
Img3: new ImageSource(img3),

  Tec: new ImageSource(tec),
  PlayerSpriteSheet: new ImageSource(playerSpritePath, {filtering: ImageFiltering.Pixel}),
  NpcSpriteSheet: new ImageSource(npcSpritePath, {filtering: ImageFiltering.Pixel}),
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  LogoVertical: new ImageSource(logoVertical),
  Furia: new ImageSource(furia),
  Mapa: new TiledResource(tmxMapaPath, {
    pathMap: [
      {path: "showroom_map.tmx", output: tmxMapaPath},
      {path: "Room_Builder_32x32.png", output: pngTilesetPath},
      {path: "tileset_paredes", output: tsxParedesPath},
      {path: "tileset_generic.tsx", output: tsxGenericPath},
      {path: "tileset_estoque.tsx", output: tsxEstoquePath},
      {path: "tileset_biblioteca.tsx", output: tsxBibliotecaPath}
    ]
  })

} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
