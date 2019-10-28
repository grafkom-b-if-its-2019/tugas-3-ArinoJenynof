precision mediump float;
attribute vec2 a_pos;
uniform float theta;
uniform float translate;
uniform float scale;

//Pertemuan 5
/* attribute vec2 v_pos;
attribute vec3 v_col;
varying vec3 f_col;
uniform float theta;
uniform float dx;
uniform float u_scale; */

void main() {
	mat4 rotate_matrix = mat4(
		cos(theta), -sin(theta), 0.0, 0.0,
		sin(theta), cos(theta), 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	mat4 translate_matrix = mat4(
		1.0, 0.0, 0.0, translate,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	mat4 back = mat4(
		1.0, 0.0, 0.0, -translate,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	mat4 scale_matrix = mat4(
		scale, 0.0, 0.0, 0.0,
		0.0, scale, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	gl_Position = vec4(a_pos, 0.0, 1.0) * translate_matrix * rotate_matrix * scale_matrix * back;

	//Pertemuan 5
	/* f_col = v_col;
	gl_Position = vec4(v_pos, 0.0, 1.0);
	mat4 translate = mat4(
		1.0, 0.0, 0.0, dx,
		0.0, 1.0, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	mat4 rotate = mat4(
		cos(theta), -sin(theta), 0.0, 0.0,
		sin(theta), cos(theta), 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	mat4 scale = mat4(
		u_scale, 0.0, 0.0, 0.1,
		0.0, u_scale, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
	);
	gl_Position = vec4(v_pos, 0.0, 1.0) * translate * rotate;
	gl_Position = vec4(v_pos, 0.0, 1.0) * scale;
	gl_PointSize = 10.0; */
}