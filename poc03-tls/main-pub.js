const URL = 'mqtts://localhost:8883';
const TOPIC = 'slicequeue';

const mqtt = require("mqtt");

// 인증 정보 추가
const options = {
    username: "sq-m2",
    password: "<PW>",
    ca: ["C:\\Users\\user\\workplace-openssl\\poc-mqtt\\ca.crt"],  // CA 인증서 경로 (클라이언트에서 신뢰)
    rejectUnauthorized: false    // CA가 신뢰되지 않으면 연결 차단
};

const client = mqtt.connect(URL, options);

//mqtt가 연결되면 실행
client.on('connect', () => {
    //mqtt가 연결되어있는지 확인
    console.log(client.connected);
    //topic 구독
    client.subscribe(TOPIC, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('send message!');
        client.publish(TOPIC, JSON.stringify({msg: "Hello MQTT slicequeue channel!"}));
    }); //topic 구독
});
