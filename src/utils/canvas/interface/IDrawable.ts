export interface IDrawable {
    draw: () => void; 
    resetViewport: () => void;
    removeContext: () => void;
}