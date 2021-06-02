import type Vector2 from "../../math/Vector2";

export interface IControlable2D  {
    move: (v: Vector2) => void;
    zoom: (y: number) => void; 
}