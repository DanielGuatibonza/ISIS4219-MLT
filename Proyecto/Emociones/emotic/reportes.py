import pandas as pd
from pandas_profiling import ProfileReport

df_datos = pd.read_csv('train.csv')
perfilamiento = ProfileReport(df_datos, title="Perfilamiento de datos train - Emotic")
perfilamiento.to_file("PerfilamientoDatosTrain_Emotic.html")