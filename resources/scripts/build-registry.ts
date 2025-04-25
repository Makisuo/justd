import fs from "node:fs"
import path from "node:path"

const registryUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

type RegistryType =
  | "registry:block"
  | "registry:component"
  | "registry:lib"
  | "registry:hook"
  | "registry:ui"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme"
type RegistryJsonItem = {
  name: string
  extends?: "none"
  type: RegistryType
  cssVars?: Record<string, any>
  title: string
  description: string
  dependencies: string[]
  registryDependencies: string[]
  files: {
    path: string
    type: RegistryType
  }[]
}

const registryBaseStyle = {
  extends: "none",
  name: "default",
  type: "registry:style",
  dependencies: ["tw-animate-css", "tailwindcss-react-aria-components", "react-aria-components"],
  registryDependencies: [],
  cssVars: {
    theme: {
      "font-sans":
        '"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      "font-mono":
        "\"Geist Mono\", 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '\"Liberation Mono\"', '\"Courier New\"', 'monospace'",
      "color-border": "var(--border)",
      "color-input": "var(--input)",
      "color-ring": "var(--ring)",
      "color-bg": "var(--bg)",
      "color-fg": "var(--fg)",
      "color-primary": "var(--primary)",
      "color-primary-fg": "var(--primary-fg)",
      "color-secondary": "var(--secondary)",
      "color-secondary-fg": "var(--secondary-fg)",
      "color-accent": "var(--accent)",
      "color-accent-fg": "var(--accent-fg)",
      "color-success": "var(--success)",
      "color-success-fg": "var(--success-fg)",
      "color-danger": "var(--danger)",
      "color-danger-fg": "var(--danger-fg)",
      "color-warning": "var(--warning)",
      "color-warning-fg": "var(--warning-fg)",
      "color-muted": "var(--muted)",
      "color-muted-fg": "var(--muted-fg)",
      "color-overlay": "var(--overlay)",
      "color-overlay-fg": "var(--overlay-fg)",
      "color-navbar": "var(--navbar)",
      "color-navbar-fg": "var(--navbar-fg)",
      "color-sidebar": "var(--sidebar)",
      "color-sidebar-fg": "var(--sidebar-fg)",
      "color-chart-1": "var(--chart-1)",
      "color-chart-2": "var(--chart-2)",
      "color-chart-3": "var(--chart-3)",
      "color-chart-4": "var(--chart-4)",
      "color-chart-5": "var(--chart-5)",
    },
    light: {
      bg: "var(--color-white)",
      fg: "var(--color-gray-950)",
      primary: "var(--color-blue-600)",
      "primary-fg": "var(--color-white)",
      secondary: "var(--color-gray-100)",
      "secondary-fg": "var(--color-gray-950)",
      overlay: "var(--color-white)",
      "overlay-fg": "var(--color-gray-950)",
      accent: "var(--color-blue-600)",
      "accent-fg": "var(--color-white)",
      muted: "var(--color-gray-100)",
      "muted-fg": "var(--color-gray-600)",
      success: "var(--color-emerald-600)",
      "success-fg": "var(--color-white)",
      warning: "var(--color-amber-400)",
      "warning-fg": "var(--color-amber-950)",
      danger: "var(--color-red-600)",
      "danger-fg": "var(--color-red-50)",
      border: "var(--color-gray-200)",
      input: "var(--color-gray-300)",
      ring: "var(--color-blue-600)",
      navbar: "var(--color-gray-50)",
      "navbar-fg": "var(--color-gray-950)",
      sidebar: "var(--color-gray-50)",
      "sidebar-fg": "var(--color-gray-950)",
      "chart-1": "var(--color-blue-600)",
      "chart-2": "var(--color-blue-400)",
      "chart-3": "var(--color-blue-300)",
      "chart-4": "var(--color-blue-200)",
      "chart-5": "var(--color-blue-100)",
      "radius-lg": "0.5rem",
      "radius-xs": "calc(var(--radius-lg) * 0.5)",
      "radius-sm": "calc(var(--radius-lg) * 0.75)",
      "radius-md": "calc(var(--radius-lg) * 0.9)",
      "radius-xl": "calc(var(--radius-lg) * 1.25)",
      "radius-2xl": "calc(var(--radius-lg) * 1.5)",
      "radius-3xl": "calc(var(--radius-lg) * 2)",
      "radius-4xl": "calc(var(--radius-lg) * 3)",
    },
    dark: {
      bg: "var(--color-gray-950)",
      fg: "var(--color-gray-50)",
      primary: "var(--color-blue-600)",
      "primary-fg": "var(--color-white)",
      secondary: "oklch(0.248 0.033 256.848)",
      "secondary-fg": "var(--color-gray-50)",
      accent: "var(--color-blue-600)",
      "accent-fg": "var(--color-white)",
      muted: "var(--color-gray-900)",
      "muted-fg": "var(--color-gray-400)",
      overlay: "oklch(0.170 0.034 264.665)",
      "overlay-fg": "var(--color-gray-50)",
      success: "var(--color-emerald-600)",
      "success-fg": "var(--color-white)",
      warning: "var(--color-amber-400)",
      "warning-fg": "var(--color-amber-950)",
      danger: "var(--color-red-600)",
      "danger-fg": "var(--color-red-50)",
      border: "oklch(0.273 0.034 259.733)",
      input: "oklch(0.293 0.034 259.733)",
      ring: "var(--color-blue-600)",
      navbar: "oklch(0.170 0.034 264.665)",
      "navbar-fg": "var(--color-gray-50)",
      sidebar: "oklch(0.160 0.034 264.665)",
      "sidebar-fg": "var(--color-gray-50)",
      "chart-1": "var(--color-blue-700)",
      "chart-2": "var(--color-blue-500)",
      "chart-3": "var(--color-blue-400)",
      "chart-4": "var(--color-blue-300)",
      "chart-5": "var(--color-blue-200)",
    },
  },
  files: [],
  title: "Base style",
  description: "",
} satisfies RegistryJsonItem

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
      !["react", "react-dom", "clsx", "tailwind-merge", "next", "embla-carousel-react"].includes(
        importPath,
      )
    ) {
      dependencies.add(importPath === "motion/react" ? "motion" : importPath)
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
    { type: "block", path: "components/blocks" },
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
      const nameKey = `${type}-${relativeKey
        .replace(/\.tsx$/, "") // Correct regex
        .replace(/\/index$/, "") // Correct regex
        // Handle case where index removal leaves empty string (e.g., src/index.tsx)
        .replace(/^$/, componentBaseName)}`
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

      let whatType: IntermediateRegistryItem["type"]
      switch (true) {
        case nameKey.startsWith("ui-"):
          whatType = "registry:component"
          break
        case nameKey.startsWith("block-"):
          whatType = "registry:block"
          break
        case nameKey.startsWith("lib-"):
          whatType = "registry:lib"
          break
        case nameKey.startsWith("hook-"):
          whatType = "registry:hook"
          break
        case nameKey.startsWith("ui/"):
          whatType = "registry:ui"
          break
        case nameKey.startsWith("page-"):
          whatType = "registry:page"
          break
        case nameKey.startsWith("file-"):
          whatType = "registry:file"
          break
        case nameKey.startsWith("style-"):
          whatType = "registry:style"
          break
        case nameKey.startsWith("theme-"):
          whatType = "registry:theme"
          break
        default:
          whatType = "registry:component"
      }

      // console.log(whatType)
      const item: IntermediateRegistryItem = {
        filePath: absoluteFilePath,
        name: nameKey,
        type: whatType,
        title: capitalize(componentBaseName.replace(/-/g, " ")),
        description: "",
        dependencies: externalDeps,
        files: [{ path: relativePathFromRoot, type: whatType }],
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
          resolvedRegistryDeps.add(`${registryUrl}/r/${dependencyKey}.json`)
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
  const finalRegistryItems: RegistryJsonItem[] = [
    registryBaseStyle,
    ...Array.from(intermediateData.values()).map((item) => {
      // Remove temporary properties
      const { filePath, internalImportPaths, ...rest } = item
      // Ensure the rest object conforms to RegistryJsonItem
      return {
        name: rest.name || "", // Provide default empty string
        type: item.type, // Keep consistent type
        title: rest.title || "", // Provide default
        description: rest.description || "", // Provide default
        dependencies: rest.dependencies || [], // Default to empty array
        registryDependencies: rest.registryDependencies || [], // Default to empty array
        files: rest.files || [], // Default to empty array
      } as RegistryJsonItem // Assert type after ensuring all fields are present
    }),
  ]

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
