/**
 * combine string template and object literal properties and return the result
 * @param template: string, template body
 * @param literal: object literal that defines replacement
 *
 * populateTemplate (
 *      "<div>__content__</div>",
 *      {
 *          "__content__": "hello world"
 *      }
 * );
 */
function populateTemplate(template, map) {
    let result = template;
    const keys = Object.keys(map);

    for (let key of keys) {
        const replacement = map[key];
        result = result.split(key).join(replacement);
    }

    return result;
}

module.exports = populateTemplate;