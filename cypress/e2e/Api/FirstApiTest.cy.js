/**
 * Sends various HTTP requests using Cypress and verifies the response properties.
 *
 * @example
 * describe("HTTP Requests", () => {
 *   it("GET request", () => {
 *     // Send a GET request to https://jsonplaceholder.typicode.com/posts/1
 *     // Verify that the response status code is 200 and the duration is less than 100ms
 *     // Verify that the response body has the required properties
 *   });
 *
 *   it("POST request", () => {
 *     // Send a POST request to https://jsonplaceholder.typicode.com/posts with a JSON body
 *     // Verify that the response status code is 201
 *     // Verify that the response body has the required properties
 *   });
 *
 *   // Repeat the same pattern for other request types and test cases
 * });
 */
describe("HTTP Requests", () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

  const sendRequest = (method, url, body = null) => {
    return cy.request({
      method,
      url,
      body,
    });
  };

  it("GET request", async () => {
    const response = await sendRequest("GET", `${BASE_URL}/1`);
    expect(response.status).to.eq(200);
    expect(response.duration).to.be.lessThan(250);
    expect(response.body).to.have.property("userId");
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("title");
    expect(response.body).to.have.property("body");
  });

  it("POST request", async () => {
    const response = await sendRequest("POST", BASE_URL, {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property("userId");
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("title");
    expect(response.body).to.have.property("body");
  });

  it("PUT request", async () => {
    const response = await sendRequest("PUT", `${BASE_URL}/1`, {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("userId");
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("title");
    expect(response.body).to.have.property("body");
  });

  it("DELETE request", async () => {
    const response = await sendRequest("DELETE", `${BASE_URL}/1`);
    expect(response.status).to.eq(200);
  });

  it("PATCH request", async () => {
    const response = await sendRequest("PATCH", `${BASE_URL}/1`, {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("userId");
    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("title");
    expect(response.body).to.have.property("body");
  });

  it("HEAD request", async () => {
    const response = await sendRequest("HEAD", `${BASE_URL}/1`);
    expect(response.status).to.eq(200);
  });

  it("OPTIONS request", async () => {
    const response = await sendRequest("OPTIONS", `${BASE_URL}/1`);
    expect(response.status).to.eq(204);
  });

  it("GET request with query parameters", async () => {
    const response = await sendRequest("GET", `${BASE_URL}?userId=1`);
    expect(response.status).to.eq(200);
  });
});
