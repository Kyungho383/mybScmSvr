const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = '../logs';  // logs 디렉토리 하위에 로그 파일 저장
const { combine, timestamp, printf } = winston.format;
// Define log format
const logFormat = printf(info => {
    var tmpInfoMsg;
    if(typeof(info.message) == 'object'){
      tmpInfoMsg = JSON.stringify(info.message,null,2);
    }else{
      tmpInfoMsg = `${info.message}`;
    }
return `${info.timestamp} ${info.level}: ${tmpInfoMsg}`;
}
);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    transports: [
      new winstonDaily({
        level: 'info',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir,
        filename: `%DATE%_info.log`,
        maxFiles: 30,  // 30일치 로그 파일 저장
        zippedArchive: true, 
      }),
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir,
        filename: `%DATE%_error.log`,
        maxFiles: 30,  // 30일치 로그 파일 저장
        zippedArchive: true, 
      }),     
    ],
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    ),
  });
  // Production 환경이 아닌 경우(dev 등) 
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),  // 색깔 넣어서 출력
        logFormat,
      )
    }));
  }
module.exports = logger;