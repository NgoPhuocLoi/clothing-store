export function APIfeature(query, queryString) {
  this.query = query; // Product.find()
  this.queryString = queryString; // req.query

  this.paginating = () => {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = limit * (page - 1);

    this.query = this.query.limit(limit).skip(skip);

    return this;
  };
  this.sorting = () => {
    const sort = this.queryString.sort || "createdAt";

    this.query = this.query.sort(sort);

    return this;
  };
  this.searching = () => {
    const search = this.queryString.search;
    console.log(search);
    if (search) {
      this.query = this.query.find({
        $text: { $search: search },
      });
    } else {
      this.query = this.query.find();
    }

    return this;
  };

  this.filtering = () => {
    const queryObj = { ...this.queryString };

    const excludedFields = ["sort", "page", "limit", "search"];

    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    console.log("string 1: ", queryStr);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)/g,
      (match) => "$" + match
    );
    console.log("string 2: ", queryStr);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  };
}
