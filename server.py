import serial
import threading
import time
import math
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Default COM port (Windows) or /dev/ttyUSB0 (Linux/Mac)
# Change this variable if your ESP32 uses a different port!
SERIAL_PORT = 'COM10'  
BAUD_RATE = 115200

# Thread-safe global state for latest sensor data
latest_data = {
    "time": 0.0,
    "Th_in": 0.0,
    "Th_out": 0.0,
    "Tc_in": 0.0,
    "Tc_out": 0.0,
    "flow": 0.0,
    "Q": 0.0,
    "gmtd": 0.0,
    "h": 0.0,
    "ntu": 0.0,
    "stability": 0.0
}

data_lock = threading.Lock()

def read_serial_data():
    global latest_data
    ser = None
    
    while True:
        try:
            if ser is None or not ser.is_open:
                print(f"Attempting to connect to ESP32 on {SERIAL_PORT}...")
                try:
                    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
                    print(f"Successfully connected to {SERIAL_PORT}")
                except:
                    ser = None
                    print(f"[Warning] Serial port {SERIAL_PORT} unavailable. Offline mode active.")
                    time.sleep(2)
            
            if ser is not None:
                line = ser.readline().decode('utf-8').strip()
            else:
                line = ""
                time.sleep(1)
            
            if line:
                # Expected format: time,Th_in,Th_out,Tc_in,Tc_out,flow,Q
                parts = line.split(',')
                if len(parts) == 7:
                    try:
                        # Parse safely preventing crashes on malformed data
                        parsed = {
                            "time": float(parts[0]),
                            "Th_in": float(parts[1]),
                            "Th_out": float(parts[2]),
                            "Tc_in": float(parts[3]),
                            "Tc_out": float(parts[4]),
                            "flow": float(parts[5]),
                            "Q": float(parts[6])
                        }
                        
                        # 1. Temperature differences
                        deltaT1 = parsed["Th_in"] - parsed["Tc_out"]
                        deltaT2 = parsed["Th_out"] - parsed["Tc_in"]
                        
                        # 2. GMTD (Log Mean Temp Difference)
                        if deltaT1 != deltaT2 and deltaT1 > 0 and deltaT2 > 0:
                            gmtd = (deltaT1 - deltaT2) / math.log(deltaT1 / deltaT2)
                        else:
                            gmtd = 0.0
                            
                        # 3. Heat transfer coefficient (h)
                        A = 1.0
                        if gmtd > 0:
                            h = parsed["Q"] / (A * gmtd)
                        else:
                            h = 0.0
                        
                        # 4. NTU
                        Cp = 4186.0
                        C = parsed["flow"] * Cp
                        if C > 0:
                            ntu = h / C
                        else:
                            ntu = 0.0
                            
                        # 5. Stability indicator
                        stability = abs(deltaT1 - deltaT2)
                        
                        # Update thread-safe state dynamically
                        with data_lock:
                            
                            parsed["gmtd"] = gmtd
                            parsed["h"] = h
                            parsed["ntu"] = ntu
                            parsed["stability"] = stability
                            
                            latest_data = parsed
                            
                    except ValueError:
                        print(f"[Warning] Dropped malformed numerical CSV row: {line}")
                else:
                    print(f"[Warning] Unexpected column count: {line}")
                    
        except serial.SerialException as e:
            print(f"[Error] Serial Error: {e}. Retrying in 2 seconds (Check COM Port or USB Connection)...")
            if ser:
                ser.close()
                ser = None
            time.sleep(2)
        except Exception as e:
            print(f"[Error] Unexpected Error: {e}. Retrying...")
            time.sleep(2)

@app.route('/data', methods=['GET'])
def get_data():
    """ Expose the latest cached ESP32 state over REST """
    with data_lock:
        return jsonify(latest_data)

if __name__ == '__main__':
    # Start the continuous serial background thread safely so Flask never blocks
    serial_thread = threading.Thread(target=read_serial_data, daemon=True)
    serial_thread.start()
    
    # Run the Flask API server
    print("Starting telemetry server on port 5000...")
    # use_reloader=False prevents double-firing of background daemon threads
    app.run(host='0.0.0.0', port=5000, use_reloader=False) 
