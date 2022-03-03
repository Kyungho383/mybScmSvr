const AWS = require('aws-sdk');
const fs  = require('fs');
const logger = require('./winston');
const dotenv = require('dotenv').config({path:'./api/@config/.env'});

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region : process.env.AWS_REGION
});

const s3FileUpload = async function s3FileUpload(file,dirPath){
    try {
        var today = new Date();
        var dateTimeVal = today.getFullYear()
        +('0' + (today.getMonth() + 1)).slice(-2)
        +('0' + today.getDate()).slice(-2)
        +('0' + today.getHours()).slice(-2)
        +('0' + today.getMinutes()).slice(-2)
        +('0' + today.getSeconds()).slice(-2);
        var ext = file.name.substring( file.name.lastIndexOf('.')+1 , file.name.length).toLowerCase();
        var fileName = dateTimeVal + '_' + file.md5 + '.' + ext;
        var filePath = dirPath+'/' + fileName;
        var param = {
            'Bucket':process.env.AWS_BUCKET_NM,
            'Key': filePath,
            'ACL':'public-read-write',
            'Body':fs.createReadStream(file.tempFilePath),
            'ContentType':'image/png'
        }
        await s3.upload(param, function(err, data){
            if(err) {
                throw new Error(err);
            }else{
                logger.info('\n [s3 file upload] : \n' + JSON.stringify(data,null,2));
                //비동기 방식으로 파일 삭제
                // console.log(file.tempFilePath)
                fs.unlink(file.tempFilePath, err => {
                    if(err){
                        logger.error("파일 삭제 Error 발생");
                        throw new Error(err);
                    }
                });
            }
        });

        var result = new Object();
        result.imgPath = '/' + filePath;
        result.imgFileNm = fileName;
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const s3FileDelete = async function s3FileDelete(filePath){
    try {
        var param = {
            'Bucket':process.env.AWS_BUCKET_NM,
            'Key': filePath
        }

        await s3.deleteObject(param, function(err, data){
            if(err) {
                throw new Error(err);
            }else{
                logger.info('\n [s3 file delete] : \n' + JSON.stringify(param,null,2) +'\n'+ JSON.stringify(data,null,2));
            }
        });
        // var result = new Object();
        // result.imgPath = '/' + filePath;
        // result.imgFileNm = fileName;
        // return result;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports={
   s3FileUpload
   , s3FileDelete
}

