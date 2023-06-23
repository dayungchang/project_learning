import Prompt from "@models/prompt";
import { trailingSlash } from "@next.config";
import { connectToDB } from "@utils/database";

// GET (read)
export const GET = async (request, { params }) => {
   try {
      await connectToDB();

      const prompt = await Prompt.findById(params.id).populate("creator");
      if (prompt) {
         return new Response(JSON.stringify(prompt), { status: 200 });
      } else {
         return new Response("Prompt not found", { status: 404 });
      }
   } catch (error) {
      return new Response("Failed to fetch the post", { status: 500 });
   }
};
// PATCH (update)
export const PATCH = async (request, { params }) => {
   const { prompt, tag } = await request.json();
   try {
      await connectToDB();

      const existingPrompt = await Prompt.findById(params.id);

      if (prompt) {
         existingPrompt.prompt = prompt;
         existingPrompt.tag = tag;

         await existingPrompt.save();
         return new Response(JSON.stringify(existingPrompt), { status: 200 });
      } else {
         return new Response("Prompt not found", { status: 404 });
      }
   } catch (error) {
      return new Response("Failed to update the post", { status: 500 });
   }
};
// DELETE (delete)
export const DELETE = async (request, { params }) => {
   try {
      await connectToDB();
      await Prompt.findByIdAndDelete(params.id);

      return new Response("Prompt deleted successfully", { status: 200 });
   } catch (error) {
      return new Response("Failed to delete the post", { status: 500 });
   }
};
