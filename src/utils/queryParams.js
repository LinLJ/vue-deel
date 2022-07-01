export function createQueryParams(listQuery) {
  Object.keys(listQuery.filters).forEach((key) => {
    const value = listQuery.filters[key];
    if (!value) {
      delete listQuery.filters[key];
    }
  });
  return {
    pageNum: listQuery.pageNum,
    pageSize: listQuery.pageSize,
    filters: listQuery.filters,
    orders: listQuery.orders
  };
}
