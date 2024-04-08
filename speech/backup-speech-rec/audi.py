import speech_recognition
import pyttsx3
import random
# recognizer = speech_recognition.Recognizer()

engine = pyttsx3.init()

l=['up','down','left','right','red','green','yellow','blue']

arr=[]

def addpattern():
    a=random.randint(0,7)
    arr.append(l[a])
    print(arr)

def playpattern():
    for i in arr:
        engine.say(i)
        engine.runAndWait()


def check():
    for i in arr:
        user = input("")    # we should get speech input
        if i != user:
            print("lose")
            return False
    return True


while True:
    addpattern()
    playpattern()
    if check():
        continue
    else:
        break


        