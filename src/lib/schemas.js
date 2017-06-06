const componentSchema = {
    properties: {
        name: {
            pattern: /^[a-zA-Z]+$/,
            message: 'Name must be only letters',
            required: true
        },
        path: {
            pattern: /^[a-zA-Z]+$/,
            message: 'Name must be only letters',
            required: true,
            default: "lib"
        }
    }
};

const namedSchema = {
    properties: {
        name: {
            pattern: /^[a-zA-Z]+$/,
            message: 'Name must be only letters',
            required: true
        }
    }
};


module.exports = {
    component: componentSchema,
    named: namedSchema
};