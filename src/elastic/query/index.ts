export const _MatchQuery = (query: string, field: string) => {
  return {
    from: 0,
    size: 20,
    query: {
      match: {
        url: query,
      },
    },
  };
};

export const _PrefixQuery = (query: string, field?: string) => {
  return {
    from: 0,
    size: 22,
    _source: {
      includes: [field],
    },
    query: {
      prefix: {
        name: query,
      },
    },
  };
};

export const _WildcardQuery = (query: string, field: string) => {
  return {
    size: 22,
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
export const _MultiMatchQuery = (query: string, field: string) => {
  return {
    size: 11,
    from: 0,
    query: {
      multi_match: {
        query: query,
        fields: [field, 'phrase'],
      },
    },
  };
};
