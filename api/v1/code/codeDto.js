class codeDto {
    constructor (
        codeMainId
        , codeGrpId
        , codeId
        , codeNm
        , codeDesc
        , sort
        , fstRegId
        , fstRegDt
        , lstChgId
        , lstChgDt
    ){
        this.codeMainId		=	codeMainId   ;
        this.codeGrpId		=	codeGrpId   ;
        this.codeId		=	codeId   ;
        this.codeNm		=	codeNm   ;
        this.codeDesc		=	codeDesc   ;
        this.sort		=	sort   ;
        this.fstRegId		=	fstRegId   ;
        this.fstRegDt		=	fstRegDt   ;
        this.lstChgId		=	lstChgId   ;
        this.lstChgDt		=	lstChgDt   ;
    }
   
   }
   module.exports = codeDto;