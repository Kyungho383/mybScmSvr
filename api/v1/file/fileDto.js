class fileDto{
    constructor(
        accId
	  , file
	  , imgId
	  , dirPath
	  , imgPath
	  , imgFileNm
      , imgFileKeyPath
      
      , insFile
      , insDirPath
      , insImgId

      , delFile
      , delDirPath
      , delImgId
      , delKeyPath

	  , fstRegId
	  , fstRegDt
	  , lstChgId
	  , lstChgDt
    ){
        this.accId             =    accId      ;
        this.file              =    file        ;
        this.imgId             =    imgId       ;
        this.dirPath           =    dirPath     ;
        this.imgPath           =    imgPath     ;
        this.imgFileNm         =    imgFileNm   ;
        this.imgFileKeyPath    =    imgFileKeyPath   ;

        this.insFile        =   insFile     ;
        this.insDirPath     =   insDirPath  ;
        this.insImgId       =   insImgId    ;
 
 
        this.delFile        =   delFile     ;
        this.delDirPath     =   delDirPath  ;
        this.delImgId       =   delImgId    ;
        this.delKeyPath     =   delKeyPath    ;
        

        this.fstRegId     =    fstRegId    ;
        this.fstRegDt     =    fstRegDt    ;
        this.lstChgId     =    lstChgId    ;
        this.lstChgDt     =    lstChgDt    ;
    }
}

module.exports = fileDto;