import speech_recognition
import pyttsx3

recognizer = speech_recognition.Recognizer()
engine = pyttsx3.init()

while True:
    try:
        with speech_recognition.Microphone() as mic:
            recognizer.adjust_for_ambient_noise(mic, duration=0.2)
            audio = recognizer.listen(mic)

            text = recognizer.recognize_google(audio_data=audio)
            text = text.lower()

            print(f"Recognised text is {text}")

            engine.say(text)
            engine.runAndWait()
        
    except speech_recognition.UnknownValueError:
        continue
