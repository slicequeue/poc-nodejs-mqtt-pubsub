## 개요
nodejs MQTT 사용법 관련 POC 중 02 번쨰 
MQTT __계정 아이디 비번 접속__ / 송신 / 수신 관련 테스트 진행

## 실행 순서
0. MQTT 서버 아래 설정 후 mosquitto 8883 포트 실행
1. main-sub.js 실행 - tls 적용
1. main-pub.js 실행 - tls 적용


## MQTT mosquitto 서버 설정
- 개요
    
    <aside>
    📢
    
    TLS 방식이란? 
    
    TLS와 SSL은 기본적으로 **암호화된 보안 연결을 제공하는 프로토콜** 입니다. Mosquitto에서 **TLS와 SSL을 설정하는 방법은 거의 동일** 하지만, SSL은 오래된 프로토콜이고, 현재 **TLS가 권장**됩니다.
    
    ✅ **1. TLS vs. SSL 차이점**
    
    |  | **TLS (Transport Layer Security)** | **SSL (Secure Sockets Layer)** |
    | --- | --- | --- |
    | 🔹 **버전** | TLS 1.0, 1.1 (비권장), 1.2, 1.3 (최신) | SSL 2.0, SSL 3.0 (폐기됨) |
    | 🔹 **보안 수준** | 최신 암호화 알고리즘 사용, 더 안전 | 구 버전은 보안 취약점 존재 |
    | 🔹 **Mosquitto 지원** | **TLS 1.2, 1.3을 주로 사용** | SSL 지원은 있지만 권장되지 않음 |
    | 🔹 **포트 (기본)** | `8883` (MQTT over TLS) | `8883` (SSL도 같은 포트) |
    
    ✔ **요약:** SSL은 더 이상 사용하지 않고 **TLS**로 대체되었음. Mosquitto에서는 사실상 **TLS를 사용한다고 보면 됨**.
    
    </aside>
    
- openssl 인증서 파일 생성
    
    TLS를 사용하려면 **CA(인증 기관) 인증서, 서버 인증서, 서버 키**가 필요합니다.
    
    테스트 용도로 **자체 서명된(Self-Signed) 인증서**를 생성하는 방법:
    
    **1️⃣ CA (인증기관) 키와 인증서 생성**
    
    ```powershell
    openssl genpkey -algorithm RSA -out ca.key
    openssl req -new -x509 -days 3650 -key ca.key -out ca.crt -subj "/CN=MyMosquittoCA"
    ```
    
    **2️⃣ 서버 키와 인증서 생성**
    
    ```powershell
    openssl genpkey -algorithm RSA -out server.key
    openssl req -new -key server.key -out server.csr -subj "/CN=localhost"
    openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 3650
    ```
    
    ➡ 위 과정에서 `server.crt`, `server.key`, `ca.crt`가 생성됨.
    
- Mosquitto conf 설정을 수정
    - `mosquitto.conf` 설정 서버에서 TLS 적용
        
        ```yaml
        listener 8883
        allow_anonymous false
        
        # TLS 설정
        cafile C:\path\to\ca.crt
        certfile C:\path\to\server.crt
        keyfile C:\path\to\server.key
        ```
        
        - `cafile` → CA 인증서 경로
        - `certfile` → 서버 인증서 경로
        - `keyfile` → 서버 키 경로
    - 실행
        
        ```powershell
        > .\mosquitto.exe -c "C:\Program Files\mosquitto\mosquitto.conf" -v
        ```

## 기타 정보
<aside>
📢

### ✅ **`listener 8883`은 Well-Known Port인가?**

Yes! **TCP 포트 8883은 MQTT over TLS/SSL의 공식적인 Well-Known 포트**

📌 **2. MQTT 관련 공식 포트**

| 포트 번호 | 설명 |
| --- | --- |
| **1883** | MQTT (비보안, 기본 포트) |
| **8883** | MQTT over TLS/SSL (보안 포트, **Well-Known**) |
| 80 / 443 | MQTT over WebSockets (HTTP / HTTPS) |

✅ **포트 8883은 TLS/SSL 보안을 적용한 MQTT를 위한 공식 표준 포트이며, IANA에 등록되어 있음.**

✅ **포트 1883은 기본적으로 암호화되지 않은 MQTT 통신용 포트.**

</aside> 
