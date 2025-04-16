export default /* glsl */ `
    varying vec2 vUv;
    uniform float uWheel;

    float inverseLerp(float a, float b, float v) {
        return clamp((v - a) / (b - a), 0.0, 1.0);
    }

    float remap(float inMin, float inMax, float outMin, float outMax, float v) {
        float t = inverseLerp(inMin, inMax, v);
        return mix(outMin, outMax, t);
    }

    void main() {
        vec3 pos = position;

        pos.z = sin(mix(0.0, 3.14, uv.x * 1.0)) * .05;
        pos.y += sin(mix(0.0, 3.14, uv.x)) * uWheel * 2.0;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        vUv = uv;
    }
`;
