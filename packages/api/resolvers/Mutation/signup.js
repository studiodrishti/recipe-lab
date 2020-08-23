const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { transporter } = require("../../utils/createSMTPTransport");
const normalizeEmail = require("validator/lib/normalizeEmail");
const getSlug = require("speakingurl");
const createModification = require("../../utils/createModification");

const getUnusedSlug = async (originalSlug, ctx, i = 1) => {
  const slug = i > 1 ? `${originalSlug}-${i}` : originalSlug;
  const slugTaken = Boolean(await ctx.prisma.user.count({ where: { slug } }));
  if (!slugTaken) {
    return slug;
  }

  return getUnusedSlug(originalSlug, ctx, i + 1);
};

module.exports = async (
  parent,
  { name, email, password, modifications },
  ctx
) => {
  const recipeModsCreated = [];
  const hashedPassword = await hash(password, 10);

  const userExists = Boolean(await ctx.prisma.user.count({ where: { email } }));

  if (userExists)
    throw new Error("A user with that email address already exists.");

  const slug = await getUnusedSlug(getSlug(name), ctx);

  const user = await ctx.prisma.user.create({
    data: {
      name,
      slug,
      email: normalizeEmail(email),
      password: hashedPassword,
    },
  });

  // send some mail
  transporter.sendMail(
    {
      from: "donotreply@recipelab.io",
      to: user.email,
      subject: "Please confirm your account with Recipe Lab",
      text: "I hope this message gets sent!",
      ses: {
        // optional extra arguments for SendRawEmail
        Tags: [
          {
            Name: "tag name",
            Value: "tag value",
          },
        ],
      },
    },
    (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
    },
    console.log("Got into mail sending")
  );

  if (modifications) {
    await Promise.all(
      modifications.map(async ({ recipeId, ...modification }) => {
        await createModification(ctx, recipeId, user.id, modification);
        recipeModsCreated.push(recipeId);
      })
    );
  }

  const token = sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
    recipeModsCreated,
  };
};
