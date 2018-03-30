import {Aligner} from "./Objects/Aligner";
import {BaseParticleSystem} from "./Objects/BaseParticleSystem";
import {BlackScreen} from "./Objects/BlackScreen";
import {Board} from "./Objects/Board";
import {Button} from "./Objects/Button";
import {Camera} from "./Objects/Camera";
import {IO} from "./Objects/IO";
import {O} from "./Objects/O";
import {ParticleSystem} from "./Objects/ParticleSystem";
import {TextBox} from "./Objects/TextBox";
import {ToolBar} from "./Objects/ToolBar";

export let ObjectNames = {
  Aligner :Aligner,
  BaseParticleSystem :BaseParticleSystem,
  BlackScreen :BlackScreen,
  Board :Board,
  Button :Button,
  Camera :Camera,
  IO :IO,
  O :O,
  ParticleSystem :ParticleSystem,
  TextBox :TextBox,
  ToolBar :ToolBar,
};
export let LevelNames = [
  "levels/game.tmx",
  "levels/menu.tmx",
  "levels/modal.tmx",
  "levels/npgame.tsx",
];