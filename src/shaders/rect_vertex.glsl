precision highp float;

attribute vec3 position;
varying vec3 vPos;

uniform mat4 matrix;

void main() {
    vPos = position;
    gl_Position = matrix * vec4(position, 1);
}
