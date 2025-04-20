import fs from "node:fs"
import path from "node:path"

// Define the structure for items in the registry.json
type RegistryJsonItem = {
  name: string
  type: "registry:component"
  title: string
  description: string
  dependencies: string[]
  registryDependencies: string[]
  files: {
    path: string
    type: "registry:component"
  }[]
}

// Helper type for intermediate data
type IntermediateRegistryItem = Partial<RegistryJsonItem> & {
  filePath: string
  internalImportPaths?: string[] // Store resolved absolute paths of internal imports
}

// --- Helper Functions --- //

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// Function to extract external dependencies (modified to exclude internal/aliased)
const extractExternalDependencies = (content: string): string[] => {
  const importRegex = /import(?: | .* from )['"]([^'"]+)['"]/g
  const dependencies = new Set<string>()
  let match: RegExpExecArray | null

  while (true) {
    match = importRegex.exec(content)
    if (match === null) {
      break
    }
    const importPath = match[1]
    if (typeof importPath !== "string") {
      continue
    }

    // Filter OUT relative, aliased, node built-ins, and common packages
    if (
      !importPath.startsWith(".") &&
      !importPath.startsWith("@/") && // Exclude internal aliases
      !importPath.startsWith("node:") &&
      ![
        "react",
        "react-dom",
        "clsx",
        "tailwind-merge",
        "next",
        "@headlessui/react",
        "embla-carousel-react",
      ].includes(importPath)
    ) {
      dependencies.add(importPath)
    }
  }
  return Array.from(dependencies).sort()
}

// Function to extract internal dependencies (aliased imports)
const extractInternalDependencyPaths = (
  content: string,
  currentFilePath: string,
  projectRoot: string,
): string[] => {
  const importRegex = /import .* from ['"](@\/[^'"]+)['"]/g
  const internalImportsRaw = new Set<string>()
  let match: RegExpExecArray | null

  while (true) {
    match = importRegex.exec(content)
    if (match === null) {
      break
    }
    const rawImport = match[1] // e.g., @/components/ui/button
    if (typeof rawImport === "string") {
      internalImportsRaw.add(rawImport)
    }
  }

  const resolvedPaths = new Set<string>()
  for (const rawImport of internalImportsRaw) {
    // Assuming @/ maps to project root
    const relativeToRoot = rawImport.replace(/^@\//, "")
    const potentialPaths = [
      path.resolve(projectRoot, `${relativeToRoot}.ts`),
      path.resolve(projectRoot, `${relativeToRoot}.tsx`),
      path.resolve(projectRoot, `${relativeToRoot}/index.ts`),
      path.resolve(projectRoot, `${relativeToRoot}/index.tsx`),
    ]

    let foundPath: string | null = null
    for (const p of potentialPaths) {
      if (fs.existsSync(p)) {
        // Ensure we don't add a dependency on the file itself
        if (path.resolve(p) !== path.resolve(currentFilePath)) {
          foundPath = path.resolve(p) // Resolve to absolute path
          break
        }
      }
    }

    if (foundPath) {
      resolvedPaths.add(foundPath)
    } else {
      // Optionally warn if an internal import couldn't be resolved
      // console.warn(`Could not resolve internal import '${rawImport}' from ${currentFilePath}`);
    }
  }

  return Array.from(resolvedPaths)
}

// --- Main Generation Logic --- //

const generateComponentRegistry = () => {
  const registryJsonPath = "registry.json"
  const projectRoot = process.cwd()

  const sources = [
    { type: "ui", path: "components/ui" },
    // Only include ui components for now
  ]

  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
    if (!fs.existsSync(dirPath)) {
      // console.warn(`Directory not found: ${dirPath}`)
      return []
    }
    const files = fs.readdirSync(dirPath)
    for (const file of files) {
      const fullPath = path.join(dirPath, file)
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, arrayOfFiles)
      } else if (file.endsWith(".tsx")) {
        arrayOfFiles.push(path.resolve(fullPath)) // Store absolute paths
      }
    }
    return arrayOfFiles
  }

  // --- Pass 1: Gather component info and raw imports --- //
  console.info("Scanning components (Pass 1)...")
  const intermediateData: Map<string, IntermediateRegistryItem> = new Map()
  const filePathToKeyMap: Map<string, string> = new Map()

  for (const { type, path: sourcePath } of sources) {
    const absoluteSourcePath = path.resolve(sourcePath)
    const componentFiles = getAllFiles(absoluteSourcePath)

    for (const absoluteFilePath of componentFiles) {
      const componentBaseName = path.basename(absoluteFilePath, ".tsx")
      const fileContent = fs.readFileSync(absoluteFilePath, "utf-8")

      const relativePathFromRoot = path.relative(projectRoot, absoluteFilePath).replace(/\\/g, "/") // Use correct regex for backslashes
      const relativeKey = path.relative(absoluteSourcePath, absoluteFilePath).replace(/\\/g, "/") // Use correct regex for backslashes

      // Generate key: relative path within source dir, remove .tsx, remove /index
      const nameKey = relativeKey
        .replace(/\.tsx$/, "") // Correct regex
        .replace(/\/index$/, "") // Correct regex
        // Handle case where index removal leaves empty string (e.g., src/index.tsx)
        .replace(/^$/, componentBaseName)

      if (!nameKey) {
        console.warn(`Could not generate key for ${absoluteFilePath}`)
        continue
      }

      // Store filePath -> key mapping
      filePathToKeyMap.set(absoluteFilePath, nameKey)

      // Extract dependencies
      const externalDeps = extractExternalDependencies(fileContent)
      const internalDepPaths = extractInternalDependencyPaths(
        fileContent,
        absoluteFilePath,
        projectRoot,
      )

      const item: IntermediateRegistryItem = {
        filePath: absoluteFilePath,
        name: nameKey,
        type: "registry:component",
        title: capitalize(componentBaseName.replace(/-/g, " ")),
        description: "",
        dependencies: externalDeps,
        files: [{ path: relativePathFromRoot, type: "registry:component" }],
        internalImportPaths: internalDepPaths,
        registryDependencies: [], // Initialize registryDependencies
      }

      intermediateData.set(nameKey, item)
    }
  }

  // --- Pass 2: Resolve registry dependencies --- //
  console.info("Resolving registry dependencies (Pass 2)...")
  for (const item of intermediateData.values()) {
    const resolvedRegistryDeps = new Set<string>()
    if (item.internalImportPaths) {
      for (const importPath of item.internalImportPaths) {
        const dependencyKey = filePathToKeyMap.get(importPath)
        // Ensure a key was found and it's not the component itself
        if (dependencyKey && dependencyKey !== item.name) {
          resolvedRegistryDeps.add(dependencyKey)
        }
      }
    }
    // Ensure registryDependencies exists before assignment
    // This check might be overly cautious if initialized correctly, but safe
    if (item.registryDependencies) {
      item.registryDependencies = Array.from(resolvedRegistryDeps).sort()
    }
  }

  // --- Final Construction --- //
  console.info("Constructing final registry...")
  const finalRegistryItems: RegistryJsonItem[] = Array.from(intermediateData.values()).map(
    (item) => {
      // Remove temporary properties
      const { filePath, internalImportPaths, ...rest } = item
      // Ensure the rest object conforms to RegistryJsonItem
      return {
        name: rest.name || "", // Provide default empty string
        type: "registry:component", // Keep consistent type
        title: rest.title || "", // Provide default
        description: rest.description || "", // Provide default
        dependencies: rest.dependencies || [], // Default to empty array
        registryDependencies: rest.registryDependencies || [], // Default to empty array
        files: rest.files || [], // Default to empty array
      } as RegistryJsonItem // Assert type after ensuring all fields are present
    },
  )

  // Sort final items by name
  finalRegistryItems.sort((a, b) => a.name.localeCompare(b.name))

  const registryJsonObject = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "intentui",
    homepage: "https://intentui.com",
    items: finalRegistryItems,
  }

  console.info(`Generating ${registryJsonPath}...`)
  fs.writeFileSync(registryJsonPath, JSON.stringify(registryJsonObject, null, 2))
  console.info(`${registryJsonPath} generation complete.`)
}

generateComponentRegistry()
