const express = require("express");
const redis = require("redis");
//레디스 클라이언트 생성 
const redisClient = redis.createClient({
    host: "redis-server",
    port: 6379
})
redisClient.on('error', (err) => {
    console.error('redisClinet.on >>', err)
});
const app = express();
app.listen(8080);

//숫자는 0 부터 시작합니다.
redisClient.set("number", 0);

app.get('/', (req, res) => {
    redisClient.get("number", (err, number) => {
        if (err) console.error('왜 시불!', err);
        //현재 숫자를 가져온 후에 1씩 올려줍니다.
        res.send("숫자가 1씩 올라갑니다. 숫자: " + number)
        redisClient.set("number", parseInt(number) + 1)
    })
})


console.log('Server is running');