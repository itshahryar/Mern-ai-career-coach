 import { Inngest } from "inngest";

 export const inngest = new Inngest({
   id: "careerlift", // Unique app ID
   name: "Careerlift",
   credentials: {
     gemini: {
       apiKey: process.env.GEMINI_API_KEY,
     },
   },
 });
 