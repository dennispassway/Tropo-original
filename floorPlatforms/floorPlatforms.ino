/* ---------------------
Tropo floor platforms
--------------------- */

// Load Socket IO libraries
#include "SocketIOClient.h"
#include "Ethernet.h"
#include "SPI.h"
SocketIOClient client;

// Socket IO vars
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
char hostname[] = "192.168.124.152";
int port = 3000;

// Pins
int redButtonPin = 2;
int blueButtonPin = 4;
int yellowButtonPin = 6;

// Button Array
int buttons[] = {0, 0, 0};

void setup() {
  // Start Serial
  Serial.begin(9600);
  
  // Start Ethernet
  Ethernet.begin(mac);
  // Check Connection
  if (!client.connect(hostname, port)) Serial.println(F("Could not connect to Socket IO."));
  if (client.connected()) client.send("Arduino connected to Socket IO."); Serial.println(F("Arduino is connected to Socket IO."));
  
  // Set pins to input
  pinMode(redButtonPin, INPUT);
  pinMode(blueButtonPin, INPUT);
  pinMode(yellowButtonPin, INPUT);
}

void loop() {
  // Checking button state  
  int redButtonPressed = digitalRead(redButtonPin);
  int blueButtonPressed = digitalRead(blueButtonPin);
  int yellowButtonPressed = digitalRead(yellowButtonPin);
  
  buttons[0] = redButtonPressed;
  buttons[1] = blueButtonPressed;
  buttons[2] = yellowButtonPressed;
  
  // Debug buttons
  Serial.println(buttons[0]);
  
  // Send buttons to Socket IO
//  if (client.connected()) client.send(toSend);
  delay(10);
}
