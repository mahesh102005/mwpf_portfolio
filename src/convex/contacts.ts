import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    service: v.optional(v.string()),
    state: v.optional(v.string()),
    message: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contacts", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      service: args.service,
      state: args.state,
      message: args.message,
      type: args.type,
    });
  },
});

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("contacts").order("desc").take(200);
  },
});