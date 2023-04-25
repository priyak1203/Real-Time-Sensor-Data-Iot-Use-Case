export const paginate = (data) => {
  const itemsPerPage = 15;
  const noOfPages = Math.ceil(data.length / itemsPerPage);

  const newData = Array.from({ length: noOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  });

  return { data: newData, pages: noOfPages };
};
