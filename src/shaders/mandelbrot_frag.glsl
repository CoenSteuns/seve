precision highp float;
varying vec3 vPos;

int isInMandlebrot(float real, float imag){
    float originalReal = real;
    float originalImag = imag;
    float currentReal = real;
    float currentImag = imag;

    for(int i=0;i<500;++i)//precision
    {
        float firsts = currentReal * currentReal;
        float outer = currentReal * currentImag;
        float inners = currentImag * currentReal;
        float lasts = currentImag * currentImag * -1.0;

        currentReal = firsts+lasts + originalReal;
        currentImag = outer + inners + originalImag;
         if (sqrt(currentReal * currentReal + currentImag * currentImag) > 2.0){
             return i;
         }
    }


    return -1;
}

void main(){
    int iter = isInMandlebrot(vPos.x, vPos.y);
    
    if (iter < 0){
        gl_FragColor = vec4(0.0823, 0.0862, 0.360, 1);
    } else if (iter < 100){
        gl_FragColor = vec4(0,0,0, 0);
    } else if(iter > 100){
        float iters = float(iter);
        float pol = 1.0/(500.0-100.0)*(iters-100.0);
        vec4 color = mix(vec4(0,0,0, 0), vec4(0.0823, 0.0862, 0.360, 1), pol);
        gl_FragColor = color;
    }
}

