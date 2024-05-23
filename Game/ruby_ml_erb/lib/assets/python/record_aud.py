import pyaudio
import wave
def record_audio():
    FRAMES_PER_BUFFER=3200
    FORMAT=pyaudio.paInt16
    CHANNELS =1
    RATE=16000
    p=pyaudio.PyAudio()
    stream=p.open(
        format=FORMAT,
        channels=CHANNELS,
        rate=RATE,
        input=True,
        frames_per_buffer=FRAMES_PER_BUFFER
    )
    print("start recording")
    seconds=1
    frames=[]
    for _ in range(0,int(RATE/FRAMES_PER_BUFFER*seconds)):
        data=stream.read(FRAMES_PER_BUFFER)
        frames.append(data)
    stream.stop_stream()
    stream.close()
    wavobj=wave.open("lib\\assets\\python\\new.wav","wb")
    wavobj.setnchannels(CHANNELS)
    wavobj.setsampwidth(p.get_sample_size(FORMAT))
    wavobj.setframerate(RATE)
    wavobj.writeframes(b"".join(frames))
    wavobj.close()
    print("recording finished")


record_audio()
from speech_02_input import Keyword_Spotting_Service
kss= Keyword_Spotting_Service()
livepredict=kss.predict("lib\\assets\\python\\new.wav")
print(f"predicted keywords?{livepredict}")
