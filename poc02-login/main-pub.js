const URL = 'mqtt://localhost:1883';
const TOPIC = 'slicequeue';

const mqtt = require("mqtt");

// 인증 정보 추가
const options = {
    username: "sq-m2",
    password: "<PW>"
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
