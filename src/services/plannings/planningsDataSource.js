import { DataSource } from 'apollo-datasource'

class PlanningsDataSource extends DataSource {
  constructor(Planning) {
    super()
    this.Planning = Planning
  }

  async getAllPlannings() {
    const list = await this.Planning.find({})
    return list
  }

  async getPlanningByID(id) {
    const planning = await this.Planning.findById(id)
    return planning
  }

  async createPlanning(input) {
    const newPlanning = this.Planning(input)
    const result = await newPlanning.save()
    if (!result) return { messsage: 'err' }
    return newPlanning
  }

  async updatePlanning(id, input) {
    const result = await this.Planning.findByIdAndUpdate(id, input)
    if (!result) return { messsage: 'err' }
    return result
  }

  async deletePlanning(id) {
    const planning = await this.Planning.findById(id)
    if (!planning) return 'Planning Not Found !'
    await this.Planning.findByIdAndDelete(id)
    return 'The Planning was deleted successfully'
  }
}

export default PlanningsDataSource
