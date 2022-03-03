const express = require('express');
const app = express.Router();

const mysql = require('../../@config/mysql');
const awsS3 = require('../../@config/awsS3');
const dbAppPool = mysql.dbAppPool;
const dbScmPool = mysql.dbScmPool;
const db = mysql.db;

const productDto = require('./productDto');
const fileDto = require('../file/fileDto');
const fileService = require('../file/fileService');
const logger = require('../../@config/winston');

const productService = { 
    selectProductList : async function(reqDto) {
        const conn = await dbScmPool.getConnection(async conn => conn);
        try {
          await conn.beginTransaction();
          var rst = await db.sqlExcute('productMapper','selectProductList', reqDto, conn);
          var rstCnt = await db.sqlExcute('productMapper','selectProductListCnt', reqDto, conn);
          for (let i = 0; i < rst.length; i++) {
            const sDto = rst[i];
            var rst2 = await db.sqlExcute('productMapper','selectProductCategoryList', sDto, conn);
            rst[i].category = rst2;
            var rst3 = await db.sqlExcute('productMapper','selectProductNutrientList', sDto, conn);
            rst[i].productNutrientList = rst3;
          }

          rst.totalCount = rstCnt[0].cnt;
          // result = rst;
          await conn.commit(); // 커밋
          return rst;
        } catch (error) {
          await conn.rollback(); // ROLLBACK
          throw new Error(error.stack);
        } finally{
          conn.release();
        }
    },
    insertProductInfo : async function(reqDto) {
        const conn = await dbScmPool.getConnection(async conn => conn);
        try {
          await conn.beginTransaction();

          var rst = await db.sqlExcute('productMapper','insertProductInfo', reqDto, conn);
          
          reqDto.productId = rst.insertId
          await db.sqlExcute('productMapper','insertProductCategoryInfo', reqDto, conn);

          for (let i = 0; i < reqDto.productNutrientList.length; i++) {
            const sDto = reqDto.productNutrientList[i];
            
            sDto.productId = reqDto.productId;
            sDto.accId = reqDto.accId;
            await db.sqlExcute('productMapper','insertProductNutrientList', sDto, conn);
          }
          
          if((reqDto.productThumbnailImgFile) !== undefined){
            let sDto = new productDto() ;
            sDto = reqDto;
            let fileInfoDto = new fileDto() ;
            fileInfoDto.insFile    = reqDto.productThumbnailImgFile;
            fileInfoDto.insDirPath = 'scm/product';
            fileInfoDto.accId      = reqDto.accId;

            var fileUpLoadRst = await fileService.fileUpload(fileInfoDto);
            sDto.imgId = fileUpLoadRst.imgId;
            sDto.piFlag = 1;
            sDto.piContents = null;
            sDto.sort = null;
            
            await db.sqlExcute('productMapper','insertProductImgInfo', sDto, conn);
          }

          // if((reqDto.productImgList) !== undefined){
          //   for (let i = 0; i < reqDto.productImgList.length; i++) {
          //     const sProductImgDto = reqDto.productImgList[i];
          //     sProductImgDto.productId = rst.insertId;
          //     sProductImgDto.accId = reqDto.accId;
          //     // if(typeof(reqDto.productImgList) != 'undefined' ){
          //     //   reqDto.productImgList[i].imgFile = reqDto.productImrhgList[i].imgFile;
          //     // }
          //     var fileUpLoadRst = await fileService.fileUpload(reqDto.productImgList[i].imgFile,'scm/product',reqDto.accId);
          //     sProductImgDto.imgId = fileUpLoadRst.imgId;
          //   }
          // }

          await conn.commit(); // 커밋
          return rst;
        } catch (error) {
          await conn.rollback(); // ROLLBACK
          throw new Error(error.stack);
        } finally{
          conn.release();
        }
    },
    updateProductInfo : async function(reqDto) {
      const conn = await dbScmPool.getConnection(async conn => conn);
      try {
        await conn.beginTransaction();
        
        var rst = await db.sqlExcute('productMapper','updateProductInfo', reqDto, conn);
        await db.sqlExcute('productMapper','updateProductCategoryInfo', reqDto, conn);
        
        for (let i = 0; i < reqDto.productNutrientList.length; i++) {
          let sDto = reqDto.productNutrientList[i];
          sDto.productId = reqDto.productId;
          sDto.accId = reqDto.accId;
          await db.sqlExcute('productMapper','updateProductNutrientList', sDto, conn);
        }

        //썸네일
        if((reqDto.productThumbnailImgFile) !== undefined){
          let sDto = reqDto;
          sDto.piFlag = '1';

          var imgRst = await db.sqlExcute('productMapper','selectProductImgInfo', sDto, conn);
          var fileUpLoadRst ;
          if(imgRst[0].imgId != null && imgRst[0].imgFileKeyPath != null){
            let fileInfoDto = new fileDto() ;
            fileInfoDto.insFile    = reqDto.productThumbnailImgFile;
            fileInfoDto.insDirPath = 'scm/product';
            fileInfoDto.accId      = reqDto.accId;

            fileInfoDto.delImgId      = imgRst[0].imgId;
            fileInfoDto.delKeyPath    = imgRst[0].imgFileKeyPath;
            
            fileUpLoadRst = await fileService.fileChange(fileInfoDto);
          }else{
            let fileInfoDto = new fileDto() ;
            fileInfoDto.insFile    = reqDto.productThumbnailImgFile;
            fileInfoDto.insDirPath = 'scm/product';
            fileInfoDto.accId      = reqDto.accId;

            fileUpLoadRst = await fileService.fileUpload(fileInfoDto);
          }

          sDto.imgId = fileUpLoadRst.imgId;
          sDto.piFlag = 1;
          sDto.piContents = null;
          sDto.sort = null;
          sDto.useYn = 'Y';
          sDto.piId = imgRst[0].piId;

          await db.sqlExcute('productMapper','updateProductImgInfo', sDto, conn);
        }


        // //request file 유무 check
        // if((reqDto.productImgList) !== undefined){
        //   for (let i = 0; i < reqDto.productImgList.length; i++) {
        //     const sProductImgDto = reqDto.productImgList[i];
            
        //     var fileUpLoadResult = await awsS3.s3FileUpload(reqDto.imgFile,'scm/product');
        //     console.log(fileUpLoadResult)

        //     let fileInfoDto = new fileDto() ;
        //     fileInfoDto.imgPath = fileUpLoadResult.imgPath;
        //     fileInfoDto.imgFileNm = reqDto.imgFile.name;
        //     fileInfoDto.accId = reqDto.accId;
        //     var fileInsRst = await db.sqlExcute('fileMapper','insertFileInfo', fileInfoDto, conn);
        //     console.log(fileInsRst)
        //     reqDto.imgId = fileInsRst.insertId;
        //   }
        // }


        await conn.commit(); // 커밋
        return rst;
      } catch (error) {
        await conn.rollback(); // ROLLBACK
        throw new Error(error);
      } finally{
        conn.release();
      }
    },
    deleteProductInfo : async function(reqDto) {
        const conn = await dbScmPool.getConnection(async conn => conn);
        try {
          await conn.beginTransaction();
          if(Array.isArray(reqDto.productId)){
            for (let i = 0; i < reqDto.productId.length; i++) {
              let sDto = new productDto() ;
              sDto.productId = reqDto.productId[i];

              sDto.piFlag = '1';
              var imgRst = await db.sqlExcute('productMapper','selectProductImgInfo', sDto, conn);
              if(imgRst.length > 0){
                if(imgRst[0].imgId != null){
                  let fileInfoDto = new fileDto() ;
      
                  fileInfoDto.delImgId      = imgRst[0].imgId;
                  fileInfoDto.delKeyPath    = imgRst[0].imgFileKeyPath;
      
                  await fileService.fileDelete(fileInfoDto);
                }
              }

              var rst = await db.sqlExcute('productMapper','deleteProductInfo', sDto, conn);
              
            }
          }else{
            var imgRst = await db.sqlExcute('productMapper','selectProductImgInfo', sDto, conn);
            if(imgRst[0].imgId != null){
              let fileInfoDto = new fileDto() ;
  
              fileInfoDto.delImgId      = imgRst[0].imgId;
              fileInfoDto.delKeyPath    = imgRst[0].imgFileKeyPath;
  
              await fileService.fileDelete(fileInfoDto);
            }

            var rst = await db.sqlExcute('productMapper','deleteProductInfo', reqDto, conn);
          }
          
          await conn.commit(); // 커밋
          return rst;
        } catch (error) {
          await conn.rollback(); // ROLLBACK
          throw new Error(error);
        } finally{
          conn.release();
        }
    },
    selectCleanLabelList : async function(reqDto) {
      const conn = await dbScmPool.getConnection(async conn => conn);
      try {
        await conn.beginTransaction();
        var rst = await db.sqlExcute('productMapper','selectCleanLabelList', reqDto, conn);
        await conn.commit(); // 커밋
        return rst;
      } catch (error) {
        await conn.rollback(); // ROLLBACK
        throw new Error(error);
      } finally{
        conn.release();
      }
    },
    selectProductDtlInfo : async function(reqDto) {
      const conn = await dbScmPool.getConnection(async conn => conn);
      try {
        await conn.beginTransaction();
        var result = new Object();
        var rst = await db.sqlExcute('productMapper','selectProductDtlInfo', reqDto, conn);
        var rst2 = await db.sqlExcute('productMapper','selectProductCategoryList', reqDto, conn);
        var rst3 = await db.sqlExcute('productMapper','selectProductNutrientList', reqDto, conn);
        result = rst[0];
        result.category = rst2;
        result.productNutrientList = rst3;

        var sDto = reqDto;
        sDto.piFlag = '1';
        var productThumbnailImgFileInfo = await db.sqlExcute('productMapper','selectProductImgList', sDto, conn);

        result.productThumbnailImgFile = productThumbnailImgFileInfo;
        result.productContentsImgFile = new Array();
        
        // rst[0].productImgList = rstProductImgList;
        await conn.commit(); // 커밋
        return result;
      } catch (error) {
        await conn.rollback(); // ROLLBACK
        throw new Error(error);
      } finally{
        conn.release();
      }
    },
  selectCategoryList : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('productMapper','selectCategoryList', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
  deleteCleanLabelList : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();

      if(Array.isArray(reqDto.cleanlabelId)){
        for (let i = 0; i < reqDto.cleanlabelId.length; i++) {
          let sDto = new productDto() ;
          sDto.cleanlabelId = reqDto.cleanlabelId[i];
          var rst1 = await db.sqlExcute('productMapper','selectCleanLabelInfo', sDto, conn);
          if(rst1[0].imgId != null){
            let fileInfoDto = new fileDto() ;

            fileInfoDto.delImgId      = rst1[0].imgId;
            fileInfoDto.delKeyPath    = rst1[0].imgFileKeyPath;

            await fileService.fileDelete(fileInfoDto);
          }
          var rst = await db.sqlExcute('productMapper','deleteCleanLabelList', sDto, conn);
        }
      }else{
        var rst1 = await db.sqlExcute('productMapper','selectCleanLabelInfo', sDto, conn);
        if(rst1[0].imgId != null){
          let fileInfoDto = new fileDto() ;

          fileInfoDto.delImgId      = rst1[0].imgId;
          fileInfoDto.delKeyPath    = rst1[0].imgFileKeyPath;

          await fileService.fileDelete(fileInfoDto);
        }
        var rst = await db.sqlExcute('productMapper','deleteCleanLabelList', reqDto, conn);
      }

      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error.stack);
    } finally{
      conn.release();
    }
  },

  insertCleanLabelList : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();

      if((reqDto.imgFile) !== undefined){
        let sDto = new productDto() ;
        sDto = reqDto;
        let fileInfoDto = new fileDto() ;
        fileInfoDto.insFile    = reqDto.imgFile;
        fileInfoDto.insDirPath = 'scm/cleanlabel';
        fileInfoDto.accId      = reqDto.accId;

        var fileUpLoadRst = await fileService.fileUpload(fileInfoDto);

        reqDto.imgId = fileUpLoadRst.imgId;
      }else{
        reqDto.imgId = null;
      }

      var rst = await db.sqlExcute('productMapper','insertCleanLabelList', reqDto, conn);

      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error.stack);
    } finally{
      conn.release();
    }
  },
  updateCleanLabelList : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();

      if((reqDto.imgFile) !== undefined){
        let sDto = new productDto() ;
        sDto = reqDto;

        var rst = await db.sqlExcute('productMapper','selectCleanLabelInfo', reqDto, conn);
        var fileUpLoadRst ;
        if(rst[0].imgId != null && rst[0].imgFileKeyPath != null){
          let fileInfoDto = new fileDto() ;
          fileInfoDto.insFile    = reqDto.imgFile;
          fileInfoDto.insDirPath = 'scm/cleanlabel';
          fileInfoDto.accId      = reqDto.accId;

          fileInfoDto.delImgId      = rst[0].imgId;
          fileInfoDto.delKeyPath    = rst[0].imgFileKeyPath;
          
          fileUpLoadRst = await fileService.fileChange(fileInfoDto);
        }else{
          let fileInfoDto = new fileDto() ;
          fileInfoDto.insFile    = reqDto.imgFile;
          fileInfoDto.insDirPath = 'scm/cleanlabel';
          fileInfoDto.accId      = reqDto.accId;

          fileUpLoadRst = await fileService.fileUpload(fileInfoDto);
        }
        
        reqDto.imgId = fileUpLoadRst.imgId;
      }else{
        reqDto.imgId = null;
      }
      var rst = await db.sqlExcute('productMapper','updateCleanLabelList', reqDto, conn);

      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error.stack);
    } finally{
      conn.release();
    }
  },
  selectCleanLabelInfo : async function(reqDto) {
    const conn = await dbScmPool.getConnection(async conn => conn);
    try {
      await conn.beginTransaction();
      var rst = await db.sqlExcute('productMapper','selectCleanLabelInfo', reqDto, conn);
      await conn.commit(); // 커밋
      return rst;
    } catch (error) {
      await conn.rollback(); // ROLLBACK
      throw new Error(error);
    } finally{
      conn.release();
    }
  },
}

module.exports = productService;