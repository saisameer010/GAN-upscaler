import numpy as np
from PIL import Image
from ISR.models import RDN
compressed_img = Image.open('C:/Users/Checkout/Desktop/Super-Resolution-GAN-master/demo.jpg')
compressed_lr_img = np.array(compressed_img)
rdn = RDN(arch_params={'C': 6, 'D':20, 'G':64, 'G0':64, 'x':2})
rdn.model.load_weights('C:/Users/Checkout/Desktop/Super-Resolution-GAN-master/rdn-C6-D20-G64-G064-x2_ArtefactCancelling_epoch219.hdf5')
sr_img = rdn.predict(compressed_lr_img)
out = Image.fromarray(sr_img)
out.save('C:/Users/Checkout/Desktop/Super-Resolution-GAN-master/demo-out.jpg')
out.show()
