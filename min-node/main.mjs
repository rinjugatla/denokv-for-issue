import { openKv } from "@deno/kv";

const kv = await openKv();

const result = await kv.set(["from-client"], "hello!");
console.log(result);

kv.close();