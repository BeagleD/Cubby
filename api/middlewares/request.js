import Session from './session';

function handleRequest(fn, args) {
  const session = new Session(fn, args);
  session.run();
}

export default handleRequest;
