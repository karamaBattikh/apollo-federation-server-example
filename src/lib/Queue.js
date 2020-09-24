import { promisify } from 'util'

const wait = promisify(setTimeout)

class Queue {
  constructor(rsmq, qname) {
    this.rsmq = rsmq
    this.qname = qname
  }

  async createQueue() {
    const queues = await this.rsmq.listQueuesAsync()

    if (queues.find((queue) => queue === this.qname)) {
      return
    }
    const response = await this.rsmq.createQueueAsync({
      qname: this.qname,
      vt: 1,
    })

    if (response !== 1) {
      throw new Error(`${this.qname} could not be created`)
    }

    console.log(`${this.qname} successfully created`)
  }

  async deleteQueue() {
    const response = await this.rsmq.deleteQueueAsync({ qname: this.qname })

    if (response !== 1) {
      console.log(`Queue could not be deleted`)
      return
    }
    console.log(`${this.qname} queue and all messages deleted`)
  }

  // We’ll need a sendMessage method for allow producers to broadcast messages
  async sendMessage(message) {
    const response = await this.rsmq.sendMessageAsync({
      qname: this.qname,
      message,
    })

    if (!response) {
      throw new Error(`Message could not be sent to ${this.qname}`)
    }
    return response
  }

  async receiveMessage() {
    const response = await this.rsmq.receiveMessageAsync({ qname: this.qname })

    if (!response || !response.id) {
      return null
    }
    return response
  }
  // response sous forme
  // id: The string-based internal message ID
  // message: The string-based message content
  // rc: An integer representing the number of times this message has been received
  // fr: The timestamp of when this message was first received
  // sent : The timestamp of when this message was sent

  async deleteMessage(id) {
    const response = await this.rsmq.deleteMessageAsync({
      qname: this.qname,
      id,
    })

    return response === 1
  }

  async listen({ interval = 10000, maxReceivedCount = 10 }, callback) {
    const start = Date.now()

    try {
      // start by receiving the next available message
      const response = await this.receiveMessage()

      // if the message has already been received more than maxReceiveCount, we delete the message
      if (response && response.rc > maxReceivedCount) {
        await this.deleteMessage(response.id)
      } else if (response) {
        // if the message is still fresh we pass its into the callback
        callback(response)
        // then we delete the message
        await this.deleteMessage(response.id)
      }
    } finally {
      // checking how much time has elapsed since
      // the listen method was first called and recursively calling listen again
      const elapsedTime = Date.now() - start
      // after the difference in time between elapsed time and interval for loop tick has passed
      const waitTime = interval - elapsedTime

      await wait(Math.max(0, waitTime))
      await this.listen({ interval, maxReceivedCount }, callback)
    }
  }
}

export default Queue
