from firebase import firebase
import datetime
import time
import serial

FBConn = firebase.FirebaseApplication('https://came-54f87-default-rtdb.europe-west1.firebasedatabase.app/', None)

while True:

    myGetResults = FBConn.get('/position/', None)
    
    microbitdata = str(myGetResults['xpos'])
    print (microbitdata)
    microbitdata = str(myGetResults['ypos'])
    print (microbitdata)
    
    time.sleep(1)

    
