import speech_recognition
import pyttsx3
import random
# recognizer = speech_recognition.Recognizer()


engine = pyttsx3.init()

l=['up','down','left','right','red','green','yellow','blue']

for i in range(3):
    a=random.randint(0,7)
    engine.say(l[a])
    engine.runAndWait()
print("hi")