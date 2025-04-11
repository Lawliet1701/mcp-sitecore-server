async function main() {
  // Set environment variables from arguments here

  // Import and run the bundled server after env var is set
  await import("../dist/bundle.js");
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
