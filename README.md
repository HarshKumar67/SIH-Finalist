# Online Monitoring of Unauthorized Construction 

## Overview
This cutting-edge project harnesses the power of **Mask R-CNN** for precise detection and segmentation of unauthorized construction sites using drone imagery. By integrating **Geospatial Data Processing (GDP)** and **Time-of-Flight (ToF) sensors**, it ensures highly accurate area assessments and volumetric analysis, enhancing regulatory compliance and real-time monitoring.

---

## How It Works

### **1. Detection & Segmentation via Mask R-CNN**
The system utilizes a **Mask R-CNN** model trained on a custom dataset of drone-captured images to detect and segment unauthorized structures.

#### **Steps for Area Detection:**
- Extract segmented regions as binary masks.
- Georeference these masks to align them with real-world spatial coordinates.
- Convert pixel-based areas into **real-world measurements (square meters)** using **Geospatial Data Processing (GDP)** tools.

---

### **2. Validation with Time-of-Flight (ToF) Sensors**
ToF sensors are employed to measure depth and volumetric details, ensuring precise assessment of unauthorized structures.

#### **Steps for Validation:**
- **Depth Analysis:** Accurately measures structure height.
- **Volumetric Estimation:** Ensures accurate 3D mapping for compliance verification.

---

## **Key Features**
- **Real-Time Detection:** Instantly processes drone images for immediate segmentation.
- **High Precision:** Advanced **Mask R-CNN** ensures top-tier segmentation accuracy.
- **Accurate Area Calculation:** Converts segmented masks into real-world spatial measurements.
- **Volumetric Validation:** Integrates **ToF sensors** for enhanced detection reliability.

---

## **Requirements**
### **Hardware**
- Drone with a high-resolution camera.
- **Time-of-Flight (ToF) sensors** for depth assessment.

### **Software**
- **Python**
- **TensorFlow**
- **OpenCV**
- **Geospatial tools** (e.g., QGIS, GDAL)

---

## **Applications**
- **Real-Time Surveillance:** Monitor unauthorized construction in urban and rural zones.
- **Regulatory Compliance:** Ensure adherence to **building laws and zoning regulations**.
- **Urban Planning & Resource Management:** Aid in sustainable land development.

---

## **Project Demo**
📹 **Watch the live project demonstration on YouTube!**
https://youtu.be/7WgU7KTvziM?si=B-wP0uKzuABVj1Sc
