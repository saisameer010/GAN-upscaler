from flask import Flask
from flask import Flask, flash, request, redirect, url_for,send_file
# from redis import Redis
import os
from werkzeug.utils import secure_filename
import numpy as np
from PIL import Image
from ISR.models import RDN
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# redis = Redis(host='redis', port=6379)
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set([ 'png', 'jpg', 'jpeg'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
 
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/',methods=["GET"])
def hello():
    # redis.incr('hits')
    return 'This Compose/Flask demo has been viewed %s time(s).' 
@app.route('/upload',methods=["POST"])
def upload():
    # redis.incr('hits')
    if 'file' not in request.files:
        flash('No file part')
        return "No files Selected"
    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        return "EMpty filename"
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return 'File uploaded' 
  
@app.route("/upscale",methods=["POST"])
def upscale_image():
    print(request.json)
    # print(request.json["body"])
    # print(request.json["data"])
    file_name=request.json["filename"]
    compressed_img = Image.open('./uploads/'+file_name)
    compressed_lr_img = np.array(compressed_img)
    rdn = RDN(arch_params={'C': 6, 'D':20, 'G':64, 'G0':64, 'x':2})
    rdn.model.load_weights('./Super-Resolution-GAN-master/rdn-C6-D20-G64-G064-x2_ArtefactCancelling_epoch219.hdf5')
    sr_img = rdn.predict(compressed_lr_img)
    out = Image.fromarray(sr_img)
    out.save('./outputs/'+file_name)
    return send_file('./outputs/'+file_name, as_attachment=True)
    pass

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)