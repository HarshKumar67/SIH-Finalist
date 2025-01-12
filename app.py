# from flask import Flask, render_template, request, url_for
# import os
# import cv2
# import torch
# import numpy as np
# from datetime import datetime
# from torchvision.transforms import functional as F
# from torchvision.models.detection import maskrcnn_resnet50_fpn
# import requests
# import csv
# import serial  # For Arduino communication

# app = Flask(__name__)

# # Configuration
# IP_CAMERA_URL = "http://100.94.246.95:8080/shot.jpg"
# MODEL_PATH = r"C:\Users\harsh\OneDrive\Desktop\final_RTM\model\folder5H_rcnn_weights.pth"
# CSV_FILE_PATH = r"C:\Users\harsh\OneDrive\Desktop\final_RTM\hight.csv"
# TRACKER_FILE_PATH = r"C:\Users\harsh\OneDrive\Desktop\final_RTM\want.txt"
# STATIC_FOLDER = os.path.join("static")
# NUM_CLASSES = 2
# CONFIDENCE_THRESHOLD = 0.5
# SERIAL_PORT = "COM15"  # Update with your Arduino's port
# BAUD_RATE = 9600


# def load_model(model_path, num_classes):
#     model = maskrcnn_resnet50_fpn(pretrained=False, num_classes=num_classes)
#     model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
#     model.eval()
#     return model


# def read_ultrasonic_height():
#     try:
#         with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=2) as ser:
#             ser.write(b"READ\n")  # Command to Arduino to send data
#             line = ser.readline().decode('utf-8').strip()
#             return float(line)
#     except (serial.SerialException, ValueError):
#         return None


# @app.route('/')
# def index():
#     return render_template('index.html')


# @app.route('/monitor', methods=['POST'])
# def monitor():
#     # Load the model
#     model = load_model(MODEL_PATH, NUM_CLASSES)

#     # Capture image from IP camera
#     response = requests.get(IP_CAMERA_URL, stream=True)
#     if response.status_code == 200:
#         nparr = np.frombuffer(response.content, np.uint8)
#         image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#         # Save the captured image in the static folder
#         image_path = os.path.join(STATIC_FOLDER, 'champ.jpg')
#         cv2.imwrite(image_path, image)

#     # Get next row from CSV
#     with open(CSV_FILE_PATH, 'r') as csv_file:
#         reader = list(csv.DictReader(csv_file))
#         with open(TRACKER_FILE_PATH, 'r+') as tracker_file:
#             index = int(tracker_file.read().strip() or 0)
#             row = reader[index % len(reader)]
#             tracker_file.seek(0)
#             tracker_file.write(str((index + 1) % len(reader)))

#     # Perform prediction
#     image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#     input_tensor = F.to_tensor(image_rgb).unsqueeze(0)
#     with torch.no_grad():
#         predictions = model(input_tensor)
#     masks = predictions[0]['masks']
#     scores = predictions[0]['scores']
#     mask_indices = torch.where(scores > CONFIDENCE_THRESHOLD)[0]

#     binary_mask = np.zeros(image.shape[:2], dtype=np.uint8)
#     for idx in mask_indices:
#         mask = masks[idx, 0].numpy()
#         binary_mask = np.logical_or(binary_mask, mask > 0.5).astype(np.uint8)
#     binary_mask_255 = (binary_mask * 255).astype(np.uint8)

#     # Save binary mask in the static folder
#     mask_path = os.path.join(STATIC_FOLDER, 'binary_mask.jpg')
#     cv2.imwrite(mask_path, binary_mask_255)

#     white_pixel_count = np.sum(binary_mask_255 == 255)

#     # Read height from Arduino
#     measured_height = read_ultrasonic_height()
#     if measured_height is None:
#         return render_template(
#             'error.html', message="Failed to read height from ultrasonic sensor."
#         )

#     # Calculate differences
#     csv_height = float(row["height"])
#     csv_pixels = int(row["pixels"])
#     house_id = row["house"]
#     height_difference = abs(measured_height - csv_height)
#     pixel_difference = abs(white_pixel_count - csv_pixels)

#     # Prepare results
#     result = {
#         "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
#         "house_id": house_id,
#         "csv_height": csv_height,
#         "measured_height": measured_height,
#         "height_difference": height_difference,
#         "csv_pixels": csv_pixels,
#         "calculated_pixels": white_pixel_count,
#         "pixel_difference": pixel_difference,
#     }

#     # Save data to for_govt.csv
#     for_govt_csv = r"C:\Users\harsh\OneDrive\Desktop\final_RTM\for_govt.csv"
#     file_exists = os.path.isfile(for_govt_csv)
#     with open(for_govt_csv, 'a', newline='') as csvfile:
#         fieldnames = ['timestamp', 'house_id', 'measured_height', 'calculated_pixels']
#         writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
#         if not file_exists:
#             writer.writeheader()
#         writer.writerow({
#             "timestamp": result["timestamp"],
#             "house_id": result["house_id"],
#             "measured_height": result["measured_height"],
#             "calculated_pixels": result["calculated_pixels"]
#         })

#     # Generate URLs for the static files
#     image_url = url_for('static', filename='champ.jpg')
#     mask_url = url_for('static', filename='binary_mask.jpg')

#     return render_template('results.html', result=result, image_path=image_url, mask_path=mask_url)


# if __name__ == "__main__":
#     app.run(debug=True)



# from flask import Flask, render_template, request, url_for, send_file
# import os
# import cv2
# import torch
# import numpy as np
# from datetime import datetime
# from torchvision.transforms import functional as F
# from torchvision.models.detection import maskrcnn_resnet50_fpn
# import requests
# import csv
# import serial
# from fpdf import FPDF

# app = Flask(__name__)

# # Configuration
# IP_CAMERA_URL = "http://100.94.246.95:8080/shot.jpg"
# MODEL_PATH = r"C:\Users\harsh\OneDrive\Desktop\final_RTM\model\folder5H_rcnn_weights.pth"
# CSV_FILE_PATH = r"C:\Users\harsh\OneDrive\Desktop\final_RTM\hight.csv"
# TRACKER_FILE_PATH = r"C:\Users\harsh\OneDrive\Desktop\final_RTM\want.txt"
# STATIC_FOLDER = os.path.join("static")
# FOR_GOVT_CSV = os.path.join("static", "for_govt.csv")
# NUM_CLASSES = 2
# CONFIDENCE_THRESHOLD = 0.5
# SERIAL_PORT = "COM15"
# BAUD_RATE = 9600

# def load_model(model_path, num_classes):
#     model = maskrcnn_resnet50_fpn(pretrained=False, num_classes=num_classes)
#     model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
#     model.eval()
#     return model

# def read_ultrasonic_height():
#     try:
#         with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=2) as ser:
#             ser.write(b"READ\n")
#             line = ser.readline().decode('utf-8').strip()
#             return float(line)
#     except (serial.SerialException, ValueError):
#         return None

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/monitor', methods=['POST'])
# def monitor():
#     model = load_model(MODEL_PATH, NUM_CLASSES)

#     response = requests.get(IP_CAMERA_URL, stream=True)
#     if response.status_code == 200:
#         nparr = np.frombuffer(response.content, np.uint8)
#         image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#         image_path = os.path.join(STATIC_FOLDER, 'champ.jpg')
#         cv2.imwrite(image_path, image)
#     else:
#         return "Failed to capture image from IP camera.", 500

#     with open(CSV_FILE_PATH, 'r') as csv_file:
#         reader = list(csv.DictReader(csv_file))
#         with open(TRACKER_FILE_PATH, 'r+') as tracker_file:
#             index = int(tracker_file.read().strip() or 0)
#             row = reader[index % len(reader)]
#             tracker_file.seek(0)
#             tracker_file.write(str((index + 1) % len(reader)))

#     image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#     input_tensor = F.to_tensor(image_rgb).unsqueeze(0)
#     with torch.no_grad():
#         predictions = model(input_tensor)
#     masks = predictions[0]['masks']
#     scores = predictions[0]['scores']
#     mask_indices = torch.where(scores > CONFIDENCE_THRESHOLD)[0]

#     binary_mask = np.zeros(image.shape[:2], dtype=np.uint8)
#     for idx in mask_indices:
#         mask = masks[idx, 0].numpy()
#         binary_mask = np.logical_or(binary_mask, mask > 0.5).astype(np.uint8)
#     binary_mask_255 = (binary_mask * 255).astype(np.uint8)

#     mask_path = os.path.join(STATIC_FOLDER, 'binary_mask.jpg')
#     cv2.imwrite(mask_path, binary_mask_255)

#     white_pixel_count = np.sum(binary_mask_255 == 255)
#     measured_height = read_ultrasonic_height()
#     if measured_height is None:
#         return render_template(
#             'error.html', message="Failed to read height from ultrasonic sensor."
#         )

#     csv_height = float(row["height"])
#     csv_pixels = int(row["pixels"])
#     house_id = row["house"]
#     height_difference = abs(measured_height - csv_height)
#     pixel_difference = abs(white_pixel_count - csv_pixels)

#     result = {
#         "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
#         "house_id": house_id,
#         "csv_height": f"{csv_height} cm",
#         "measured_height": f"{measured_height} cm",
#         "height_difference": f"{height_difference} cm",
#         "csv_pixels": csv_pixels,
#         "calculated_pixels": white_pixel_count,
#         "pixel_difference": pixel_difference,
#     }

#     with open(FOR_GOVT_CSV, 'a', newline='') as csvfile:
#         fieldnames = [
#             "timestamp", "house_id", "csv_height", "measured_height",
#             "height_difference", "csv_pixels", "calculated_pixels", "pixel_difference"
#         ]
#         writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
#         if csvfile.tell() == 0:
#             writer.writeheader()
#         writer.writerow(result)

#     image_url = url_for('static', filename='champ.jpg')
#     mask_url = url_for('static', filename='binary_mask.jpg')

#     return render_template('results.html', result=result, image_path=image_url, mask_path=mask_url)

# @app.route('/download_pdf/<house_id>')
# def download_pdf(house_id):
#     with open(FOR_GOVT_CSV, 'r') as csvfile:
#         reader = csv.DictReader(csvfile)
#         for row in reader:
#             if row["house_id"] == house_id:
#                 pdf = FPDF()
#                 pdf.add_page()
#                 pdf.set_font("Arial", size=12)
#                 pdf.cell(200, 10, txt=f"Details for House ID: {house_id}", ln=True, align='C')
#                 for key, value in row.items():
#                     pdf.cell(0, 10, txt=f"{key}: {value}", ln=True)
#                 pdf_path = os.path.join(STATIC_FOLDER, f"{house_id}_details.pdf")
#                 pdf.output(pdf_path)
#                 return send_file(pdf_path, as_attachment=True)

#     return "House ID not found.", 404

# if __name__ == "__main__":
#     app.run(debug=True)







from flask import Flask, render_template, request, url_for, send_file
import os
import cv2
import torch
import numpy as np
from datetime import datetime
from torchvision.transforms import functional as F
from torchvision.models.detection import maskrcnn_resnet50_fpn
import requests
import csv
import serial
from fpdf import FPDF

app = Flask(__name__)

# Configuration
IP_CAMERA_URL = "http://100.94.246.95:8080/shot.jpg"
MODEL_PATH = r"C:\Users\harsh\OneDrive\Desktop\final_RTM\model\folder5H_rcnn_weights.pth"
CSV_FILE_PATH = r"C:\Users\harsh\OneDrive\Desktop\final_RTM\hight.csv"
TRACKER_FILE_PATH = r"C:\Users\harsh\OneDrive\Desktop\final_RTM\want.txt"
STATIC_FOLDER = os.path.join("static")
FOR_GOVT_CSV = os.path.join("static", "for_govt.csv")
NUM_CLASSES = 2
CONFIDENCE_THRESHOLD = 0.5
SERIAL_PORT = "COM15"
BAUD_RATE = 9600

def load_model(model_path, num_classes):
    model = maskrcnn_resnet50_fpn(pretrained=False, num_classes=num_classes)
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    return model

def read_ultrasonic_height():
    try:
        with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=2) as ser:
            ser.write(b"READ\n")
            line = ser.readline().decode('utf-8').strip()
            return float(line)
    except (serial.SerialException, ValueError):
        return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/monitor', methods=['POST'])
def monitor():
    model = load_model(MODEL_PATH, NUM_CLASSES)

    response = requests.get(IP_CAMERA_URL, stream=True)
    if response.status_code == 200:
        nparr = np.frombuffer(response.content, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        image_path = os.path.join(STATIC_FOLDER, 'champ.jpg')
        cv2.imwrite(image_path, image)
    else:
        return "Failed to capture image from IP camera.", 500

    with open(CSV_FILE_PATH, 'r') as csv_file:
        reader = list(csv.DictReader(csv_file))
        with open(TRACKER_FILE_PATH, 'r+') as tracker_file:
            index = int(tracker_file.read().strip() or 0)
            row = reader[index % len(reader)]
            tracker_file.seek(0)
            tracker_file.write(str((index + 1) % len(reader)))

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    input_tensor = F.to_tensor(image_rgb).unsqueeze(0)
    with torch.no_grad():
        predictions = model(input_tensor)
    masks = predictions[0]['masks']
    scores = predictions[0]['scores']
    mask_indices = torch.where(scores > CONFIDENCE_THRESHOLD)[0]

    binary_mask = np.zeros(image.shape[:2], dtype=np.uint8)
    for idx in mask_indices:
        mask = masks[idx, 0].numpy()
        binary_mask = np.logical_or(binary_mask, mask > 0.5).astype(np.uint8)
    binary_mask_255 = (binary_mask * 255).astype(np.uint8)

    mask_path = os.path.join(STATIC_FOLDER, 'binary_mask.jpg')
    cv2.imwrite(mask_path, binary_mask_255)

    white_pixel_count = np.sum(binary_mask_255 == 255)
    measured_height = read_ultrasonic_height()
    if measured_height is None:
        return render_template(
            'error.html', message="Failed to read height from ultrasonic sensor."
        )

    csv_height = float(row["height"])
    csv_pixels = int(row["pixels"])
    house_id = row["house"]
    height_difference = abs(measured_height - csv_height)
    pixel_difference = abs(white_pixel_count - csv_pixels)

    result = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "house_id": house_id,
        "csv_height": f"{csv_height} cm",
        "measured_height": f"{measured_height} cm",
        "height_difference": f"{height_difference} cm",
        "csv_pixels": csv_pixels,
        "calculated_pixels": white_pixel_count,
        "pixel_difference": pixel_difference,
    }

    with open(FOR_GOVT_CSV, 'a', newline='') as csvfile:
        fieldnames = [
            "timestamp", "house_id", "csv_height", "measured_height",
            "height_difference", "csv_pixels", "calculated_pixels", "pixel_difference"
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if csvfile.tell() == 0:
            writer.writeheader()
        writer.writerow(result)

    image_url = url_for('static', filename='champ.jpg')
    mask_url = url_for('static', filename='binary_mask.jpg')

    return render_template('results.html', result=result, image_path=image_url, mask_path=mask_url)

@app.route('/download_pdf/<house_id>')
def download_pdf(house_id):
    with open(FOR_GOVT_CSV, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if row["house_id"] == house_id:
                pdf = FPDF()
                pdf.add_page()
                pdf.set_font("Arial", size=12)
                pdf.cell(200, 10, txt=f"Details for House ID: {house_id}", ln=True, align='C')
                for key, value in row.items():
                    pdf.cell(0, 10, txt=f"{key}: {value}", ln=True)
                pdf_path = os.path.join(STATIC_FOLDER, f"{house_id}_details.pdf")
                pdf.output(pdf_path)
                return send_file(pdf_path, as_attachment=True)

    return "House ID not found.", 404

if __name__ == "__main__":
    app.run(debug=True)


