class commonDto{
    constructor(
        accId
	  , file
	  , imgId
	  , dirPath
	  , imgPath
	  , imgFileNm
	  , fstRegId
	  , fstRegDt
	  , lstChgId
	  , lstChgDt
    ){
        this.accId       =    accId      ;
        this.file         =    file        ;
        this.imgId        =    imgId       ;
        this.dirPath      =    dirPath     ;
        this.imgPath      =    imgPath     ;
        this.imgFileNm    =    imgFileNm   ;
        this.fstRegId     =    fstRegId    ;
        this.fstRegDt     =    fstRegDt    ;
        this.lstChgId     =    lstChgId    ;
        this.lstChgDt     =    lstChgDt    ;
    }
}

module.exports = commonDto;