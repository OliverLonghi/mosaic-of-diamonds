var tile_size = 10;
var points = [[]];
var colors = [[]];
var img;

function preload() {
	img = loadImage("duda.jpg");
	img.loadPixels();
}

function setup() {
	createCanvas(img.width, img.height);
	background(50);

	for(var y=0; y<=height; y+=tile_size) {
		for(var x=0; x<=width; x+=tile_size) {
			var offset_x = map(random(), 0, 1, (tile_size/3), -(tile_size/3));
			var offset_y = map(random(), 0, 1, (tile_size/3), -(tile_size/3));

			offset_x = x == 0 || x == width ? 0 : offset_x;
			offset_y = y == 0 || y == height ? 0 : offset_y;

			points[y/tile_size] = points[y/tile_size] == null ? [] : points[y/tile_size];
			points[y/tile_size][x/tile_size] = createVector(x+offset_x, y+offset_y);

			var pixel = img.get(x, y);

			colors[y/tile_size] = colors[y/tile_size] == null ? [] : colors[y/tile_size];
			colors[y/tile_size][x/tile_size] = color(pixel[0], pixel[1], pixel[2]);
		}
	}
}

function draw_square(x, y) {
	beginShape();
	fill(colors[y][x]);
	noStroke();
	vertex(points[y][x].x, points[y][x].y);
	vertex(points[y][x+1].x, points[y][x+1].y);
	vertex(points[y+1][x+1].x, points[y+1][x+1].y);
	vertex(points[y+1][x].x, points[y+1][x].y);
	endShape(CLOSE);
}

function draw() {
	for(var x=0; x<points[0].length-1; x+=1) {
		for(var y=0; y<points.length-1; y+=1) {
			draw_square(x, y);
		}
	}
}