export function prepareArgsString(parameters: Record<string, any>): string {
    let scriptWithParameters = "script";
    if (parameters) {
        for (const parameter in parameters) {
            if (parameters[parameter] === "") {
                scriptWithParameters += ` -${parameter}`;
            }
            else if (Array.isArray(parameters[parameter])) {
                scriptWithParameters += ` -${parameter} "${parameters[parameter].join('","')}"`;
            } else {
                scriptWithParameters += ` -${parameter} "${parameters[parameter]}"`;
            }
        }
    }

    return scriptWithParameters;
}

