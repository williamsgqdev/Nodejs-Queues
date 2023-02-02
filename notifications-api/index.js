const express = require("express");

const app = express();
const amqp = require("amqplib")
const amqpUrl = "amqp://localhost:5672"

app.get("/", (req, res) => {
  res.send("NOTIFCATIONS API")
})

async function connect() {
  const connection = await amqp.connect(amqpUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue("order.shipped");
  channel.consume("order.shipped", (message) => {
    console.log("+++++++ RECEIVED MESSAGE +++++++++++++++");
    console.log(message.content.toString());
    channel.ack(message);
  });
}

connect();

app.listen(8001, () => {
  console.log("Listening on PORT 8001");
});