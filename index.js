(function () {
	gl_utils.SL.init({ callback: function () { main(); } });

	function main() {
		//Buat "canvas" element biar Intellisensenya bisa
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", "gl_canvas");
		canvas.setAttribute("width", "1024");
		canvas.setAttribute("height", "576");
		canvas.innerHTML = "Upgrade browser boedjank";
		document.querySelector("body").prepend(canvas);
		var gl = canvas.getContext("webgl");

		//Dapatkan shader dan buat programnya
		var vertex_shader = gl_utils.getShader(gl, gl.VERTEX_SHADER, gl_utils.SL.Shaders.v1.vertex);
		var fragment_shader = gl_utils.getShader(gl, gl.FRAGMENT_SHADER, gl_utils.SL.Shaders.v1.fragment);
		var program = gl_utils.createProgram(gl, vertex_shader, fragment_shader);

		//Pertemuan 5
		/* var triangle_pos = [
			0.0, 0.5, 1.0, 1.0, 0.0,
			-0.5, -0.5, 0.7, 0.0, 1.0,
			0.5, -0.5, 0.1, 1.0, 0.6
		];
		var triangle_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, triangle_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle_pos), gl.STATIC_DRAW);

		var v_pos = gl.getAttribLocation(program, "v_pos");
		var v_col = gl.getAttribLocation(program, "v_col");
		gl.vertexAttribPointer(v_pos, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
		gl.vertexAttribPointer(v_col, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
		gl.enableVertexAttribArray(v_pos);
		gl.enableVertexAttribArray(v_col);

		gl.useProgram(program);

		var theta = 0;
		var theta_pos = gl.getUniformLocation(program, "theta");
		gl.uniform1f(theta_pos, theta);

		var dx = 0;
		var dx_pos = gl.getUniformLocation(program, "dx");
		gl.uniform1f(dx_pos, dx);

		var scale = 1, besar = 1;
		var scale_pos = gl.getUniformLocation(program, "u_scale");
		gl.uniform1f(scale_pos, scale);

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLES, 0, 3);

		function render() {
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			
			theta += Math.PI * 0.001;
			if (dx < 1.0)
				dx += 0.001;
			else
				dx = -1.0;
			gl.uniform1f(dx_pos, dx);
			gl.uniform1f(theta_pos, theta);
			
			if (scale >= 1)
				besar = -1;
			else if (scale <= -1)
				besar = 1;
			scale += (besar * 0.01);
			gl.uniform1f(scale_pos, scale);

			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
			requestAnimationFrame(render);
		}
		render(); */

		//Setup inisial kiri
		var vertex_pos = [
			//Outline luar A kiri
			-0.9, -0.8,
			-0.7, 0.8,
			-0.4, 0.8,
			-0.2, -0.8,
			-0.3, -0.8,
			-0.3875, -0.1,
			-0.7125, -0.1,
			-0.8, -0.8,

			//Outline dalam A kiri
			-0.6875, 0.1,
			-0.625, 0.6,
			-0.475, 0.6,
			-0.4125, 0.1,

			//Segitiga A kanan
			0.1, -0.8,
			0.3, 0.8,
			0.2, -0.8,

			0.3, 0.8,
			0.2, -0.8,
			0.4, 0.8,

			0.4, 0.8,
			0.375, 0.6,
			0.525, 0.6,

			0.4, 0.8,
			0.525, 0.6,
			0.5, 0.8,

			0.5, 0.8,
			0.6, 0.8,
			0.7, -0.8,

			0.8, -0.8,
			0.7, -0.8,
			0.6, 0.8,

			0.3125, 0.1,
			0.2875, -0.1,
			0.6125, -0.1,

			0.6125, -0.1,
			0.5875, 0.1,
			0.3125, 0.1
		];
		
		//Buat buffer dan isi dengan posisi vertex
		var pos_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, pos_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex_pos), gl.STATIC_DRAW);

		//Dapatkan atribut dan aktifkan
		var a_pos = gl.getAttribLocation(program, "a_pos");
		gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
		gl.enableVertexAttribArray(a_pos);

		//Dapatkan uniform
		var theta = 0.0;
		var theta_pos = gl.getUniformLocation(program, "theta");
		var translate_a_kiri = 0.55;
		var translate_a_kanan = -0.45;
		var translate_pos = gl.getUniformLocation(program, "translate");
		var scale = 0.0096;
		var besar = 1.0;
		var scale_pos = gl.getUniformLocation(program, "scale");

		//Jalankan program
		gl.useProgram(program);
		
		//Render time
		function render() {
			//Clear dulu semuanya
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			
			//Set uniform A kiri
			gl.uniform1f(translate_pos, translate_a_kiri);
			gl.uniform1f(theta_pos, theta);
			gl.uniform1f(scale_pos, 1.0);
			theta += Math.PI * 0.0096;

			//Gambar A kiri
			gl.drawArrays(gl.LINE_LOOP, 0, 8);
			gl.drawArrays(gl.LINE_LOOP, 8, 4);

			//Set uniform A kanan
			gl.uniform1f(translate_pos, translate_a_kanan);
			gl.uniform1f(theta_pos, 0.0);
			gl.uniform1f(scale_pos, scale);
			if (scale >= 1.0)
				besar = -1.0;
			else if (scale <= -1.0)
				besar = 1.0;
			scale += (besar * 0.0096);

			//Gambar A kanan
			gl.drawArrays(gl.TRIANGLES, 12, 24);
			requestAnimationFrame(render);
		};
		render();

		/* vertex_pos = [
			0.1, -0.8,
			0.3, 0.8,
			0.2, -0.8,

			0.3, 0.8,
			0.2, -0.8,
			0.4, 0.8,

			0.4, 0.8,
			0.375, 0.6,
			0.525, 0.6,

			0.4, 0.8,
			0.525, 0.6,
			0.5, 0.8,

			0.5, 0.8,
			0.6, 0.8,
			0.7, -0.8,

			0.8, -0.8,
			0.7, -0.8,
			0.6, 0.8,

			0.3125, 0.1,
			0.2875, -0.1,
			0.6125, -0.1,

			0.6125, -0.1,
			0.5875, 0.1,
			0.3125, 0.1
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex_pos), gl.STATIC_DRAW);
		gl.drawArrays(gl.TRIANGLES, 0, vertex_pos.length / 2); */
	}
})();