import numpy as np
from PIL import Image
def tela(W,H,seed,KK=0.22,SHARP=2.4,LINES=0.38,PER=3.2,SPEC=0.48,EXP=22):
    rng=np.random.default_rng(seed)
    y,x=np.mgrid[0:H,0:W].astype(np.float32); s=max(W,H); X=x/s; Y=y/s
    h=np.zeros_like(X)
    for i in range(3):
        a=rng.uniform(0,np.pi); f=rng.uniform(0.45,1.1)*(1+i*0.6); amp=1.0/(1+i*1.2)
        warp=rng.uniform(0.10,0.30)*np.sin(2*np.pi*(rng.uniform(0.3,0.8)*(X*np.sin(a)-Y*np.cos(a)))+rng.uniform(0,6))
        u=X*np.cos(a)+Y*np.sin(a)+warp
        h+=amp*np.tanh(SHARP*np.sin(2*np.pi*f*u+rng.uniform(0,6)))
    gy,gx=np.gradient(h); k=s*KK
    n=np.dstack([-gx*k,-gy*k,np.ones_like(h)]); n/=np.linalg.norm(n,axis=2,keepdims=True)
    L=np.array([-0.55,-0.65,0.52]); L/=np.linalg.norm(L); Hh=(L+[0,0,1]); Hh/=np.linalg.norm(Hh)
    diff=np.clip((n*L).sum(2),0,1); spec=np.clip((n*Hh).sum(2),0,1)**EXP
    hn=(h-h.min())/(h.max()-h.min()); ao=0.35+0.65*hn**1.3          # oclusión: valles más oscuros = profundidad
    val=(0.012+0.09*diff**3)*ao+SPEC*spec
    # líneas finas tecnológicas que siguen el pliegue (curvas de nivel del relieve)
    lines=0.5+0.5*np.cos(2*np.pi*(h*s/(PER*4.0)))
    val*=1+LINES*(lines-0.5)*2*np.clip(spec*2.5+diff*0.4,0,1)
    vx=(x/W-0.5)*2; vy=(y/H-0.45)*2
    val*=np.clip(1-0.6*(vx**2*0.8+vy**2*0.9),0.2,1)
    val=np.clip(val,0,1)
    rgb=np.dstack([val*0.97,val*0.98,val])             # gris acero, levemente frío
    out=np.maximum(rgb,np.array([10,10,11])/255)+rng.normal(0,0.004,(H,W,3))
    return Image.fromarray((np.clip(out,0,1)*255).astype(np.uint8))
if __name__=="__main__":
    ims=[]
    for kw in [dict(),dict(LINES=0.55,PER=2.4),dict(KK=0.3,SPEC=0.6,EXP=30)]:
        ims.append(tela(540,960,21,**kw).resize((270,480)))
    sh=Image.new('RGB',(810,480)); [sh.paste(im,(i*270,0)) for i,im in enumerate(ims)]; sh.save('variantes2.png')
