# **Online Monitoring of Unauthorized Construction**  

## **Overview**  
This cutting-edge project harnesses the power of **Mask R-CNN** for precise detection and segmentation of unauthorized construction sites using drone imagery. By integrating **Geospatial Data Processing (GDP)**, **Time-of-Flight (ToF) sensors**, and **3D modeling**, it ensures highly accurate area assessments and volumetric analysis, enhancing regulatory compliance and real-time monitoring.  

---

## **How It Works**  

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

### **3. 3D Modeling & Reconstruction**  
To enhance visualization and analysis, the system generates **3D models** of the detected structures. This aids in accurate spatial planning and law enforcement.  

#### **Steps for 3D Reconstruction:**  
- **Point Cloud Generation:** Using depth data from ToF sensors and stereo vision.  
- **Mesh Reconstruction:** Converts point cloud data into 3D mesh models.  
- **Texture Mapping:** Applies real-world textures for enhanced visualization.  
- **Export for Analysis:** Outputs 3D models in **.OBJ** or **.PLY** format for further inspection.  

---

## **Key Features**  
✅ **Real-Time Detection:** Instantly processes drone images for immediate segmentation.  
✅ **High Precision:** Advanced **Mask R-CNN** ensures top-tier segmentation accuracy.  
✅ **Accurate Area Calculation:** Converts segmented masks into real-world spatial measurements.  
✅ **Volumetric Validation:** Integrates **ToF sensors** for enhanced detection reliability.  
✅ **3D Reconstruction:** Generates interactive 3D models of unauthorized structures.  

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
- **3D Reconstruction Tools** (e.g., Open3D, MeshLab)  

---

## **Applications**  
📍 **Real-Time Surveillance:** Monitor unauthorized construction in urban and rural zones.  
📍 **Regulatory Compliance:** Ensure adherence to **building laws and zoning regulations**.  
📍 **Urban Planning & Resource Management:** Aid in sustainable land development.  
📍 **3D Visualization for Law Enforcement:** Improve legal enforcement with interactive 3D models.  

---

## **Project Demo**  
📹 **Watch the live project demonstration on YouTube!**  
[🔗 Click Here](https://youtu.be/7WgU7KTvziM?si=B-wP0uKzuABVj1Sc)  

---
