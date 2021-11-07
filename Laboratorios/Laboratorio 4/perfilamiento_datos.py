import pandas as pd
from pandas_profiling import ProfileReport

df_datos = pd.read_csv('creditcard.csv')
perfilamiento = ProfileReport(df_datos, title="Perfilamiento de datos - Credit Card")
perfilamiento.to_file("PerfilamientoDatos_CreditCard.html")