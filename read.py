from firebase import firebase
import datetime
import time
import serial

FBConn = firebase.FirebaseApplication('https://came-54f87-default-rtdb.europe-west1.firebasedatabase.app/', None)

ser = serial.Serial()
ser.baudrate = 115200
ser.port = "COM3"
ser.open()

while True:

    myGetResults = FBConn.get('/position/', None)
    
    microbitdata = str(myGetResults['xpos'])
    print (microbitdata)
    ser.write(microbitdata.encode('UTF-8') + b"\n")
    #microbitdata = str(myGetResults['ypos'])
    #print (microbitdata)
    
    time.sleep(2)


ser.close()

