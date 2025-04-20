import fs from "node:fs"
import path from "node:path"

// Define the structure for items in the registry.json
type RegistryJsonItem = {
  name: string // e.g., "ui/button"
  type: "registry:component" // Assuming all are components for now
  title: string // e.g., "Button"
  description: string // e.g., "Displays a button or a link that looks like a button." - Leave empty for now
  dependencies: string[] // e.g., ["@radix-ui/react-slot"] - Leave empty for now
  registryDependencies: string[] // e.g., ["button"] - Leave empty for now
  files: {
    path: string // Relative path from project root, e.g., "components/ui/button.tsx"
    type: "registry:component"
  }[]
}

// Function to capitalize the first letter of a string
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// Function to extract external dependencies from file content
const extractDependencies = (content: string): string[] => {
  const importRegex = /import(?: | .* from )['"]([^'"]+)['"]/g
  const dependencies = new Set<string>()
  let match: RegExpExecArray | null

  // Use a standard loop to avoid assignment in condition
  while (true) {
    match = importRegex.exec(content)
    if (match === null) {
      break
    }
    // Ensure match[1] exists and is a string before proceeding
    const importPath = match[1]
    if (typeof importPath !== "string") {
      continue
    }

    // Filter out relative paths, aliases, node built-ins, and common packages
    if (
      !importPath.startsWith(".") &&
      !importPath.startsWith("@/") &&
      !importPath.startsWith("node:") &&
      ![
        "react",
        "react-dom",
        "clsx",
        "tailwind-merge",
        "next",
        "@headlessui/react",
        "embla-carousel-react",
      ].includes(importPath) // Add more common packages if needed
    ) {
      dependencies.add(importPath)
    }
  }
  return Array.from(dependencies).sort()
}

const generateComponentRegistry = () => {
  // Removed outputBaseDir and generatedFilePath
  const registryJsonPath = "registry.json" // Output path for the single registry file

  const sources = [
    { type: "ui", path: "components/ui" },
    // { type: "anatomies", path: "components/docs/anatomies" }, // Excluded anatomies
    // { type: "demo", path: "components/docs" }, // Excluded docs/demos
    // { type: "blocks", path: "app/blocks" },
  ]

  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
    if (!fs.existsSync(dirPath)) {
      console.warn(`Directory not found: ${dirPath}`)
      return []
    }
    const files = fs.readdirSync(dirPath)
    for (const file of files) {
      const fullPath = path.join(dirPath, file)
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, arrayOfFiles)
        // Only include .tsx files for components
      } else if (file.endsWith(".tsx")) {
        arrayOfFiles.push(fullPath)
      }
    }

    return arrayOfFiles
  }

  // Initialize the array for registry.json items
  const registryItems: RegistryJsonItem[] = []

  for (const { type, path: sourcePath } of sources) {
    const resolvedPath = path.resolve(sourcePath)

    if (!fs.existsSync(resolvedPath)) {
      console.warn(`Directory not found: ${resolvedPath}`)
      continue
    }

    const files = getAllFiles(resolvedPath)

    // Keep the filtering logic for demo components
    const filteredFiles =
      type === "demo" ? files.filter((file) => !file.includes("/anatomies/")) : files

    for (const filePath of filteredFiles) {
      // Extract component name (e.g., "button" from "button.tsx")
      const componentBaseName = path.basename(filePath, ".tsx")
      // Read file content to parse imports
      const fileContent = fs.readFileSync(filePath, "utf-8")

      const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, "/")
      const relativeKey = path.relative(sourcePath, filePath).replace(/\\/g, "/")
      // Construct the unique name key (e.g., "ui/button")
      const nameKey = `${relativeKey.replace(".tsx", "")}`

      // Extract dependencies
      const dependencies = extractDependencies(fileContent)

      // Construct the item for registry.json
      const registryItem: RegistryJsonItem = {
        name: nameKey,
        type: "registry:component", // Hardcoded type
        title: capitalize(componentBaseName.replace(/-/g, " ")), // Simple title generation
        description: "", // Keep description empty for now
        dependencies: dependencies, // Add extracted dependencies
        registryDependencies: [], // Keep registryDependencies empty for now
        files: [
          {
            path: relativePath,
            type: "registry:component", // Hardcoded type for the file
          },
        ],
      }

      // Add the item to the list
      registryItems.push(registryItem)

      // Removed individual JSON file writing logic
    }
  }

  // Removed registryEntries array and related logic

  // Construct the final registry.json object
  const registryJsonObject = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "intentui", // Assuming this name based on the example registry.json
    homepage: "https://intentui.com", // Assuming this homepage
    items: registryItems,
  }

  // Start progress indication
  console.info(`Generating ${registryJsonPath}...`)
  const loadingInterval = setInterval(() => {
    process.stdout.write(".")
  }, 500)

  // Write the final registry.json file
  fs.writeFileSync(registryJsonPath, JSON.stringify(registryJsonObject, null, 2))

  // Stop progress indication
  clearInterval(loadingInterval)
  process.stdout.write("\n") // Add a newline after dots

  console.info(`${registryJsonPath} generation complete.`)
}

generateComponentRegistry()
