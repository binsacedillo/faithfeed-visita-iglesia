import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "asc" },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        type: z.string(),
        title: z.string(),
        content: z.string(),
        author: z.string().optional(),
        scriptureRef: z.string().optional(),
        imageUrl: z.string().optional(),
        stationNumber: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          type: input.type,
          title: input.title,
          content: input.content,
          author: input.author,
          scriptureRef: input.scriptureRef,
          imageUrl: input.imageUrl,
          stationNumber: input.stationNumber,
        },
      });
    }),
});
