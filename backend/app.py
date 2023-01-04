from flask import Flask
from flask import Flask, flash, request, redirect, url_for,send_file
# from redis import Redis
import os
from werkzeug.utils import secure_filename
import numpy as np
from PIL import Image
from ISR.models import RDN
from flask_cors import CORS
import logging
import logging.handlers
import json 

logging.basicConfig(filename='app.log', format='%(name)s - %(levelname)s - %(message)s')
logging.warning('This will get logged to a file')
logger = logging.getLogger()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
fh = logging.handlers.RotatingFileHandler('./logtest.log', maxBytes=10240, backupCount=5)
logger.setLevel(logging.DEBUG)
fh.setFormatter(formatter)
logger.addHandler(fh)
logger.info('INFO')
logger.error('ERROR')

app = Flask(__name__)
CORS(app)
# redis = Redis(host='redis', port=6379)
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set([ 'png', 'jpg', 'jpeg'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
 
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/test',methods=["GET"])
def hello():
    # redis.incr('hits')
    return 'This Compose/Flask demo has been viewed %s time(s).' 
@app.route('/upload',methods=["POST"])
def upload():
    # redis.incr('hits')
    logging.info("Logging in upscale")
    print("Logging")
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
    try:
        logging.info("Logging in upscale ")
        logging.debug(f"test {request}")
        logging.debug(f"test{request.get_json()}")
        print(request.json["filename"] )
        # print(request.json["data"]) 
        logging.debug(request.json["filename"])
        # logging.debug(request.json["body"])
        file_name=request.json["filename"]
        compressed_img = Image.open('./uploads/'+file_name)
        compressed_lr_img = np.array(compressed_img)
        logging.info(f"Image compressed {compressed_lr_img}")
        rdn = RDN(arch_params={'C': 6, 'D':20, 'G':64, 'G0':64, 'x':2})
        logging.info(f"RDN called")
        rdn.model.load_weights('./Super-Resolution-GAN-master/rdn-C6-D20-G64-G064-x2_ArtefactCancelling_epoch219.hdf5')
        logging.info(f"RDN called weight loaded")
        sr_img = rdn.predict(compressed_lr_img)
        logging.info(f"RDN Predict") 
        out = Image.fromarray(sr_img)
        out.save('./outputs/'+file_name)
        logging.info(f"Output saved")
        return send_file('./outputs/'+file_name, as_attachment=True)
    except Exception as exp:
        logging.error(f"Error Occured {exp}")
        return "Unable to upscale"
    pass

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)