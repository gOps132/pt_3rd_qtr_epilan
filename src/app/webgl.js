const gl_matrix = require('gl-matrix');

// const RGB_HEX = /^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i;
// const hex2RGB = str => {
// 	const [, short, long] = String(str).match(RGB_HEX) || [];
// 	if (long) {
// 		const value = Number.parseInt(long, 16);
// 		return [value >> 16, value >> 8 & 0xFF, value & 0xFF];
// 	} else if (short) {
// 		return Array.from(short, s => Number.parseInt(s, 16))
// 			.map(n => (n << 4) | n);
// 	}
// };

var squareRotation = 0.0;

function init_webgl() {
	const canvas = document.getElementById('webgl-page-canvas');
	const gl = canvas.getContext('webgl');

	if (!gl) {
		alert(
			'Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	}

	const vsSource = `
		attribute vec4 aVertexPosition;
		attribute vec4 aVertexColor;

		uniform mat4 uModelViewMatrix;
		uniform mat4 uProjectionMatrix;

		varying lowp vec4 vColor;

		void main(void) {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		vColor = aVertexColor;
		}
`;

	var fsSource = `
		varying lowp vec4 vColor;

		void main(void) {
		gl_FragColor = vColor;
		}
	`;

	const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

	const programInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
		},
		uniformLocations: {
			projectionMatrix:
				gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
		},
	};
	// Here's where we call the routine that builds all the
	// objects we'll be drawing.
	const buffers = initBuffers(gl);

	var then = 0;

	// Draw the scene repeatedly
	function render(now) {
		now *= 0.001;  // convert to seconds
		const deltaTime = now - then;
		then = now;

		drawScene(gl, programInfo, buffers, deltaTime);

		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}

function initShaderProgram(gl, vsSource, fsSource) {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert(
			'Unable to initialize the shader program: ' +
			gl.getProgramInfoLog(shaderProgram));
		return null;
	}

	return shaderProgram;
}

function loadShader(gl, type, source) {
	const shader = gl.createShader(type);


	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(
			'An error occurred compiling the shaders: ' +
			gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

function initBuffers(gl) {
	const positionBuffer = gl.createBuffer();
	const colorBuffer = gl.createBuffer();

	const positions = [
		1.0, 1.0,
		-1.0, 1.0,
		1.0, -1.0,
		-1.0, -1.0,
	];

	const colors = [
		1.0, 1.0, 1.0, 1.0,  // white
		1.0, 0.0, 0.0, 1.0,  // red
		0.0, 1.0, 0.0, 1.0,  // green
		0.0, 0.0, 1.0, 1.0,  // blue
	];

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	return {
		position: positionBuffer,
		color: colorBuffer,
	};
}

function drawScene(gl, programInfo, buffers, deltaTime) {
	// var style = getComputedStyle(document.body);
	// var main_bg_color = hex2RGB(style.getPropertyValue('--bg-primary')
	// 				.replace('#',''));
	// gl.clearColor(main_bg_color[0],main_bg_color[1],main_bg_color[2], 1.0);  //
	// Clear to black, fully opaque

	gl.clearColor(0, 0, 0, 1.0);  // Clear to black, fully opaque

	gl.clearDepth(1.0);        // Clear everything
	gl.enable(gl.DEPTH_TEST);  // Enable depth testing
	gl.depthFunc(gl.LEQUAL);   // Near things obscure far things

	// Clear the canvas before we start drawing on it.
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Create a perspective matrix, a special matrix that is
	// used to simulate the distortion of perspective in a camera.
	// Our field of view is 45 degrees, with a width/height
	// ratio that matches the display size of the canvas
	// and we only want to see objects between 0.1 units
	// and 100 units away from the camera.

	const fieldOfView = 45 * Math.PI / 180;  // in radians
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	const zNear = 0.1;
	const zFar = 100.0;
	const projectionMatrix = gl_matrix.mat4.create();

	// note: glmatrix.js always has the first argument
	// as the destination to receive the result.
	gl_matrix.mat4.perspective(
		projectionMatrix, fieldOfView, aspect, zNear, zFar);

	// Set the drawing position to the "identity" point, which is
	// the center of the scene.
	const modelViewMatrix = gl_matrix.mat4.create();

	// Now move the drawing position a bit to where we want to
	// start drawing the square.

	gl_matrix.mat4.translate(
		modelViewMatrix,     // destination matrix
		modelViewMatrix,     // matrix to translate
		[-0.0, 0.0, -6.0]);  // amount to translate

	gl_matrix.mat4.rotate(modelViewMatrix,  // destination matrix
		modelViewMatrix,  // matrix to rotate
		squareRotation,   // amount to rotate in radians

		[0, 0, 1]);       // axis to rotate around

	{
		const numComponents = 2;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexPosition, numComponents, type,
			normalize, stride, offset);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
	}

	// Tell WebGL how to pull out the positions from the position
	// buffer into the vertexPosition attribute.
	{
		const numComponents = 4;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
		gl.vertexAttribPointer(
			programInfo.attribLocations.vertexColor, numComponents, type, normalize,
			stride, offset);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
	}

	// Tell WebGL to use our program when drawing

	gl.useProgram(programInfo.program);

	// Set the shader uniforms

	gl.uniformMatrix4fv(
		programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
	gl.uniformMatrix4fv(
		programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

	{
		const offset = 0;
		const vertexCount = 4;
		gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
	}

	// Update the rotation for the next draw
	squareRotation += deltaTime;
}

window.onload = init_webgl;