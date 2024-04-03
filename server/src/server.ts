import fastify from "fastify";
import {
  ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-event";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP Server running");
});
