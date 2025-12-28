const { default: api } = await import("default_api");
const files = await api.readFilesToContextTool({
  file_paths: [
    "src/components/landing/PhotoSection.tsx",
    "src/components/landing/VideoSection.tsx",
    "src/components/landing/AboutSection.tsx"
  ],
  replace_files_in_context: false
});
