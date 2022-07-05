import json
from flask import Flask, render_template, request, Response, send_file, send_from_directory
from werkzeug.utils import secure_filename
import csv
import pandas as pd
from io import StringIO, BytesIO
import os
import json
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from json import JSONEncoder
from PIL import Image
app = Flask(__name__,  static_folder='static')

class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)


data = None
filename = None

@app.route('/uploadFile', methods = ['GET', 'POST'])
def upload_file():
   global data
   global filename
   if request.method == 'POST':
      f = request.files['file']
      f.save(secure_filename(f.filename))
      data = pd.read_csv(secure_filename(f.filename))
      filename = secure_filename(f.filename)
      list_of_column_names = []
      for col in data.columns:
         list_of_column_names.append(col)
      return Response(json.dumps(list_of_column_names),  mimetype='application/json')
@app.route('/getDataTypes', methods = ['GET'])
def getDataTypes():
   global data
   global filename
   if request.method == 'GET':
      print(data.dtypes)
      return data.dtypes.to_string()
@app.route('/getGraph', methods = ['GET'])
def my_plot():
   global data
   global filename
   xcol = request.args.get('x')
   ycol = request.args.get('y')
   graph = request.args.get('graph')

   print(xcol)
   print(ycol)
   print(graph)
   if os.path.exists('./static/graph.png'):
      os.remove('./static/graph.png')
   if request.method == 'GET':
      x = data[xcol]
      y = data[ycol]
      plt.ioff()
      if(graph == "Plot"):
         plt.plot(x,y)         
      if(graph == "Scatter"):
         plt.scatter(x,y)
      if(graph == "Bar"):
         plt.bar(x,y)
      if(graph == "BarH"):
         plt.barh(x,y)
      if(graph == "Pie"):
         plt.pie(y, labels=x)
      plt.xlabel(xcol, fontweight ='bold')
      plt.ylabel(ycol, fontweight ='bold')
      plt.title(graph)
      plt.savefig('./static/graph.png')
      plt.close('all')
      plt.clf()
      os.remove('./'+filename) 
      response = send_from_directory(app.static_folder, "graph.png", mimetype='image/gif')
      return response

if __name__ == '__main__':
   app.run(debug = True)