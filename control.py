import subprocess
import json

def read_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def create_hotspot(ssid, password):
    try:
        subprocess.run(['sudo', 'iw', 'dev', 'wlan0', 'interface', 'add', 'mon0', 'type', 'managed'], check=True)
        subprocess.run(['sudo', 'ip', 'link', 'set', 'mon0', 'up'], check=True)
        subprocess.run(['sudo', 'iw', 'mon0', 'ibss', 'join', ssid, '2437', '02:CA:FF:EE:BA:BE'], check=True)
        subprocess.run(['sudo', 'systemctl', 'start', 'hostapd'], check=True)
        subprocess.run(['sudo', 'systemctl', 'start', 'dnsmasq'], check=True)
        subprocess.run(['sudo', 'systemctl', 'start', 'dhclient', 'mon0'], check=True)
        print('Hotspot created successfully!')
    except subprocess.CalledProcessError as e:
        print('Error:', e)

if __name__ == "__main__":
    json_data = read_json('data.json')
    
    ssid = json_data.get('ssid', '')
    password = json_data.get('password', '')

    if ssid and password:
        create_hotspot(ssid, password)
    else:
        print('SSID or password missing in the JSON file.')