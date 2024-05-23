#feature extraction pipeline
import tensorflow.keras.models as models
import numpy as np
import librosa
import sys

sys.stdout.reconfigure(encoding='utf-8')

MODEL_PATH=r"lib\\assets\\python\\model.h5"
NUM_SAMPLES_TO_CONSIDER=22050
class _Keyword_Spotting_Service:
    model=None
    _mappings=["down","go","left","no","right","up","yes"]
    _instance=None

    def predict(self,file_path):
        #extract MFCCs array
        MFCCs=self.preprocess(file_path)
        #convert 2d MFCCs array into 4d array
        MFCCs=MFCCs[np.newaxis,...,np.newaxis]
        predictions=self.model.predict(MFCCs)
        predicted_index=np.argmax(predictions)
        if np.max(predictions)>0.5:
            predicted_keyword= self._mappings[predicted_index]
            return predicted_keyword
        else:
            return "Try again"
        #make prediction
        
    def preprocess(self,file_path,n_mfcc=13,hop_length=512,n_fft=2048):
        #load the audio file
        signal,sr=librosa.load(file_path)
        #ensure consistency in audio file length
        if len(signal)>NUM_SAMPLES_TO_CONSIDER:
            signal=signal[:NUM_SAMPLES_TO_CONSIDER]
        MFCCs=librosa.feature.mfcc(y=signal,n_mfcc=n_mfcc,hop_length=hop_length,n_fft=n_fft)
        return MFCCs.T

def Keyword_Spotting_Service():
    if _Keyword_Spotting_Service._instance is None:
        _Keyword_Spotting_Service._instance=_Keyword_Spotting_Service()
        _Keyword_Spotting_Service.model=models.load_model(MODEL_PATH)
    return _Keyword_Spotting_Service._instance



# kss= Keyword_Spotting_Service()
# livepredict=kss.predict("lib\\assets\\python\\new.wav")
# print(f"predicted keywords:{livepredict}")

