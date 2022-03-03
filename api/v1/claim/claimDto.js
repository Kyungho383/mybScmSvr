class claimDto{
    constructor(
        menuId
        , menuNm
        , menuDept
        , parrentId
        , menuPath
        , menuIcon
        , useYn
        , fstRegId
        , fstRegDt
        , lstChgId
        , lstChgDt
    ){
        this.menuId      =   menuId     ;
        this.menuNm      =   menuNm     ;
        this.menuDept    =   menuDept   ;
        this.parrentId   =   parrentId  ;
        this.menuPath    =   menuPath   ;
        this.menuIcon    =   menuIcon   ;
        this.useYn       =   useYn      ;
        this.fstRegId    =   fstRegId   ;
        this.fstRegDt    =   fstRegDt   ;
        this.lstChgId    =   lstChgId   ;
        this.lstChgDt    =   lstChgDt   ;
        
    }
    
}

module.exports = claimDto;