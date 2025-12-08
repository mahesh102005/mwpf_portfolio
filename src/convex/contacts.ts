import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contacts", {
      name: args.name,
      email: args.email,
      message: args.message,
      type: args.type,
    });
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    // In a real app, you would check for authentication here
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) throw new Error("Unauthenticated");
    
    return await ctx.db.query("contacts").order("desc").take(100);
  },
});