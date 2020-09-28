import { redisSMQ } from '../../config/redisSMQ'
import Queue from '../../lib/Queue'

const initDeleteInternshipQueue = async () => {
  const deleteInternshipQueue = new Queue(redisSMQ, 'internship_deleted')
  await deleteInternshipQueue.createQueue()
  return deleteInternshipQueue
}

export default initDeleteInternshipQueue
