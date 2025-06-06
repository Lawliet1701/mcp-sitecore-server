export enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL"
}

export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
}

export function filterByLogLevel(logs: any, level: LogLevel): LogEntry[] {
    const logsArray = (logs.Obj || []).map((log: any) => {
        return log.undefined;
    });

    const filteredLogs = logsArray.reduce((acc: LogEntry[], log: string) => {
        // Skip empty lines
        if (log === undefined || log.trim() === "") {
            return acc;
        }
        const match1 = log.match(/^(ManagedPoolThread #\d+|[0-9]+) (\d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2}) (\w+) (.*)$/);
        const match2 = log.match(/^(\d+|[0-9]+) (\d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2}) (\w+) (.*)$/);
        if (!match1 && !match2) {
            // It is the line that continues the previous log entry
            if (acc.length > 0) {
                acc[acc.length - 1].message += ` \r\n${log.trim()}`;
            }
        } else {
            if (match1) {
                const [_, __, timestamp, level, message] = match1;
                acc.push({ timestamp, level: level as LogLevel, message });
            } else if (match2) {
                const [_, __, timestamp, level, message] = match2;
                acc.push({ timestamp, level: level as LogLevel, message });
            }
        }

        return acc;
    }, []);

    return filteredLogs.filter((log: LogEntry) => {
        switch (level) {
            case LogLevel.DEBUG:
                return log.level === LogLevel.DEBUG
                || log.level === LogLevel.INFO
                || log.level === LogLevel.WARN
                || log.level === LogLevel.ERROR
                || log.level === LogLevel.FATAL;
            case LogLevel.INFO:
                return log.level === LogLevel.INFO
                || log.level === LogLevel.WARN
                || log.level === LogLevel.ERROR
                || log.level === LogLevel.FATAL;
            case LogLevel.WARN:
                return log.level === LogLevel.WARN
                || log.level === LogLevel.ERROR
                || log.level === LogLevel.FATAL;
            case LogLevel.ERROR:
                return log.level === LogLevel.ERROR
                || log.level === LogLevel.FATAL;
            case LogLevel.FATAL:
                return log.level === LogLevel.FATAL;
        }
    });
}