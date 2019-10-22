require('dotenv').config()

const path = require('path')
const Postgrator = require('postgrator')
const chalk = require('chalk')

const postgrator = new Postgrator({
  migrationDirectory: path.join(__dirname, 'migrations'),
  driver: 'pg',
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

const info = chalk.dim.white
const success = chalk.green
const error = chalk.red

postgrator.on('migration-started', migration => {
  console.log(info(`Running ${migration.filename}`))
})

postgrator.on('migration-finished', migration => {
  console.log(success(`Applied migration ${migration.filename}`))
})

const TO_VERSION = process.env.TO_VERSION || 'max'

postgrator
  .migrate(TO_VERSION)
  .then(() =>
    console.log(success(`Successfully migrated to version ${TO_VERSION}`))
  )
  .catch(migrationError => console.error(error(`Error: ${migrationError}`)))
