const int minimum = 100;
const int piezoSensor0 = A0;
const int piezoSensor3 = A3;
const int piezoSensor5 = A5;
int sensorReading0 = 0;
int sensorReading3 = 0;
int sensorReading5 = 0;

void setup() {
 Serial.begin(9600);
}

void loop() {
  sensorReading0 = analogRead(piezoSensor0);
  sensorReading3 = analogRead(piezoSensor3);
  sensorReading5 = analogRead(piezoSensor5);
  
//  Serial.println(sensorReading0);
//  Serial.println(sensorReading3);  
//  Serial.println(sensorReading5);
  
  if (sensorReading0 > minimum) Serial.print(0);
  if (sensorReading3 > minimum) Serial.print(1);
  if (sensorReading5 > minimum) Serial.print(2);
  
  delay(100);
}
