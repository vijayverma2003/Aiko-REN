export default /*glsl*/ `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    uniform float uTime;
    uniform float uDist;

    void main() {
        float dist = clamp(uDist, 0.0, 1.0);
        vec2 updatedUV = (vUv * 0.9) + 0.05;

        vec3 texel = texture2D(uTexture, updatedUV + vec2(0.0, sin(uTime) * 0.05)).xyz;
        float average = (texel.x + texel.y + texel.z);

        float gray = dot(texel, vec3(0.2));
        vec3 color = mix(texel * 0.8, vec3(gray), dist); 
        
        gl_FragColor = vec4(vec3(color), 1.0);
    }
`;
