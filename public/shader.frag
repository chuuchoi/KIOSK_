// Author: Patricio Gonzalez Vivo
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform float       u_time;
uniform sampler2D   u_tex0;
uniform vec2        u_tex0Resolution; 

uniform sampler2D   u_logo; // data/logo.jpg
uniform vec2        u_logoResolution;

#include "lygia/math/const.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/sdf/circleSDF.glsl"

vec2 sphereCoords(vec2 _st, float _scale){
    float maxFactor = sin(1.570796327);
    vec2 uv = vec2(0.0);
    vec2 xy = 2.0 * _st.xy - 1.0;
    float d = length(xy);
    if (d < (2.0-maxFactor)){
        d = length(xy * maxFactor);
        float z = sqrt(1.0 - d * d);
        float r = atan(d, z) / 3.1415926535 * _scale;
        float phi = atan(xy.y, xy.x);
        uv.x = r * cos(phi) + 0.5;
        uv.y = r * sin(phi) + 0.5;
    } else {
        uv = _st.xy;
    }
    return uv;
}

vec4 sphereTexture(in sampler2D _tex, in vec2 _uv, float _time) {
    vec2 st = sphereCoords(_uv, 1.0);
    float aspect = u_tex0Resolution.y/u_tex0Resolution.x;
    st.x = fract(st.x * aspect + _time);
    return texture2D(_tex, st);
}

void main(){
  gl_FragColor = vec4(0.8, 0.4, 0.9, 1.0);

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st = scale(st, 2.0);
  st = ratio(st, u_resolution);

  vec3 color = vec3(0.0);
  color = sphereTexture(u_tex0, st, u_time * 0.01).rgb;

}