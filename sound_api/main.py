import base64
from fastapi import FastAPI, File
from starlette.responses import Response
import io
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from base64 import b64encode
import json
from tensorflow.keras.models import load_model
import librosa
import librosa.display

app = FastAPI(
    title="sound detection api",
    description="yoo",
    version="0.0.1",
)

origins = [
    "http://localhost",
    "http://localhost:8000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# model=load_model("./weights/model.h5")
# GRU_model=load_model('./weights/rr_GRU_CNN_1.h5')

rr_lstm=load_model("./weights/rr_LSTM_CNN.h5")
rr_gru=load_model("./weights/rr_GRU_CNN.h5")
diag_lstm=load_model("./weights/diagnosis_LSTM_CNN.h5")
diag_gru=load_model("./weights/diagnosis_GRU_CNN.h5")
print("loaded 4 models ----------------------------------------")
classes = ["COPD" ,"Bronchiolitis ", "Pneumoina", "URTI", "Healthy"]

def get_sound_from_bytes(binary_audio):
    wav_file = open("input.wav", "wb")
    decode_string = base64.b64decode(binary_audio)
    wav_file.write(decode_string)


def stretch(data, rate):
    data = librosa.effects.time_stretch(data, rate=rate)
    return data

def diagnosis_prediction(data_x,sampling_rate):
    data_x = stretch (data_x,1.2)

    features = np.mean(librosa.feature.mfcc(y=data_x, sr=sampling_rate, n_mfcc=52).T,axis = 0)

    features = features.reshape(1,52)

    test_pred1 = diag_lstm.predict(np.expand_dims(features, axis = 2))
    test_pred2 = diag_gru.predict(np.expand_dims(features, axis = 1))

    classpreds1 = classes[np.argmax(test_pred1, axis=1)[0]]
    classpreds2 = classes[np.argmax(test_pred2[0], axis=1)[0]]

    confidence1 = test_pred1.T[test_pred1.mean(axis=0).argmax()].mean()
    confidence2 = test_pred2.T[test_pred2[0].mean(axis=0).argmax()].mean()

    return classpreds1,confidence1,classpreds2,confidence2


def respiratory_rate_prediction_gru(data_x,sampling_rate):
    classes = ["Normal", "High"]
    features = np.mean(librosa.feature.mfcc(y=data_x, sr=sampling_rate, n_mfcc=50).T,axis = 0)

    features = features.reshape(1,50)

    test_pred1 = rr_lstm.predict(np.expand_dims(features, axis = 2))
    test_pred2 = rr_gru.predict(np.expand_dims(features, axis = 1))

    classpreds1 = classes[np.argmax(test_pred1, axis=1)[0]]
    classpreds2 = classes[np.argmax(test_pred2[0], axis=1)[0]]

    confidence1 = test_pred1.T[test_pred1.mean(axis=0).argmax()].mean()
    confidence2 = test_pred2.T[test_pred2[0].mean(axis=0).argmax()].mean()

    return classpreds1,confidence1,classpreds2,confidence2



@app.get('/notify/v1/health')
def get_health():
    return dict(msg='OK')

@app.post("/object-to-json")
async def detect_return_json_result(file: bytes = File(...)):
    x,y=librosa.load(io.BytesIO(file))
    print(x)

    print("disease pred ----------------------")
    results = diagnosis_prediction(x,y)
    print("rate pred -------------------------")
    res = respiratory_rate_prediction_gru(x,y)

    print(results,res)

    result= {"disease_lstm": {"prediction": results[0],"confidence": str(results[1]*100)[:5]} ,
    "disease_gru": {"prediction": results[2],"confidence": str(results[3]*100)[:5]},
    "rr_lstm": {"prediction": res[0],"confidence": str(res[1]*100)[:5]},
    "rr_gru": {"prediction": res[2],"confidence": str(res[3]*100)[:5]}}

    # result={"lstm_disease_pred":}

    return result