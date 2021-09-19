export const _MatchQuery = (query: string, size?: number) => {
  return {
    from: 0,
    size: size,
    query: {
      match: {
        url: query,
      },
    },
  };
};

export const _PrefixQuery = (query, field?, size?) => {
  return {
    from: 0,
    size: parseInt(size),
    _source: {
      includes: field,
    },
    query: {
      prefix: {
        name: query,
      },
    },
  };
};

export const _WildcardQuery = (
  query: string,
  field?: string[],
  size?: number,
) => {
  return {
    size: size,
    from: 0,
    _source: {
      includes: field,
    },
    query: {
      wildcard: {
        title: query,
      },
    },
  };
};
export const _MultiMatchQuery = (
  query: string,
  field?: string[],
  size?: number,
) => {
  return {
    size: size,
    from: 0,
    query: {
      multi_match: {
        query: query,
        fields: field,
      },
    },
  };
};
