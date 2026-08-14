export default function (eleventyConfig) {
  // The admin folder is a prebuilt app, not a template source. Copy it
  // verbatim and keep Eleventy's template engines away from it.
  eleventyConfig.addPassthroughCopy("admin/");
  eleventyConfig.addPassthroughCopy("assets/");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.ignores.add("admin/");

  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("posts/*.md").reverse()
  );

  eleventyConfig.addFilter("readableDate", (value) =>
    new Date(value).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "../dist",
    },
    templateFormats: ["html", "njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
