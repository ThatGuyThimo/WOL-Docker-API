# Wake-On-LAN Server for Docker

This application is a lightweight, open-source Wake-On-LAN (WOL) server built using Node.js and Express, designed to manage devices in a local network. It allows users to send WOL packets to wake up devices remotely and check their online status using simple API endpoints.

The application is Docker-compatible for easy deployment but can also run natively on Node.js. It supports configurable HTTP and HTTPS ports, optional SSL encryption, and accepts standard MAC address formats for seamless integration. Ideal for home labs, IT administrators, or anyone looking to automate device management on their network.

## Features

- **Wake Devices**: Send a WOL packet to wake a target device using its MAC and IP address.
- **Check Device Status**: Verify if a device is online or offline using its MAC and IP address.
- **SSL & Port Configuration**: Easily configurable HTTP and HTTPS ports with optional SSL support.

---

## Installation

### Docker
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/wol-server.git
   cd wol-server
   ```

2. Create a `.env` file for configuration:
   ```env
   HTTPPORT=8080
   HTTPSPORT=8443
   PHASSPHRASE=""
   KEYFILE=""
   CERTFILE=""
   ```

3. Build and run the Docker container:
   ```bash
   docker build -t wol-server .
   docker run -p 8080:8080 -p 8443:8443 --env-file .env wol-server
   ```

---

### Run in Node.js (Without Docker)

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/wol-server.git
   cd wol-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file for configuration:
   ```env
   HTTPPORT=8080
   HTTPSPORT=8443
   PHASSPHRASE=""
   KEYFILE=""
   CERTFILE=""
   ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Access the server by sending GET requests to `http://localhost:8080` or `https://localhost:8443` (if SSL is configured). Note: The server does not provide a web interface.

---

## API Endpoints

### 1. `/WOL/wake`
**Description**: Sends a Wake-On-LAN packet to wake a target device.  
**Method**: `GET`  
**Parameters**:  
- `MAC_ADDRESS` (string) – The MAC address of the target device.
- `IP_ADDRESS` (string) – The IP address of the target device.

**Response**:
- `200 OK` – Returns `true` if the wake packet was sent successfully.
- `400 Bad Request` – Returns an error message if the operation failed.

---

### 2. `/WOL/status`
**Description**: Checks the online status of a target device.  
**Method**: `GET`  
**Parameters**:  
- `MAC_ADDRESS` (string) – The MAC address of the target device.
- `IP_ADDRESS` (string) – The IP address of the target device.

**Response**:
- `200 OK` – Returns `true` if the device is online, `false` otherwise.
- `400 Bad Request` – Returns an error message if the operation failed.

---

## Environment Variables

- `HTTPPORT` – The port to expose the HTTP server. (Default: `8080`)
- `HTTPSPORT` – The port to expose the HTTPS server. (Default: `8443`)
- `PHASSPHRASE` – Optional passphrase for SSL/TLS configuration.
- `KEYFILE` – Optional name of the certificate key file.
- `CERTFILE` – Optional name of the certificate file.

---

## Accepted MAC Address Formats

The server accepts the following MAC address formats:
- `20:DE:20:DE:20:DE`
- `20-DE-20-DE-20-DE`
- `20DE20DE20DE`

Ensure the provided MAC address conforms to one of these formats.

---

## Example Usage

### Wake a Device
```bash
curl -X GET "http://localhost:8080/WOL/wake?MAC_ADDRESS=20-DE-20-DE-20-DE&IP_ADDRESS=192.168.1.100"
```

### Check Device Status
```bash
curl -X GET "http://localhost:8080/WOL/status?MAC_ADDRESS=20-DE-20-DE-20-DE&IP_ADDRESS=192.168.1.100"
```

---

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to help improve this project.

---

## License

This project is licensed under the [MIT License](LICENSE).