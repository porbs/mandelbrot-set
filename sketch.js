let minSlider, maxSlider, qualitySlider;

let minX = -1.5, maxX = 1.5, minY = -1.5, maxY = 1.5;

var frDiv;

function setup() {
  createCanvas(400, 400);

  minSlider = createSlider(minX, maxX, maxX, 0.01);
  maxSlider = createSlider(minY, maxY, minY, 0.01);
  qualitySlider = createSlider(2, 100, 10, 1);
  frDiv = createDiv('');
}

function draw() {
  var maxiterations = qualitySlider.value();

  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var a = map(x, 0, width, minSlider.value(), maxSlider.value());
      var b = map(y, 0, height, minSlider.value(), maxSlider.value());

      var ca = a;
      var cb = b;

      var n = 0;

      while (n < maxiterations) {
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b >= 20) {
          break;
        }
        n++;
      }

      var bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n == maxiterations) {
        bright = 0;
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();

  frDiv.html(`Frame rate: ${floor(frameRate())}`);
}