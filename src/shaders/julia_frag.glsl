precision highp float;
varying vec3 vPos;
varying vec2 num;

int isInJulia(float real, float imag){
    float currentReal = real;
    float currentImag = imag;

    for(int i=0;i<500;++i)//precision
    {
        float firsts = currentReal * currentReal;
        float outer = currentReal * currentImag;
        float inners = currentImag * currentReal;
        float lasts = (currentImag * currentImag) * -1.0;

        currentReal = firsts+lasts + num.x;
        currentImag = outer + inners + num.y;
         if (currentReal * currentReal + currentImag * currentImag > 4.0){
             return i;
         }
    }


    return -1;
}

void main(){
    int iter = isInJulia(vPos.x, vPos.y);
    
    if (iter < 0){
        gl_FragColor = vec4(0.0823, 0.0862, 0.360, 1);
    } else {
        gl_FragColor = vec4(0,0,0, 0);
    } 
}

