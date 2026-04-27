# IoT Heat Exchanger Telemetry

A robust full-stack IoT telemetry application designed to monitor and analyze real-time thermodynamic properties of a heat exchanger system using sensor data.

## Tech Stack
- **Frontend**: Next.js, React, Recharts, Tailwind CSS
- **Backend**: Python Flask, PySerial, Flask-CORS
- **Hardware**: ESP32 Microcontroller

## Features
- **Live Telemetry Dashboard**: Real-time rendering of sensor streams via React components.
- **Data Measurements**: Hot/Cold Inlet & Outlet Temperatures, Mass Flow Rate, and direct Heat Transfer (Q).
- **Advanced Thermodynamic Calculations**: 
  - Log Mean Temperature Difference (GMTD)
  - Convective Heat Transfer Coefficient (h)
  - Number of Transfer Units (NTU)
  - Transient Stability Indicator

## 🔌 Hardware Connections (VERY IMPORTANT)

### Temperature Sensors Placement

This system uses **4 temperature sensors**:

- **T1 → Hot Fluid Inlet (Tin, hot)**
  - Place at the **entry of hot fluid into heat exchanger**

- **T2 → Hot Fluid Outlet (Tout, hot)**
  - Place at the **exit of hot fluid**

- **T3 → Cold Fluid Inlet (Tin, cold)**
  - Place at the **entry of cold fluid**

- **T4 → Cold Fluid Outlet (Tout, cold)**
  - Place at the **exit of cold fluid**

---

### 📌 Summary Table

| Sensor | Location | Description |
|------|--------|------------|
| T1 | Hot Inlet | Hot fluid entering |
| T2 | Hot Outlet | Hot fluid leaving |
| T3 | Cold Inlet | Cold fluid entering |
| T4 | Cold Outlet | Cold fluid leaving |

---

### ⚠️ Important Notes

- Incorrect placement will give **wrong heat transfer calculations**
- Ensure proper thermal contact with pipes
- Avoid loose sensors (causes unstable readings)

---

## 📊 What the System Measures

- Flow Rate (L/min)
- Heat Transfer (Q)
- Hot Side Temperatures (T1, T2)
- Cold Side Temperatures (T3, T4)
- NTU (Number of Transfer Units)
- LMTD / GMTD
- Stability Profile

---

## Setup Instructions

### 1. Run the Frontend
Navigate to the project root and install the required dependencies:
```bash
npm install
npm run dev
```
The frontend will run on `http://localhost:3000`.

### 2. Run the Backend
Ensure you have Python installed. You may want to use a virtual environment:
```bash
python server.py
```
The backend API will run on `http://localhost:5000`.

> **Important Note**:
> - The Python backend **must be running** for the frontend to receive telemetry data.
> - An **ESP32** hardware unit is required for authentic, real-time serial datastreams (ensure the COM port matches the one specified in `server.py`).

## Engineering Team
- **Abhishek Chetia** – 222310002002
- **Akash Jyoti Das** – 222310002005
- **Gauranga Kishor Borah** – 222310002022
- **Idkarul Islam** – 222310002026
- **Kunjal Gogoi** – 222310002028
- **Prayash Bora** – 222310002035

## Running the Project Locally

1. Start Backend:
   python server.py

2. Open in browser:
   http://localhost:5000/data
   (You should see JSON output)

3. Start Frontend:
   npm install
   npm run dev

4. Open:
   http://localhost:3000

## Notes

* If ESP32 is NOT connected:
  The backend will run in offline mode and data may remain constant.

* If ESP32 is connected:
  Update SERIAL_PORT in server.py to match your system (e.g., COM3, COM5).

* Ensure backend is running before opening frontend.
