
export const search = (query, queryStr) => {
    const keyword = queryStr.keyword
      ? {
          name: {
            $regex: queryStr.keyword,
            $options: "i",
          },
        }
      : {};
  
    return query.find({ ...keyword });
  };     
  
  
  export const filter = (query, queryStr) => {
    const queryCopy = { ...queryStr };    
    
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
      

    let queryStrModified = JSON.stringify(queryCopy);
    queryStrModified = queryStrModified.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  
    return query.find(JSON.parse(queryStrModified));
  };
  
  
  export const paginate = (query, queryStr, resultPerPage) => {
    const currentPage = Number(queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
  
    return query.limit(resultPerPage).skip(skip);
  };
  

  