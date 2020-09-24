import { redisSMQ } from '../config/redisSMQ'
import Queue from '../lib/Queue'

;(async () => {
  const testQueue = new Queue(redisSMQ, 'test_queue')
  await testQueue.createQueue()

  const sentMessage = await testQueue.sendMessage('Test message')
  console.log('sentMessage', sentMessage)

  await testQueue.listen({ interval: 1000, maxReceivedCount: 5 }, (payload) => {
    console.log('Message received:', payload)
    // throw new Error("Something went wrong");
  })
  // await testQueue.deleteQueue();
})()
