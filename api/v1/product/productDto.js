class productDto{
    constructor(
        pageNo
        , startNo
        , pageTerm
        , productId
        , productBrdNm
        , productNm
        , productPrice
        , productDiscRate
        , productImgList
        , productThumbnailImgFile
        , imgId
        , imgFile
        , piFlag
        , piContents
        , sort
        , categoryId
        , fstRegId
        , fstRegDt
        , lstChgId
        , lstChgDt
        , cleanlabelId
     , cleanlabelNutrientNm
     ,         cleanlabelNutrientStandardVal
     ,          cleanlabelNutrientFoodNm
     ,          cleanlabelNutrientUnit
     ,          cleanlabelResultVal
     ,          minVal
     ,          maxVal

    ){
        this.pageNo            =  pageNo          ;
        this.startNo           =  startNo         ;
        this.pageTerm          =  pageTerm        ;

        this.productId         =  productId       ;
        this.productBrdNm      =  productBrdNm    ;
        this.productNm         =  productNm       ;
        this.productPrice      =  productPrice    ;
        this.productDiscRate   =  productDiscRate ;
        this.productImgList   =  productImgList ;
        this.productThumbnailImgFile   =  productThumbnailImgFile ;
        
        this.imgId             =  imgId           ;
        this.imgFile           =  imgFile           ;
        this.piFlag             =  piFlag           ;
        this.piContents             =  piContents           ;
        this.sort             =  sort           ;
        this.categoryId             =  categoryId           ;

        this.fstRegId          =  fstRegId        ;
        this.fstRegDt          =  fstRegDt        ;
        this.lstChgId          =  lstChgId        ;
        this.lstChgDt          =  lstChgDt        ;
        
     this.cleanlabelId		=	cleanlabelId   ;
     this.cleanlabelNutrientNm		=	cleanlabelNutrientNm   ;
     this.        cleanlabelNutrientStandardVal		=	        cleanlabelNutrientStandardVal   ;
     this.         cleanlabelNutrientFoodNm		=	         cleanlabelNutrientFoodNm   ;
     this.         cleanlabelNutrientUnit		=	         cleanlabelNutrientUnit   ;
     this.         cleanlabelResultVal		=	         cleanlabelResultVal   ;
     this.         minVal		=	         minVal   ;
     this.         maxVal		=	         maxVal   ;

    }
}
   

module.exports = productDto;