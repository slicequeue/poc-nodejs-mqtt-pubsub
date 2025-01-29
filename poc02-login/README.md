## 개요
nodejs MQTT 사용법 관련 POC 중 02 번쨰 
MQTT __계정 아이디 비번 접속__ / 송신 / 수신 관련 테스트 진행

## 실행 순서
0. MQTT 서버 아래 설정 후 mosquitto 1883 포트 실행
1. main-sub.js 실행
1. main-pub.js 실행


## MQTT mosquitto 서버 설정

- `.\mosquitto_passwd.exe` 활용 계정 등록 명령어 입력
    
    ```powershell
    # 관리자 권한으로 실행해야함!
    PS > cd 'C:\Program Files\mosquitto' # 모스키토 경로이동
    # 계정 생성
    PS C:\Program Files\mosquitto> .\mosquitto_passwd.exe -c -b accounts.txt slicequeue <PW> # -c 파일 생성, -b 배치모드로서 프롬프트에서 비번 따로 입력하는 형태가 아님
    # 계정  
    PS C:\Program Files\mosquitto> .\mosquitto_passwd.exe -b accounts.txt sq-m1 <PW> 
    PS C:\Program Files\mosquitto> .\mosquitto_passwd.exe -b accounts.txt sq-m2 <PW>
    ```
    
- `mosquitto.conf` 파일 수정
    
    ```powershell
    PS C:\Program Files\mosquitto> vim .\mosquitto.conf
    ```
    
    ```yaml
    listener 1883 # 의외로 이게 필수
    allow_anonymous false
    password_file ./accounts.txt
    ```
    
- 실행
    
    ```powershell
    > .\mosquitto.exe -c "C:\Program Files\mosquitto\mosquitto.conf" -v
    # 계정 접속 명령어
    > .\mosquitto_sub -h localhost -t "test/topic" -u 사용자이름 -P 비밀번호 # 구독
    > .\mosquitto_pub -h localhost -t "test/topic" -m "Hello" -u 사용자이름 -P 비밀번호 # 발행
    
    ```
    
    - 이렇게 conf 파일 지정해서 실행해야 정상 동작함!