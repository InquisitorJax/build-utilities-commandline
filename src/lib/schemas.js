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

const viewSchema = {
    properties: {
        name: {
            pattern: /^[a-zA-Z]+$/,
            message: 'Name must be only letters',
            required: true
        },
        "view-type": {
            description: "Project type (empty or e, list or l, crud or c, master-detail or m)",
            pattern: /^[a-zA-Z]+$/,
            message: 'Name must be only letters',
            required: true,
            default: "empty"
        }
    }
};

const projectSchema = {
    properties: {
        "project-type": {
            description: "Project type (web or w, electron or e)",
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
    project: projectSchema,
    view: viewSchema
};