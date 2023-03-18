interface Environment {
  showDebug: boolean;
}

const environment: Environment = {
  showDebug: process.env.REACT_APP_SHOW_DEBUG === 'true',
};

export default environment;
