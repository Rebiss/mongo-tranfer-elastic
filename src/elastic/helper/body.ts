export const getOneeQuery = (query: string) => {
  return {
    size: 200,
    from: 0,
    query: {
      match: {
        url: query,
      },
    },
  };
};

export const getSplitQuery = (query: string, field: string) => {
  return {
    size: 200,
    from: 0,
    _source: {
      includes: [field],
    },
    query: {
      wildcard: {
        title: query,
      },
    },
  };
};
