import { DataTypes, Deferrable } from 'sequelize'
import sequelize from '../index'
import Project from './Project'

const ProjectImage = sequelize.define("ProjectImages", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  link: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  projectId: {
    type: DataTypes.UUID,
    references: {
      model: Project,
      key: "uuid",
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
})

module.exports = ProjectImage