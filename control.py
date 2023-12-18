import subprocess
import json

def read_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def turn_on_hotspot(ssid, password):
    try:
        subprocess.run(['nmcli', '--version'], check=True, stdout=subprocess.PIPE)
        subprocess.run(['nmcli', 'device', 'wifi', 'hotspot', 'ifname', 'wlan0', 'con-name', 'Hotspot', 'ssid', ssid, 'password', password], check=True)
        print('Hotspot turned on successfully!')
    except subprocess.CalledProcessError as e:
        print(f'Error turning on hotspot: {e}')

if __name__ == "__main__":
    json_data = read_json('./backend/data.json')
    
    ssid = json_data.get('ssid', '')
    password = json_data.get('password', '')

    if ssid and password:
        turn_on_hotspot(ssid, password)
    else:
        print('SSID or password missing in the JSON file.')



