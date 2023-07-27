uniform sampler2D t;
uniform vec2 mask;
uniform float col;
uniform float time;

varying vec2 vUv;

vec3 hsl2rgb( in vec3 c ){
  vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
  return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}

void main(void) {
  vec2 uv = vUv;
  if(uv.y > mask.y) {
    uv.y = mask.y;
  }

  vec4 dest = texture2D(t, uv);
  dest.a *= 1.0 - step(0.5, vUv.y);

  dest.rgb = mix(dest.rgb, hsl2rgb(vec3(uv.y + time, 0.5, 0.5)), col);

  gl_FragColor = dest;
}
