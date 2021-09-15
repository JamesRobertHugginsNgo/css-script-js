function process(config = {}) {
	const content = [];
	for (const key in config) {
		let value = config[key];

		if (Array.isArray(value)) {
			if (key === 'font-family') {
				value = value.join(', ');
			} else {
				value = value.join(' ');
			}
		}

		if (typeof value === 'object' && value) {
			content.push(key, '{', ...process(value), '}');
		} else {
			content.push(`${key}: ${value};`);
		}
	}
	return content;
}

function render(config = {}) {
	return process(config).join(' ');
}

function prefix(property, value, prefixes = ['-webkit-', '-moz-', '-o-', '-ms-']) {
	const properties = {};

	for (let index = 0, length = prefixes.length; index < length; index++) {
		const prefix = prefixes[index];
		properties[`${prefix}${property}`] = value;
	}

	properties[property] = value;
	return properties;
}

module.exports = {
	prefix,
	render
};