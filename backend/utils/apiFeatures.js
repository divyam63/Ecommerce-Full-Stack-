export class ApiFeatures{
    constructor(query,queryStr){  //argument for seraching
        this.query=query;
        this.queryStr=queryStr;

    }

    search(){
        const keyword=this.queryStr.keyword ?{
            name:{
                $regex:this.queryStr.keyword,
                $options: "i",
            },
        }:
        {

        };
        console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }

    filter(){
        //if change in query copy to actual bhi change ho jayega..
        //const queryCopy = this.queryStr   //refrence of queryStr
        
        const queryCopy={...this.queryStr}  // spread oprator

        //removin some field
       // console.log(queryCopy);
        
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(
            key=>delete queryCopy[key]
        );

        //filter for price and rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        queryCopy = JSON.parse(queryStr);  //convert to obj

        this.query=this.query.find(queryCopy);

        
        return this;

    }

    pagination(resultPerPage){
        this.currentPage=Number(this.queryStr.page )|| 1
        const skip=resultPerPage * (currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

    
}

