(function (global) {
	var gl_utils = {
		check_webgl: function (canvas) {
			var contexts = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"], gl;
			for (var index = 0; index < contexts.length; index++) {
				gl = canvas.getContext(contexts[index]);
				if (gl) break;
			}
			if (!gl) {
				alert("WebGL tidak ada.");
			}
			return gl;
		},

		createProgram: function (gl, vertex_shader, fragment_shader) {
			var program = gl.createProgram();
			gl.attachShader(program, vertex_shader);
			gl.attachShader(program, fragment_shader);

			gl.linkProgram(program);
			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
				console.log("Gagal link: " + gl.getProgramInfoLog(program));
				gl.deleteProgram(program);
				gl.deleteShader(vertex_shader);
				gl.deleteShader(fragment_shader);
				return null;
			}

			gl.validateProgram(program);
			if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
				console.log("Gagal validasi: " + gl.getProgramInfoLog(program));
				gl.deleteProgram(program);
				gl.deleteShader(vertex_shader);
				gl.deleteShader(fragment_shader);
				return null;
			}
			return program;
		},

		getShader: function (gl, type, source) {
			var shader = gl.createShader(type);
			gl.shaderSource(shader, source);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.log("Shader gagal compile: " + gl.getShaderInfoLog(shader));
				gl.deleteShader(shader);
				return null;
			}
			return shader;
		},
		
		SL: {
			XMLHttpFactories: [
				function () {return new XMLHttpRequest()},
				function () {return new ActiveXObject("Msxml12.XMLHTTP")},
				function () {return new ActiveXObject("Msxml13.XMLHTTP")},
				function () {return new ActiveXObject("Microsoft.XMLHTTP")}
			],

			createXMLHTTPObject: function () {
				var xmlhttp = false;
				for (var index = 0; index < this.XMLHttpFactories.length; index++) {
					xmlhttp = this.XMLHttpFactories[index]();
					if (!xmlhttp) continue;
					break;
				}
				return xmlhttp;
			},

			sendRequest: function (url, callback, element) {
				var req = this.createXMLHTTPObject();
				if (!req) return;
				var method = "GET";
				req.open(method, url, true);
				req.onreadystatechange = function () {
					if (req.readyState != 4) return;
					if (req.status != 0 && req.status != 200 && req.status != 304) return;
					callback(req, element);
				}
				if (req.readyState == 4) return;
				req.send();
			},

			init: function (options) {
				var options = options || {};
				this.callback = options.callback || function () {};
				this.elemName = options.elemName || "shader";
				this.dataSrc = options.dataSrc || "data-src";
				this.dataType = options.dataType || "data-type";
				this.dataVersion = options.dataVersion || "data-version";
				this.shaderElems = document.getElementsByName(this.elemName);
				this.loadedSignal = new global.signals.Signal();
				this.Shaders = this.Shaders || {};
				this.loadedSignal.add(this.callback);
				this.slShaderCount = this.shaderElems.length;
				for (var index = 0; index < this.shaderElems.length; index++) {
					var shader = this.shaderElems[index];
					this.sendRequest(shader.getAttribute(this.dataSrc), this.processShader, shader);
				}
				this.checkForComplete();
			},
	
			checkForComplete: function () {
				if (!this.slShaderCount) {
					this.loadedSignal.dispatch();
				}
			},
	
			processShader: function (req, element) {
				gl_utils.SL.slShaderCount--;
				var version = element.getAttribute(gl_utils.SL.dataVersion);
				if (!gl_utils.SL.Shaders[version]) {
					gl_utils.SL.Shaders[version] = {
						vertex: "",
						fragment: "",
					};
				}
				gl_utils.SL.Shaders[version][element.getAttribute(gl_utils.SL.dataType)] = req.responseText;
				gl_utils.SL.checkForComplete();
			}
		}		
	};
	global.gl_utils = gl_utils;
})(window || this);