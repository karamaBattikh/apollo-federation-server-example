import { DataSource } from 'apollo-datasource'

class InternshipsDataSource extends DataSource {
  constructor(Internship) {
    super()
    this.Internship = Internship
  }

  async getAllInternships() {
    const list = await this.Internship.find({})
    return list
  }

  async getInternshipByID(id) {
    const internship = await this.Internship.findById(id)
    return internship
  }

  async createInternship(input) {
    const newInternship = this.Internship(input)
    const result = await newInternship.save()
    if (!result) return { messsage: 'err' }
    return newInternship
  }

  async updateInternship(id, input) {
    const result = await this.Internship.findByIdAndUpdate(id, input)
    if (!result) return { messsage: 'err' }
    return result
  }

  async deleteInternship(id) {
    const internship = await this.Internship.findById(id)
    if (!internship) return 'Internship Not Found !'
    await this.Internship.findByIdAndDelete(id)
    return 'The Internship was deleted successfully'
  }
}

export default InternshipsDataSource
