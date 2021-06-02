precision highp float;

attribute vec3 position;


varying vec3 vPos;
varying vec2 num;
uniform vec2 constNum;

uniform mat4 matrix;

void main() {
    num = constNum;
    vPos = position;
    gl_Position = matrix * vec4(position, 1);
}
