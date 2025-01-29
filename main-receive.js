const URL = 'mqtt://localhost:1883';
const TOPIC = 'slicequeue';

const mqtt = require("mqtt");
const client = mqtt.connect(URL);

//mqtt가 연결되면 실행
client.on('connect', () => {
    //mqtt가 연결되어있는지 확인
    console.log(client.connected);
    //topic 구독
    client.subscribe(TOPIC); //topic 구독

    //구독해놓은 메시지가 들어오면 실행
    client.on("message", (topic, message) => {
        console.log(topic, JSON.parse(message));
    });

});
