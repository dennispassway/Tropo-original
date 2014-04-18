import processing.net.*;
import SimpleOpenNI.*;
SimpleOpenNI kinect;

Client c;

float closestValue;
float closestX;
float closestY;
float closestZ;

float lastX;
float lastY;

int previousX;
int previousY;

void setup() { 
  size(50, 50);
//  c = new Client(this, "localhost", 8080);
  c = new Client(this, "192.168.124.147", 8080);
  
  kinect = new SimpleOpenNI(this);
  kinect.enableDepth();
  
  // Kinect beeld omdraaien
  kinect.setMirror(true);
  
  //Framerate 10, maar 10 keer per seconde sturen!
  frameRate(10);
} 

void draw() {
  float w = 1000;
  float h = 800;
  
  // Afstand dichtste punt van Kinect
  closestValue = 5000;
  
  kinect.update();
  
  // get the depth array from the kinect
  int[] depthValues = kinect.depthMap();
  
  // for each row in th depth image
  for(int y = 0; y < 480; y++){
    for(int x = 0; x < 640; x++){
      
      //reverse x
      int reversedX = 640-x-1;
      // pull ut the corresponding value from the depth array
      int i = reversedX + y * 640;
      int currentDepthValue = depthValues[i];
      
      // if that pixel is the closest one we've seen so far and
      // is within a range 620 is 2 feet 1525 is 5 feet
      if(currentDepthValue > 610 && currentDepthValue < 1625
      && currentDepthValue < closestValue){
        
          //save its value
          closestValue = currentDepthValue;
          
          // and save its position (both x and y coordinates).
          // ik map hier de waardes, om hem proper fullscreen te kunnen draaien.
          // ik map de x andersom, omdat de Kinect standaard draait.
          closestX = map(x, 0, 640, 1000, 0);
          closestY = map(y, 0, 480, 800, 0);
          closestZ = int(currentDepthValue);
        }
      }
    }
//    // Activeer depthImage
//    image(kinect.depthImage(),0,0, w, h);
    
//    // Pointer
//    noStroke();
//    fill(360,100,0, 80);
//    ellipse(closestX, closestY, 50, 50);  
    
    // Stuur data
    c.write(closestX + "," + closestY + "," + closestZ);
}
