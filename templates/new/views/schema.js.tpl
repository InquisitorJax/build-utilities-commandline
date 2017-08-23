export const template =
{
    "type": "view",
    "fields": [
        {
            "field": "id",
            "map": "id"
        },
        {
            "field": "code",
            "map": "code"
        },
        {
            "field": "description",
            "map": "description"
        }
    ],
    "body": {
        "elements": [
            {
                "element": "group",
                "title": "Details",
                "elements": [
                {
                    "element": "input",
                    "title": "Id",
                    "field": "id"
                },
                {
                    "element": "input",
                    "title": "Code",
                    "field": "code"
                },
                {
                    "element": "input",
                    "title": "Description",
                    "field": "description"
                }
            ]
            }
        ]
    }
};
