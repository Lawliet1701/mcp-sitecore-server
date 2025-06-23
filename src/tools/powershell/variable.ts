export class PowershellVariable
{
    constructor(private _value: string) {
        if (!_value || _value.length === 0)
        {
            throw new Error("Variable is not defined or empty.");
        }
    }

    getValue(): string
    {
        if (this._value.startsWith("$"))
        {
            return this._value;
        }

        return `$${this._value}`;
    }
}