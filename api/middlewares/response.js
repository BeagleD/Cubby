function handleResponse(session) {
  const { res, response } = session;
  session.generateLog();
  res.send(response);
}

export default handleResponse;
