import { cleanup } from "@testing-library/react";
import { server } from "./mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => {
    server.resetHandlers();
    cleanup();
});
