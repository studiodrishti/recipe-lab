module.exports = {
  author: ({ id }, args, context) => {
    return context.prisma.recipe({ id }).author();
  }
};