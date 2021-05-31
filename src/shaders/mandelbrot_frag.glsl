precision highp float;
varying vec3 vPos;

bool isInMandlebrot(float real, float imag){
    float originalReal = real;
    float originalImag = imag;
    float currentReal = real;
    float currentImag = imag;

    for(int i=0;i<80;++i)
    {
        float firsts = currentReal * currentReal;
        float outer = currentReal * currentImag;
        float inners = currentImag * currentReal;
        float lasts = currentImag * currentImag * -1.0;

        currentReal = firsts+lasts + originalReal;
        currentImag = outer + inners + originalImag;
         if (sqrt(currentReal * currentReal + currentImag * currentImag) > 2.0){
             return false;
         }
    }


    return true;
}

void main(){
    if(isInMandlebrot(vPos.x, vPos.y)){
        gl_FragColor = vec4(0,0.4,0.8, 1);
    } else {
        gl_FragColor = vec4(0,0,0, 0);
    }
    
}

