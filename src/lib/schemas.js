const componentSchema = {
    properties: {
        name: {
            pattern: /^[a-zA-Z]+$/,
            message: 'Name must be only letters',
            required: true
        },
        path: {
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

const projectSchema = {
    properties: {
        "project-type": {
            description: "Project type (web - w, electron - e)",
            pattern: /^[a-zA-Z]+$/,
            message: 'Name must be only letters',
            required: true,
            default: "web"
        }
    }
};


module.exports = {
    component: componentSchema,
    named: namedSchema,
    project: projectSchema
};