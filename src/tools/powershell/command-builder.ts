export class PowershellCommandBuilder
{
    buildCommandString(script: string, parameters: Record<string, any> = {}): string {
        return `${script}${this.buildParametersString(parameters)}`;
    }

    buildParametersString(parameters: Record<string, any> = {}): string {
        let parametersString = '';
        if (parameters) {
            for (const parameter in parameters) {                
                if (parameters[parameter] === undefined || parameters[parameter] === null)
                {
                    continue;
                }

                if (parameters[parameter] === "") {
                    parametersString += ` -${parameter}`;
                }
                else if (Array.isArray(parameters[parameter])) {
                    parametersString += ` -${parameter} "${parameters[parameter].join('","')}"`;
                }
                else if (this.isRecord(parameters[parameter])) {
                    // Check whether the record has any keys
                    if(Object.getOwnPropertyNames(parameters[parameter]).length > 0)
                    {
                        parametersString += ` -${parameter} ${this.buildPowershellHashtableString(parameters[parameter])}`;
                    }                    
                }          
                else {
                    parametersString += ` -${parameter} "${parameters[parameter]}"`;
                }
            }
        }

        return parametersString;
    }

    private buildPowershellHashtableString(parameters: Record<string, any>): string {
        let result = "@{ ";
        let first = true;
        for (const parameter in parameters) {
            if (!first)
            {
                result += "; ";
            }
    
            result += `"${parameter}" = "${parameters[parameter]}"`;
            first = false;
        }
    
        result += " }";
    
        return result;
    }
    
    private isRecord(value: any): boolean {
        if (!value)
        {
            return false;
        }
    
        if (typeof value !== "object")
        {
            return false;
        }
    
        if (Array.isArray(value))
        {
            return false;
        }
    
        if (Object.getOwnPropertySymbols(value).length > 0)
        {
            return false;
        }
          
        return Object.getOwnPropertyNames(value).every(prop => typeof value[prop] === "string")
    }
}
