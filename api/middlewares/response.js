function handleResponse(session) {
  const { mongo, res, response } = session;

  // mongo.close();
  res.send(response);
}

export default handleResponse;
