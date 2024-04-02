import speech_recognition
import pyttsx3

recgonizer=speech_recognition.Recognizer()


while True:
    try:
        with speech_recognition.Microphone() as mic:
            recgonizer.adjust_for_ambient_noise(mic,duration=0.2)
            audio=recgonizer.listen(mic)

            text=recgonizer.recognize_google(audio_data=audio)
            text=text.lower()

            print(f" Recognised text is {text}")
        
    except speech_recognition.UnknownValueError():
        recgonizer=speech_recognition.Recognizer()
        continue
       