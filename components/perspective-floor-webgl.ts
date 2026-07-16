export interface PerspectiveFloorRenderer {
  resize(): void;
  render(offset: number): void;
  dispose(): void;
}

export const FLOOR_LATERAL_SCALE = 14;
export const FLOOR_DEPTH_EXPONENT = 0.4;
export const FLOOR_DEPTH_SCALE = 26.525;

export function getProjectedFloorCellRatio(floorY: number): number {
  return (
    (FLOOR_LATERAL_SCALE * floorY ** FLOOR_DEPTH_EXPONENT) /
    (FLOOR_DEPTH_SCALE * FLOOR_DEPTH_EXPONENT)
  );
}

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_offset;

const float FLOOR_DEPTH_EXPONENT = ${FLOOR_DEPTH_EXPONENT};

in vec2 v_uv;
out vec4 outColor;

float gridLine(float coordinate, float derivative, float halfWidth) {
  derivative = max(derivative, 0.0001);
  float distanceToLine = abs(fract(coordinate - 0.5) - 0.5) / derivative;
  float coverage = 1.0 - smoothstep(halfWidth, halfWidth + 1.0, distanceToLine);
  float frequencyFade = 1.0 - smoothstep(0.25, 0.5, derivative);
  return coverage * frequencyFade;
}

void main() {
  float floorY = 1.0 - v_uv.y;
  float screenY = max(floorY, 0.015);
  float depth = 1.0 / screenY;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);

  float worldX = (v_uv.x - 0.5) * depth * aspect * ${FLOOR_LATERAL_SCALE}.0;
  float worldZ = pow(depth, FLOOR_DEPTH_EXPONENT) * ${FLOOR_DEPTH_SCALE} + u_offset;
  float verticalLine = gridLine(worldX, abs(dFdx(worldX)), 0.28);
  float horizontalLine = gridLine(worldZ, abs(dFdy(worldZ)), 0.36);

  float horizonFade = smoothstep(0.02, 0.34, floorY);
  float bottomFade = 1.0 - 0.35 * smoothstep(0.84, 1.0, floorY);
  float alpha = max(verticalLine, horizontalLine) * 0.10 * horizonFade * bottomFade;
  vec3 cyan = vec3(0.0, 178.0 / 255.0, 226.0 / 255.0);

  outColor = vec4(cyan, alpha);
}
`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create perspective floor shader");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown shader compilation error";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

export function createPerspectiveFloorRenderer(
  canvas: HTMLCanvasElement,
): PerspectiveFloorRenderer | null {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    depth: false,
    desynchronized: true,
    powerPreference: "high-performance",
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    stencil: false,
  });
  if (!gl) return null;

  let vertexShader: WebGLShader | null = null;
  let fragmentShader: WebGLShader | null = null;

  try {
    vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  } catch {
    return null;
  }

  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const vertexArray = gl.createVertexArray();
  if (!program || !buffer || !vertexArray) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteBuffer(buffer);
    gl.deleteVertexArray(vertexArray);
    gl.deleteProgram(program);
    return null;
  }

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const offsetLocation = gl.getUniformLocation(program, "u_offset");
  if (positionLocation < 0 || !resolutionLocation || !offsetLocation) {
    gl.deleteBuffer(buffer);
    gl.deleteVertexArray(vertexArray);
    gl.deleteProgram(program);
    return null;
  }

  gl.bindVertexArray(vertexArray);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.useProgram(program);
  gl.clearColor(0, 0, 0, 0);

  return {
    resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
      const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, width, height);
    },
    render(offset) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(offsetLocation, offset);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vertexArray);
      gl.deleteProgram(program);
    },
  };
}
