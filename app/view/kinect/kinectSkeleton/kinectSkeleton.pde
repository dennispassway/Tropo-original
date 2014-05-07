import SimpleOpenNI.*;
import processing.net.*;

SimpleOpenNI context;
Client c;

float        zoomF =0.5f;
float        rotX = radians(180);  // by default rotate the hole scene 180deg around the x-axis, 
                                   // the data from openni comes upside down
float        rotY = radians(0);
boolean      autoCalib=true;

PVector      com = new PVector();                                   
PVector      com2d = new PVector();                                   

void setup()
{
  c = new Client(this, "192.168.124.80", 8080);
  
  size(50,50,P3D);
  context = new SimpleOpenNI(this);
  
  if(context.isInit() == false)
  {
     println("Can't init SimpleOpenNI, maybe the camera is not connected!"); 
     exit();
     return;  
  }

  context.setMirror(true);
  context.enableDepth();
  context.enableUser();

  stroke(255,255,255);
  smooth();  
  perspective(radians(45),
              float(width)/float(height),
              10,150000);
  
  //Framerate 10, maar 10 keer per seconde sturen!
  frameRate(10);
}

void draw()
{
  // update the cam
  context.update();
  
  // set the scene pos
  translate(width/2, height/2, 0);
  rotateX(rotX);
  rotateY(rotY);
  scale(zoomF);
  
  int[]   userMap = context.userMap();
  int[] userPosX = context.userMap();
  int[] userPosY = context.userMap();
  int[] userPosZ = context.userMap();

  PVector realWorldPoint;
 
  translate(0,0,-1000);  // set the rotation center of the scene 1000 infront of the camera
  
  // draw the skeleton if it's available
  int[] userList = context.getUsers();
  //float[] userPositions = (context.getUsers() * 3);
  
  String dataStuurs;
  
  for(int i=0;i<userList.length;i++)
  {
    // draw the center of mass
    if(context.getCoM(userList[i],com))
    {
      stroke(100,255,0);
      strokeWeight(1);
      
      beginShape(LINES);
        vertex(com.x - 15,com.y,com.z);
        vertex(com.x + 15,com.y,com.z);
        vertex(com.x,com.y - 15,com.z);
        vertex(com.x,com.y + 15,com.z);
        vertex(com.x,com.y,com.z - 15);
        vertex(com.x,com.y,com.z + 15);
      endShape();
      
      //Mappen van de waardes
      com.x = int(map(com.x,-1000, 1000, -1000, 1000));
      com.y = int(map(com.y, -500, 100, -500, 200));
      com.z = int(map(com.z, 700, 2800, -1000, -4000));
      
      c.write(i + "," + com.x + "," + com.y + "," + com.z);
    }
  }
}

// -----------------------------------------------------------------
// SimpleOpenNI user events

void onNewUser(SimpleOpenNI curContext,int userId)
{
  println("onNewUser - userId: " + userId);
  println("\tstart tracking skeleton");
  
  context.startTrackingSkeleton(userId);
}

void onLostUser(SimpleOpenNI curContext,int userId)
{
  println("onLostUser - userId: " + userId);
}

void onVisibleUser(SimpleOpenNI curContext,int userId)
{
  //println("onVisibleUser - userId: " + userId);
}
