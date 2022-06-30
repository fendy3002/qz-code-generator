import lo = require('lodash');
const replaceFileName = (original: string, schema: any) => {
    let regExp = new RegExp('\\[(.*?)\\]', 'gm');

    let result = original;
    let match;
    do {
        match = regExp.exec(original);
        if (match) {
            if (match[0].substring(0, 2) != "[[") { // only replace single start bracket
                result = result.replace(match[0], lo.get(schema, match[1]));
            } else {
                result = result.replace(match[0], match[0].substring(1, match[0].length - 1));
            }
        }
    } while (match);
    // for (const key of Object.keys(replacement)) {
    //     result = result.replace(key, replacement[key]);
    // }
    result = result.replace(".template", "");
    return result;
};

export default {
    replace: replaceFileName
};