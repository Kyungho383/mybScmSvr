const mysql = require('../../@config/mysql');
const awsS3 = require('../../@config/awsS3');
const dbAppPool = mysql.dbAppPool;
const dbScmPool = mysql.dbScmPool;
const db = mysql.db;
const logger = require('../../@config/winston');
const fileDto = require('./fileDto');

const fileService = {
  fileUpload : async function(fileInfoDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
        await conn.beginTransaction();
        var result = new Object();
        var fileUpLoadRst = await awsS3.s3FileUpload(fileInfoDto.insFile, fileInfoDto.insDirPath);
        
        fileInfoDto.imgPath = fileUpLoadRst.imgPath;
        fileInfoDto.imgFileNm = fileUpLoadRst.imgFileNm;

        var fileInsRst = await db.sqlExcute('fileMapper','insertFileInfo', fileInfoDto, conn);
        result.imgId = fileInsRst.insertId;
        await conn.commit(); // 커밋
        return result;
    } catch (error) {
        await conn.rollback(); // ROLLBACK
        throw new Error(error.stack);
    } finally{
        conn.release();
    }   
  },
  fileChange : async function(fileInfoDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
        await conn.beginTransaction();
        var result = new Object();

        //1.s3 삭제
        await awsS3.s3FileDelete(fileInfoDto.delKeyPath);
        
        //2.db 삭제
        var sDto = new Object();
        sDto.imgId = fileInfoDto.delImgId;
        var fileDelRst2 = await db.sqlExcute('fileMapper','deleteFileInfo', sDto, conn);

        //3.s3 업로드
        var fileUpLoadRst = await awsS3.s3FileUpload(fileInfoDto.insFile, fileInfoDto.insDirPath);
        //4.db 생성
        var sDto2 = new Object();
        sDto2.imgPath = fileUpLoadRst.imgPath;
        sDto2.imgFileNm = fileUpLoadRst.imgFileNm;
        sDto2.accId = fileInfoDto.accId;

        var fileInsRst = await db.sqlExcute('fileMapper','insertFileInfo', sDto2, conn);
        
        result.imgId = fileInsRst.insertId;
        await conn.commit(); // 커밋
        return result;
    } catch (error) {
        await conn.rollback(); // ROLLBACK
        throw new Error(error.stack);
    } finally{
        conn.release();
    }   
  },
  fileDelete : async function(fileInfoDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
        await conn.beginTransaction();

        //1.s3 삭제
        await awsS3.s3FileDelete(fileInfoDto.delKeyPath);
        
        //2.db 삭제
        var sDto = new Object();
        sDto.imgId = fileInfoDto.delImgId;
        var fileDelRst2 = await db.sqlExcute('fileMapper','deleteFileInfo', sDto, conn);
        
        await conn.commit(); // 커밋
    } catch (error) {
        await conn.rollback(); // ROLLBACK
        throw new Error(error.stack);
    } finally{
        conn.release();
    }   
  },
}

module.exports = fileService;