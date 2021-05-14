import { fastify } from "../src/server";
type HttpMethod = "GET" | "PUT" | "DELETE" | "POST";

type EndpointTesterParams<T> = {
  url: string;
  method: HttpMethod;
  testName: string;
  payload?: any;
  expectedStatusCode?: number;
  expectedResponse?: T;
};

const createEndpointTester = <T>({
  url,
  method,
  testName,
  payload,
  expectedStatusCode = 200,
  expectedResponse,
}: EndpointTesterParams<T>) => {
  return function (
    dataStructureVerification?: (responsePayload: string) => void,
    config?: EndpointTesterParams<string>
  ) {
    test(testName, async (done) => {
      let response: any;
      if (payload) {
        response = await fastify.inject({
          method,
          url,
          payload,
        });
      } else {
        response = await fastify.inject({
          method,
          url,
        });
      }

      dataStructureVerification && dataStructureVerification(response.payload);

      const parsedExpectedResponse: string =
        typeof expectedResponse !== "string"
          ? JSON.stringify(expectedResponse)
          : expectedResponse;

      expect(response.statusCode).toBe(expectedStatusCode);
      expectedResponse && expect(response.payload).toBe(parsedExpectedResponse);
      done();
    });
  };
};

const verifyUserResponseFormat = (responsePayload: string) => {
  const usersResponse = JSON.parse(responsePayload) || responsePayload;
  expect(usersResponse).toBeTruthy();
  expect(Array.isArray(usersResponse)).toBeTruthy();
  if (Array.isArray(usersResponse) && usersResponse.length > 0) {
    usersResponse.map(verifyUserDataFormat);
  }
};

const verifyUserDataFormat = (user) => {
  const possibleProps = ["id", "email", "name"];
  const userProps =
    typeof user !== "string"
      ? Object.keys(user)
      : Object.keys(JSON.parse(user));
  console.log("user: ", user);
  console.log("user properties: ", userProps);
  expect(userProps).toEqual(possibleProps);
};

const getPostedUser = (responsePayload: string) => {
  console.log("response payload at getPostedUser", responsePayload);
  const parsedPayload = JSON.parse(responsePayload);
  return JSON.stringify(parsedPayload.posted);
};

describe("server test", () => {
  createEndpointTester({
    url: "/",
    method: "GET",
    expectedResponse: "👍",
    testName: "Responds with 👍",
  })();

  createEndpointTester({
    url: "/users",
    method: "GET",
    testName: "List all users",
  })(verifyUserResponseFormat);

  const randomNumber = Math.random().toFixed(3);
  let createdUserId: number;

  createEndpointTester({
    url: "/user",
    method: "POST",
    testName: "Creates a user",
    payload: { name: "Davi", email: `daviteste${randomNumber}@gmail.com` },
  })((responsePayload) => {
    const postedUser = getPostedUser(responsePayload);
    console.log("posted user: ", postedUser);
    verifyUserDataFormat(postedUser);
  });

  createEndpointTester({
    url: `/user?id=${createdUserId}`,
    method: "DELETE",
    testName: "Deletes a user",
  })();
});
