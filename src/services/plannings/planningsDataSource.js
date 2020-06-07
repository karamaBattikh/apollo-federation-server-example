import { DataSource } from 'apollo-datasource'
import { omit } from 'lodash'

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
    if (!planning) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Planning Not Found!',
      }
    }
    return {
      __typename: 'Planning',
      ...omit(planning, '__v'),
    }
  }

  async createPlanning(input) {
    const newPlanning = this.Planning(input)
    const result = await newPlanning.save()
    if (!result) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Error in create Planning',
      }
    }
    return {
      __typename: 'Planning',
      ...omit(result, '__v'),
    }
  }

  async updatePlanning(id, input) {
    const planning = await this.Planning.findById(id)
    if (!planning) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Planning Not Found!',
      }
    }
    const result = await this.Planning.findByIdAndUpdate(id, input)
    if (!result) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Error in update Planning',
      }
    }
    return {
      __typename: 'Planning',
      ...omit(result, '__v'),
    }
  }

  async deletePlanning(id) {
    const planning = await this.Planning.findById(id)
    if (!planning) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Planning Not Found!',
      }
    }
    await this.Planning.findByIdAndDelete(id)
    return {
      __typename: 'SuccessMessage',
      errors: 'The Planning was deleted successfully',
    }
  }
}

export default PlanningsDataSource
