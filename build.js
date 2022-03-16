import fs from 'fs'
import schema_v1 from './schema.v1.js'
import Ajv from 'ajv'

const run = async e => {
	const ajv = new Ajv( { allErrors: true, useDefaults: true } )
	try {
		const validate = ajv.compile(schema_v1)
		await fs.writeFileSync('schema.v1.json', JSON.stringify(schema_v1, null, '\t'))
		console.log('wrote schema ✅')
		let template = {}
		validate(template)
		await fs.writeFileSync('schema.v1.template.json', JSON.stringify(template, null, '\t'))
		console.log('wrote template ✅')
	} catch(err) {
		err.message.split(', ').forEach( line => {
			console.log('❌', line)
		})
	}
}

run()