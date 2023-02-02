const express = require("express")
const app = express()
const amqp = require("amqplib")
const amqpUrl = "amqp://localhost:5672"

const Order = {
    customerId: 2,
    orderID: 8,
    OrderRefId: "hdsjjd783",
    Phone: "+23453678892"
}

app.get('/', async (req, res) => {
    try {
        const connection = await amqp.connect(amqpUrl);
        const channel = await connection.createChannel();
        await channel.assertQueue("order.shipped");
        channel.sendToQueue("order.shipped", Buffer.from(JSON.stringify(Order)));
        res.send("ORDERS API")
    } catch (error) {
        console.log(error);
    }
})

app.listen(8000, () => {
    console.log("ORDERS API listening on port 8000")
})