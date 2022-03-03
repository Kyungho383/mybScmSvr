class appMngDto{
    constructor(
        pageNo
        , startNo
        , pageTerm
          
        , fstRegId
        , fstRegDt
        , lstChgId
        , lstChgDt
    ){
        this.pageNo            =  pageNo          ;
        this.startNo           =  startNo         ;
        this.pageTerm          =  pageTerm        ;

        this.fstRegId          =  fstRegId        ;
        this.fstRegDt          =  fstRegDt        ;
        this.lstChgId          =  lstChgId        ;
        this.lstChgDt          =  lstChgDt        ;
    }
}
   

module.exports = appMngDto;