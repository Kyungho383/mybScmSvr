class authDto{
    constructor(
         accessToken
        , refreshToken
        , cnt
        , accId
        , accUserId
        , accEmail
        , accPwd
        , accAuthGrp
        , accMngNm
        , accMngTelNo
        , accMngPhoneNo
        , imgId
        , bizId
        , bizNm
        , bizTelNo
        , bizCeoNm
        , bizNo
        , bizNoImg
        , bizSvcTelNo
        , bizSiteUrl
        , bizCalMngNm
        , bizCalMngTelNo
        , bizCalMngPhoneNo
        , bizCalMngEmail
        , bizCsMngNm
        , bizCsMngTelNo
        , bizCsMngPhoneNo
        , bizCsMngEmail
        , bizSaleMngNm
        , bizSaleMngTelNo
        , bizSaleMngPhoneNo
        , bizSaleMngEmail

    ){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.cnt = cnt;
        this.accId		=	accId   ;
        this.accUserId		=	accUserId   ;
        this.accEmail		=	accEmail   ;
        this.accPwd		=	accPwd   ;
        this.accAuthGrp		=	accAuthGrp   ;
        this.accMngNm		=	accMngNm   ;
        this.accMngTelNo		=	accMngTelNo   ;
        this.accMngPhoneNo		=	accMngPhoneNo   ;
        this.imgId		=	imgId   ;
        this.bizId		=	bizId   ;
        this.bizNm		=	bizNm   ;
        this.bizTelNo		=	bizTelNo   ;
        this.bizCeoNm		=	bizCeoNm   ;
        this.bizNo		=	bizNo   ;
        this.bizNoImg		=	bizNoImg   ;
        this.bizSvcTelNo		=	bizSvcTelNo   ;
        this.bizSiteUrl		=	bizSiteUrl   ;
        this.bizCalMngNm		=	bizCalMngNm   ;
        this.bizCalMngTelNo		=	bizCalMngTelNo   ;
        this.bizCalMngPhoneNo		=	bizCalMngPhoneNo   ;
        this.bizCalMngEmail		=	bizCalMngEmail   ;
        this.bizCsMngNm		=	bizCsMngNm   ;
        this.bizCsMngTelNo		=	bizCsMngTelNo   ;
        this.bizCsMngPhoneNo		=	bizCsMngPhoneNo   ;
        this.bizCsMngEmail		=	bizCsMngEmail   ;
        this.bizSaleMngNm		=	bizSaleMngNm   ;
        this.bizSaleMngTelNo		=	bizSaleMngTelNo   ;
        this.bizSaleMngPhoneNo		=	bizSaleMngPhoneNo   ;
        this.bizSaleMngEmail		=	bizSaleMngEmail   ;
    }
    
}

module.exports = authDto;