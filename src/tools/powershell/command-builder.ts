import { PowershellVariable } from "./variable.js";

export class PowershellCommandBuilder
{
    buildCommandString(script: string, parameters: Record<string, any> = {}): string {
        let scriptWithParameters = script;
        if (parameters) {
            for (const parameter in parameters) {                
                if (parameters[parameter] === undefined || parameters[parameter] === null)
                {
                    continue;
                }

                if (parameters[parameter] === "") {
                    scriptWithParameters += ` -${parameter}`;
                }
                else if (Array.isArray(parameters[parameter])) {
                    scriptWithParameters += ` -${parameter} "${parameters[parameter].join('","')}"`;
                }      
                else if (parameters[parameter] instanceof PowershellVariable)
                {
                    scriptWithParameters += ` -${parameter} ${parameters[parameter].getValue()}`;
                }
                else if (this.isRecord(parameters[parameter])) {
                    // Check whether the record has any keys
                    if(Object.getOwnPropertyNames(parameters[parameter]).length > 0)
                    {
                        scriptWithParameters += ` -${parameter} ${this.buildPowershellHashtableString(parameters[parameter])}`;
                    }                    
                }          
                else {
                    scriptWithParameters += ` -${parameter} "${parameters[parameter]}"`;
                }
            }
        }

        return scriptWithParameters;
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
