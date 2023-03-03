const environment = {
  GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_URL,
};

if (process.env.NODE_ENV === 'test') {
  environment.GRAPHQL_AUTHORIZATION = process.env.REACT_APP_GRAPHQL_AUTHORIZATION;
}

export { environment };
