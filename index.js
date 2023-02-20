canvas = document.getElementById('canvas')
gl = canvas.getContext('webgl')
      
var vertices = [
	-1, -1, 0,
	0, 1, 0,
	1, -1, 0, 
]

indices = [0,1,2]
         
var vertex_buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

var index_Buffer = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_Buffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

var vertCode = "attribute vec3 coordinates; void main(void) { gl_Position = vec4(coordinates, 1.0); }"
var vertShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertShader, vertCode)
gl.compileShader(vertShader)

var fragCode = "void main(void) { gl_FragColor = vec4(1, 0, 0, 1); }"
var fragShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragShader, fragCode)
gl.compileShader(fragShader)

var shaderProgram = gl.createProgram()
gl.attachShader(shaderProgram, vertShader)
gl.attachShader(shaderProgram, fragShader)
gl.linkProgram(shaderProgram)
gl.useProgram(shaderProgram)

var coord = gl.getAttribLocation(shaderProgram, "coordinates")
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(coord)

gl.clearColor(1.0, 1.0, 1.0, 1.0)
gl.enable(gl.DEPTH_TEST)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.viewport(0, 0, canvas.width, canvas.height)
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
