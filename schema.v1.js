const SOURCE_TYPES = [
	'image',
	'video',
	'camera',
	'stereoscopic'
]

const INPUTS = {
	type: 'object',
	default: {},
	patternProperties: {
		'^.*$': {
			anyOf: [
				{ type: 'number' },
				{ type: 'array' },
				{ type: 'boolean' }
			]
		}
	},
	additionalProperties: false
}

export default {
	$id: '/',
	type: 'object',
	required: ['version','sources','media','parameters','project','record', 'components'],
	properties: {
		version: {
			type: 'number',
			default: 1,
			readOnly: true
		},
		sources: {
			type: 'object',
			default: {},
			required: ['type','path'],
			properties: {
				type: {
					type: 'integer',
					default: 1,
					enum: SOURCE_TYPES.map( (s,i) => i + 1 )
				},
				path: {
					type: 'string',
					default: 'testcard.png'
				},
				data: {
					type: 'object'
				}
			}
		},
		media: {
			type: 'array',
			default: [],
			items: {
				type: 'object'
			}
		},
		parameters: {
			description: 'miscelleneous parameters',
			...INPUTS
		},
		project: {
			type: 'object',
			default: {},
			required: ['setup','update','draw'],
			properties: {
				setup: {
					description: 'LUA setup script',
					type: 'string',
					default: ''
				},
				update: {
					description: 'LUA update script',
					type: 'string',
					default: ''
				},
				draw: {
					description: 'LUA draw script',
					type: 'string',
					default: ''
				}
			}
		},
		record: {
			type: 'object',
			default: {},
			required: ['enabled','filename','status'],
			properties: {
				enabled: {
					type: 'boolean',
					default: false
				},
				filename: {
					type: 'string',
					default: 'recording'
				},
				status: {
					type: 'integer',
					default: 0
				}
			}
		},
		components: {
			type: 'array',
			default: [],
			items: {
				type: 'object',
				required: ['shader','status','enabled'],
				properties: {
					shader: {
						description: 'define an ISF shader',
						type: 'object',
						required: ['fragment','vertex','uniforms'],
						properties: {
							fragment: {
								description: 'ISF fragment shader',
								type: 'string'
							},
							vertex: {
								description: 'ISF vertex shader',
								type: 'string'
							},
							uniforms: {
								description: 'ISF shader uniforms',
								...INPUTS
							}
						}
					},
					status: {
						description: 'current status of shader',
						type: 'integer',
						readOnly: true
					},
					enabled: {
						description: 'enable or disable layer',
						type: 'boolean',
						default: true
					}
				}
			}
		}

	}


}