import fs from 'fs';

export function log(classe: string, message: string): void {
    const path = process.cwd();
    //get actual date
    const dateTime = new Date();
    //get day-month-year
    const day = dateTime.getDate();
    const month = dateTime.getMonth();
    const year = dateTime.getFullYear();
    const date = `${day}-${month + 1}-${year}`;
    //get actual time
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds().toString().padStart(2, '0');

    //check if log folder exists
    if (!fs.existsSync(`${path}/logs`)) {
        fs.mkdirSync(`${path}/logs`);
    }
    if (fs.existsSync(`${path}/logs/socket_log_${date}.log`)) {
        fs.appendFileSync(`${path}/logs/socket_log_${date}.log`, `[${hour}:${minute}:${second}] - [${classe.trim()}]  - ${message.trim()}\n`);
    } else {
        fs.writeFileSync(`${path}/logs/socket_log_${date}.log`, `[${hour}:${minute}:${second}] - [${classe.trim()}]  - ${message.trim()}\n`);
    }
    console.dir(`[${hour}:${minute}:${second}] - [${classe.trim()}] -> ${message.trim()}`, { depth: null });
}