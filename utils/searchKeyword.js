class SearchKeyword{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const keyword=this.queryStr.keyword ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }

        } :{

        }

        console.log(keyword);

        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy={ ...this.queryStr};

        //removing fields from the query
        const removeField=['keyword','limit','page']
        removeField.forEach(el=>delete queryCopy[el]);

        //filter for price and rating
        let queryStr=JSON.stringify(queryCopy)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match=> `$${match}`)
     
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
}

module.exports=SearchKeyword