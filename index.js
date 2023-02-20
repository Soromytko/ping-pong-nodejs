canvas = document.getElementById('canvas')
gl = canvas.getContext('webgl')
      
var vertices = [ // массив координат вершин
	-1, -1, 0,
	0, 1, 0,
	1, -1, 0, 
]

indices = [0,1,2] // массив индексов вершин
         
var vertex_buffer = gl.createBuffer() // создать пустой буфер для хранения вершин
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer) // связать буфер с webgl
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW) // передать массив координат вершин в буфер

var index_Buffer = gl.createBuffer() // создать пустой буфер для хранения индексов
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_Buffer) // связать буфер индексов с webgl
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW) // передать массив индексов в буфер

var vertCode = "attribute vec3 coordinates; void main(void) { gl_Position = vec4(coordinates, 1.0); }" // исходный код вершинного шейдера
var vertShader = gl.createShader(gl.VERTEX_SHADER) // создать объект вершинного шейдера
gl.shaderSource(vertShader, vertCode) // присобачить исходный код вершинного шейдера к webgl
gl.compileShader(vertShader) // скомпилировать шейдер

var fragCode = "void main(void) { gl_FragColor = vec4(1, 0, 0, 1); }" // исходный код фрагметного шейдера
var fragShader = gl.createShader(gl.FRAGMENT_SHADER) // создать объект фрагметного шейдера
gl.shaderSource(fragShader, fragCode) // присобачить исходный код фрагметного шейдера к webgl
gl.compileShader(fragShader) // скомпилировать шейдер

var shaderProgram = gl.createProgram() // создать шейдерную программу
gl.attachShader(shaderProgram, vertShader) // прикрепить объект вершинного шейдера к шейдерной программе
gl.attachShader(shaderProgram, fragShader) // прикрепить объект фрагментного шейдера к шейдерной программе
gl.linkProgram(shaderProgram) // связать программы
gl.useProgram(shaderProgram) // запустить шейдерную программу (на видеокарте)

var coord = gl.getAttribLocation(shaderProgram, "coordinates") // Get the attribute location
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0) // Point an attribute to the currently bound VBO
gl.enableVertexAttribArray(coord) // Enable the attribute

gl.clearColor(1.0, 1.0, 1.0, 1.0) // очистить канвас белым цветом
gl.enable(gl.DEPTH_TEST) // Enable the depth test
gl.clear(gl.COLOR_BUFFER_BIT) // Clear the color buffer bit

gl.viewport(0, 0, canvas.width, canvas.height) // установить размеры области отрисовки
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0) // нарисовать треугольник
