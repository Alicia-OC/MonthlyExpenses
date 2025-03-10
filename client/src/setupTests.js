import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

//stablishing API mocking before all tests
beforeAll(() => server.listen());

//reset handlers between tests
afterEach(() => server.resetHandlers());

//clean up after tests are finished
afterAll(() => server.close());
