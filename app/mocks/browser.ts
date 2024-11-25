import { handlers } from "./handlers";
import { setupServer } from "msw/node";

export const worker = setupServer(...handlers);
