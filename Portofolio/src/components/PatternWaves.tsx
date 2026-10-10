import { useEffect, useMemo, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, RenderTarget, Texture } from 'ogl';
import { passVertex, fieldFragment, rippleFragment, markFragment } from './PatternWavesShaders';
import './PatternWaves.css';

const SURFACE_PRESETS: Record<string, any> = {
  silk:     { pattern:'dot',   wave:'silk',   spacing:9,  markSize:0.95, depth:0.95, light:0, shine:0.8, contrast:1.2,  speed:0.35, scale:1,   direction:20  },
  ocean:    { pattern:'dot',   wave:'swell',  spacing:10, markSize:0.9,  depth:0.42, light:0, shine:1,   contrast:1.2,  speed:0.5,  scale:1,   direction:100 },
  pond:     { pattern:'dot',   wave:'ripple', spacing:10, markSize:0.9,  depth:0.55, light:0, shine:1.2, contrast:1.2,  speed:0.5,  scale:1,   direction:35  },
  lines:    { pattern:'line',  wave:'silk',   spacing:12, markSize:0.42, depth:0.9,  light:0, shine:0.6, contrast:1.2,  speed:0.3,  scale:1,   direction:20  },
  terminal: { pattern:'glyph', wave:'ripple', spacing:13, markSize:0.95, depth:0.75, light:0, shine:0.9, contrast:1.4,  speed:0.3,  scale:1.1, direction:200 },
  mesh:     { pattern:'plus',  wave:'silk',   spacing:14, markSize:0.8,  depth:0.95, light:0, shine:1,   contrast:1.45, speed:0.4,  scale:1.1, direction:325 },
};

const PATTERNS: Record<string,number> = { dot:0, square:1, plus:2, line:3, glyph:4 };
const WAVES:    Record<string,number> = { silk:0, swell:1, ripple:2 };
const FADES:    Record<string,number> = { none:0, edges:1, center:2, bottom:3, top:4 };
const DEFAULT_CHARACTERS = '.:-=+*#%@';
const GLYPH_FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const ATLAS_TILE = 128;
const WAVE_UNIT = 520;
const RIPPLE_CELL = 8;
const RIPPLE_RATE = 60;
const PIXEL_BUDGET = 4.5e6;
const INTRO_SECONDS = 2;

const clamp = (v:number,mn:number,mx:number) => Math.min(Math.max(v,mn),mx);
const luminance = (r:number[]) => 0.2126*r[0]+0.7152*r[1]+0.0722*r[2];

const parseColor = (value:string, fallback:number[]): number[] => {
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return fallback;
    ctx.fillStyle = '#000'; ctx.fillStyle = value;
    const s = ctx.fillStyle;
    if (s.startsWith('#')) { const n=parseInt(s.slice(1),16); return [((n>>16)&255)/255,((n>>8)&255)/255,(n&255)/255,1]; }
    const p = s.match(/[\d.]+/g);
    if (!p||p.length<3) return fallback;
    return [+p[0]/255,+p[1]/255,+p[2]/255,p[3]?+p[3]:1];
  } catch { return fallback; }
};

const buildAtlas = (characters:string) => {
  const glyphs = Array.from(characters||DEFAULT_CHARACTERS);
  const columns = Math.ceil(Math.sqrt(glyphs.length));
  const lines = Math.ceil(glyphs.length/columns);
  const canvas = document.createElement('canvas');
  canvas.width = columns*ATLAS_TILE; canvas.height = lines*ATLAS_TILE;
  const ctx = canvas.getContext('2d'); if (!ctx) return null;
  ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.font=`500 ${Math.round(ATLAS_TILE*0.86)}px ${GLYPH_FONT}`;
  glyphs.forEach((g,i) => ctx.fillText(g,(i%columns)*ATLAS_TILE+ATLAS_TILE/2,Math.floor(i/columns)*ATLAS_TILE+ATLAS_TILE/2));
  return { canvas, columns, lines, count:glyphs.length };
};

interface PatternWavesProps {
  preset?: string; pattern?: string; wave?: string;
  spacing?: number; markSize?: number; depth?: number; light?: number;
  shine?: number; contrast?: number; speed?: number; scale?: number; direction?: number;
  color?: string; backgroundColor?: string; opacity?: number;
  fade?: string; fadeSize?: number; characters?: string;
  interactive?: boolean; cursorSize?: number; cursorStrength?: number;
  intro?: boolean; paused?: boolean; className?: string; style?: React.CSSProperties;
}

const PatternWaves: React.FC<PatternWavesProps> = ({
  preset='silk', pattern, wave, spacing, markSize, depth, light, shine, contrast,
  speed, scale, direction, color='#ffffff', backgroundColor='#000000', opacity=1,
  fade='edges', fadeSize=0.5, characters=DEFAULT_CHARACTERS,
  interactive=true, cursorSize=50, cursorStrength=0.6,
  intro=true, paused=false, className='', style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef  = useRef<any>(null);
  const wakeRef      = useRef<(()=>void)|null>(null);

  const base = SURFACE_PRESETS[preset]||SURFACE_PRESETS.silk;
  const pick = (v:any,k:string) => (v===undefined||v===null)?base[k]:v;

  const colors = useMemo(()=>({
    color:      parseColor(color,[1,1,1,1]),
    background: parseColor(backgroundColor,[0,0,0,1]),
  }),[color,backgroundColor]);

  useEffect(()=>{
    settingsRef.current = {
      ...colors,
      pattern:pick(pattern,'pattern'), wave:pick(wave,'wave'),
      spacing:pick(spacing,'spacing'), markSize:pick(markSize,'markSize'),
      depth:pick(depth,'depth'), light:pick(light,'light'),
      shine:pick(shine,'shine'), contrast:pick(contrast,'contrast'),
      speed:pick(speed,'speed'), scale:pick(scale,'scale'),
      direction:pick(direction,'direction'),
      opacity, fade, fadeSize, characters,
      interactive, cursorSize, cursorStrength, intro, paused,
    };
    wakeRef.current?.();
  });

  useEffect(()=>{
    const container = containerRef.current; if (!container) return;
    const renderer = new Renderer({ alpha:true, premultipliedAlpha:true, antialias:false, depth:false });
    const gl = renderer.gl as any;
    if (!renderer.isWebgl2) { gl.getExtension('WEBGL_lose_context')?.loseContext(); return; }
    gl.clearColor(0,0,0,0);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.cssText='display:block;width:100%;height:100%';
    canvas.setAttribute('aria-hidden','true');
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const blank = new Texture(gl);
    const floatTargets = !!gl.getExtension('EXT_color_buffer_float');

    const dispose = (t:any) => { gl.deleteFramebuffer(t.buffer); gl.deleteTexture(t.texture.texture); };
    const fieldRT  = (w:number,h:number) => new RenderTarget(gl,{width:w,height:h,depth:false,minFilter:gl.NEAREST,magFilter:gl.NEAREST});
    const rippleRT = (w:number,h:number) => new RenderTarget(gl,{width:w,height:h,depth:false,type:gl.HALF_FLOAT,format:gl.RGBA,internalFormat:gl.RGBA16F,minFilter:gl.LINEAR,magFilter:gl.LINEAR});

    let fieldTarget = fieldRT(1,1);
    let ripple:any = null;

    const atlasTexture = new Texture(gl,{generateMipmaps:true,minFilter:gl.LINEAR_MIPMAP_LINEAR,magFilter:gl.LINEAR,flipY:false});

    const fu:any = {
      uSize:{value:[1,1]},uDpr:{value:1},uOrigin:{value:[0,0]},uPitch:{value:[1,1]},
      uWave:{value:0},uTime:{value:0},uUnit:{value:WAVE_UNIT},uHeading:{value:[1,0]},
      uAmp:{value:0},uDepth:{value:0.5},uLight:{value:[0,0,1]},uShine:{value:0.8},
      uContrast:{value:1},uInk:{value:0},uOpacity:{value:1},uFade:{value:0},
      uFadeSize:{value:0.5},uAppear:{value:0},tRipple:{value:blank},uRipple:{value:0},
    };
    const fieldMesh = new Mesh(gl,{geometry,program:new Program(gl,{vertex:passVertex,fragment:fieldFragment,uniforms:fu,depthTest:false,depthWrite:false})});

    const ru:any = {
      tState:{value:blank},uTexel:{value:[1,1]},uSize:{value:[1,1]},
      uFrom:{value:[0,0]},uTo:{value:[0,0]},uRadius:{value:40},uImpulse:{value:0},uDamping:{value:0.975},
    };
    const rippleMesh = new Mesh(gl,{geometry,program:new Program(gl,{vertex:passVertex,fragment:rippleFragment,uniforms:ru,depthTest:false,depthWrite:false})});

    const mu:any = {
      tField:{value:fieldTarget.texture},tAtlas:{value:atlasTexture},
      uOrigin:{value:[0,0]},uPitch:{value:[1,1]},uGrid:{value:[1,1]},
      uPattern:{value:0},uMarkSize:{value:0.9},uStroke:{value:2},
      uColor:{value:[1,1,1]},uAccent:{value:[1,1,1]},uBackground:{value:[0,0,0,1]},uAtlas:{value:[1,1,0]},
    };
    const markMesh = new Mesh(gl,{geometry,program:new Program(gl,{vertex:passVertex,fragment:markFragment,uniforms:mu,depthTest:false,depthWrite:false})});

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false;
    let width=1,height=1,raf=0,last=performance.now(),time=0,introClock=0;
    let visible=true,alive=true,dirty=true,rippleUntil=0,rippleLive=false,rippleClock=0,atlasKey='';
    const ptr={x:0,y:0,inside:false,placed:false,lastX:0,lastY:0,burst:0};

    const buildRipple=()=>{
      if(!floatTargets)return;
      const w=clamp(Math.ceil(width/RIPPLE_CELL),4,512),h=clamp(Math.ceil(height/RIPPLE_CELL),4,512);
      if(ripple&&ripple.width===w&&ripple.height===h)return;
      if(ripple){dispose(ripple.read);dispose(ripple.write);}
      ripple={width:w,height:h,read:rippleRT(w,h),write:rippleRT(w,h)};
      rippleLive=false;
    };
    const clearRipple=()=>{
      if(!ripple)return;
      [ripple.read,ripple.write].forEach((t:any)=>{renderer.bindFramebuffer(t);gl.viewport(0,0,t.width,t.height);gl.clear(gl.COLOR_BUFFER_BIT);});
      renderer.bindFramebuffer();
    };
    const refreshAtlas=(s:any)=>{
      if(s.characters===atlasKey)return; atlasKey=s.characters;
      const built=buildAtlas(s.characters); if(!built)return;
      atlasTexture.image=built.canvas; mu.uAtlas.value=[built.columns,built.lines,built.count];
    };
    const resize=()=>{
      width=Math.max(1,container.clientWidth); height=Math.max(1,container.clientHeight);
      renderer.dpr=Math.min(window.devicePixelRatio||1,2,Math.sqrt(PIXEL_BUDGET/(width*height)));
      renderer.setSize(width,height); buildRipple(); dirty=true; start();
    };
    const stepRipple=(field:any,s:any,dt:number)=>{
      rippleClock=Math.min(rippleClock+dt*RIPPLE_RATE,4);
      const strength=clamp(s.cursorStrength,0,1);
      const moved=Math.hypot(ptr.x-ptr.lastX,ptr.y-ptr.lastY);
      let impulse=(ptr.inside?Math.min(moved/14,1)*0.35*strength:0)+ptr.burst*strength;
      ptr.burst=0;
      ru.uTexel.value=[1/field.width,1/field.height]; ru.uSize.value=[width,height];
      ru.uFrom.value=[ptr.lastX,height-ptr.lastY]; ru.uTo.value=[ptr.x,height-ptr.y];
      ru.uRadius.value=clamp(s.cursorSize,8,400);
      while(rippleClock>=1){
        rippleClock-=1; ru.tState.value=field.read.texture; ru.uImpulse.value=impulse;
        renderer.render({scene:rippleMesh,target:field.write,clear:false});
        const nx=field.read; field.read=field.write; field.write=nx; impulse=0;
      }
      ptr.lastX=ptr.x; ptr.lastY=ptr.y;
    };
    const frame=(now:number)=>{
      raf=0; if(!alive)return;
      const s=settingsRef.current; if(!s)return;
      const dt=Math.min(0.05,Math.max(1/240,(now-last)/1000)); last=now;
      const moving=!s.paused&&!reducedMotion&&s.speed!==0;
      if(moving)time+=dt*s.speed;
      introClock=s.intro&&!reducedMotion?Math.min(1,introClock+dt/INTRO_SECONDS):1;
      const appear=1-Math.pow(1-clamp(introClock/0.75,0,1),3);
      const rise=clamp((introClock-0.1)/0.9,0,1);
      const amp=rise*rise*(3-2*rise);
      const rippling=s.interactive&&!reducedMotion&&!!ripple&&s.cursorStrength>0;
      if(rippling&&ptr.inside&&!ptr.placed){ptr.lastX=ptr.x;ptr.lastY=ptr.y;ptr.placed=true;}
      if(rippling&&(ptr.inside||ptr.burst>0))rippleUntil=now+5000;
      const rippleActive=rippling&&now<rippleUntil;
      if(rippleActive&&ripple){stepRipple(ripple,s,dt);rippleLive=true;}
      else if(rippleLive){clearRipple();rippleLive=false;}
      const pi=PATTERNS[s.pattern]??0;
      if(pi===4)refreshAtlas(s);
      const cw=gl.canvas.width,ch=gl.canvas.height,dpr=cw/width;
      const pitchY=Math.max(4,Math.round(clamp(s.spacing,4,120)*dpr));
      const pitchX=pi===3?Math.max(2,Math.round(pitchY/4)):pitchY;
      const cols=Math.min(4096,Math.ceil(cw/pitchX)+1),rows=Math.min(4096,Math.ceil(ch/pitchY)+2);
      const origin=[Math.floor((cw-cols*pitchX)/2),Math.floor((ch-rows*pitchY)/2)];
      if(fieldTarget.width!==cols||fieldTarget.height!==rows){dispose(fieldTarget);fieldTarget=fieldRT(cols,rows);mu.tField.value=fieldTarget.texture;}
      const heading=(s.direction*Math.PI)/180;
      const la=((s.direction+180+clamp(s.light,-90,90))*Math.PI)/180;
      const bg=s.background;
      const ink=bg[3]>0.02?luminance(s.color)<luminance(bg):luminance(s.color)<0.5;
      fu.uSize.value=[width,height]; fu.uDpr.value=dpr; fu.uOrigin.value=origin; fu.uPitch.value=[pitchX,pitchY];
      fu.uWave.value=WAVES[s.wave]??0; fu.uTime.value=time; fu.uUnit.value=WAVE_UNIT*clamp(s.scale,0.2,5);
      fu.uHeading.value=[Math.cos(heading),Math.sin(heading)]; fu.uAmp.value=amp;
      fu.uDepth.value=clamp(s.depth,0,1.5); fu.uLight.value=[Math.cos(la)*0.78,Math.sin(la)*0.78,0.62];
      fu.uShine.value=clamp(s.shine,0,2); fu.uContrast.value=clamp(s.contrast,0.3,3);
      fu.uInk.value=ink?1:0; fu.uOpacity.value=clamp(s.opacity,0,1);
      fu.uFade.value=FADES[s.fade]??0; fu.uFadeSize.value=clamp(s.fadeSize,0.05,1);
      fu.uAppear.value=appear; fu.tRipple.value=ripple&&rippleLive?ripple.read.texture:blank;
      fu.uRipple.value=rippleLive?0.32:0;
      renderer.render({scene:fieldMesh,target:fieldTarget});
      mu.uOrigin.value=origin; mu.uPitch.value=[pitchX,pitchY]; mu.uGrid.value=[cols,rows];
      mu.uPattern.value=pi; mu.uMarkSize.value=clamp(s.markSize,0.05,1);
      mu.uStroke.value=pi===3?0.9*dpr:Math.max(1.1*dpr,pitchY*0.08);
      const tint=ink?0:1,blend=ink?0.35:0.55;
      mu.uColor.value=s.color.slice(0,3);
      mu.uAccent.value=s.color.slice(0,3).map((ch:number)=>ch+(tint-ch)*blend);
      mu.uBackground.value=bg; renderer.render({scene:markMesh}); dirty=false;
      if(visible&&(moving||introClock<1||rippleActive||dirty))raf=requestAnimationFrame(frame);
    };
    const start=()=>{ if(raf||!visible||!alive)return; last=performance.now(); raf=requestAnimationFrame(frame); };
    const locate=(e:PointerEvent)=>{const r=container.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;return{x,y,inside:x>=0&&y>=0&&x<=r.width&&y<=r.height};};
    const onMove=(e:PointerEvent)=>{const s=locate(e);ptr.x=s.x;ptr.y=s.y;if(s.inside!==ptr.inside)ptr.placed=false;ptr.inside=s.inside;if(s.inside)start();};
    const onDown=(e:PointerEvent)=>{const s=locate(e);if(!s.inside)return;ptr.x=s.x;ptr.y=s.y;if(!ptr.inside){ptr.lastX=s.x;ptr.lastY=s.y;}ptr.burst=1.2;start();};
    const onLeave=()=>{ptr.inside=false;ptr.placed=false;start();};
    const onOut=(e:PointerEvent)=>{if(!e.relatedTarget)onLeave();};
    const onUp=(e:PointerEvent)=>{if(e.pointerType==='touch')onLeave();};
    const onVis=()=>{if(!document.hidden)start();};
    window.addEventListener('pointermove',onMove,{passive:true});
    window.addEventListener('pointerdown',onDown,{passive:true});
    window.addEventListener('pointerout',onOut,{passive:true});
    window.addEventListener('pointerup',onUp,{passive:true});
    window.addEventListener('blur',onLeave);
    document.addEventListener('visibilitychange',onVis);
    const ro=new ResizeObserver(resize); ro.observe(container);
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;start();}); io.observe(container);
    wakeRef.current=()=>{dirty=true;start();};
    resize();
    return ()=>{
      alive=false;visible=false;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();
      window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerdown',onDown);
      window.removeEventListener('pointerout',onOut);window.removeEventListener('pointerup',onUp);
      window.removeEventListener('blur',onLeave);document.removeEventListener('visibilitychange',onVis);
      wakeRef.current=null;
      if(ripple){dispose(ripple.read);dispose(ripple.write);}
      dispose(fieldTarget);gl.deleteTexture(atlasTexture.texture);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      if(canvas.parentNode)canvas.parentNode.removeChild(canvas);
    };
  },[]);

  return <div ref={containerRef} className={`pattern-waves ${className}`.trim()} style={style}/>;
};

export default PatternWaves;
