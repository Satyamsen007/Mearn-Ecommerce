class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: 'i', // case-insensitive search
        },
      }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const copyQueryStr = { ...this.queryStr };
    const removeFields = ['keyword', 'page', 'limit'];

    // Remove unwanted fields
    removeFields.forEach((key) => delete copyQueryStr[key]);

    // Add MongoDB operators for filtering
    let queryStr = JSON.stringify(copyQueryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    const queryObj = JSON.parse(queryStr);

    // Ensure numeric fields are correctly parsed
    for (const key in queryObj) {
      if (typeof queryObj[key] === 'object') {
        for (const op in queryObj[key]) {
          queryObj[key][op] = Number(queryObj[key][op]);
        }
      }
    }

    this.query = this.query.find(queryObj);
    return this;
  }

  pagination(resultPerPage) {
    // Default to page 1 if not specified
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export { ApiFeatures };
