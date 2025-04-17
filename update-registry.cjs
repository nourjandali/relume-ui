/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

// API to get selected blocks (export files)
function getSelectedBlocks() {
  return ["Header1","Header2","Header3","Header4","Header5"];
}

const blocksDir = path.join(__dirname, "components");
const registryPath = path.join(__dirname, "registry.json");

// Function to convert PascalCase to kebab-case (e.g., 'Button' to 'button')
function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// Function to extract the package name from an import source
function getPackageName(source) {
  if (source.startsWith("@")) {
    // For scoped packages (e.g., '@radix-ui/react-dialog'), use the full name
    return source;
  } else {
    // For non-scoped packages (e.g., 'react-icons/rx'), take the part before the first '/'
    const parts = source.split("/");
    return parts[0];
  }
}

// Mapping of sub-components to their parent component
const subComponentToParent = {
  // Accordion
  Accordion: "Accordion",
  AccordionItem: "Accordion",
  AccordionTrigger: "Accordion",
  AccordionContent: "Accordion",

  // Breadcrumb
  Breadcrumb: "Breadcrumb",
  BreadcrumbItem: "Breadcrumb",
  BreadcrumbLink: "Breadcrumb",
  BreadcrumbList: "Breadcrumb",
  BreadcrumbPage: "Breadcrumb",

  // Carousel
  Carousel: "Carousel",
  CarouselContent: "Carousel",
  CarouselItem: "Carousel",
  CarouselNext: "Carousel",
  CarouselPrevious: "Carousel",

  // Dialog
  Dialog: "Dialog",
  DialogPortal: "Dialog",
  DialogOverlay: "Dialog",
  DialogClose: "Dialog",
  DialogTrigger: "Dialog",
  DialogContent: "Dialog",
  DialogHeader: "Dialog",
  DialogFooter: "Dialog",
  DialogTitle: "Dialog",
  DialogDescription: "Dialog",

  // DropdownMenu
  DropdownMenu: "DropdownMenu",
  DropdownMenuTrigger: "DropdownMenu",
  DropdownMenuContent: "DropdownMenu",
  DropdownMenuItem: "DropdownMenu",
  DropdownMenuCheckboxItem: "DropdownMenu",
  DropdownMenuRadioItem: "DropdownMenu",
  DropdownMenuLabel: "DropdownMenu",
  DropdownMenuSeparator: "DropdownMenu",
  DropdownMenuShortcut: "DropdownMenu",
  DropdownMenuGroup: "DropdownMenu",
  DropdownMenuPortal: "DropdownMenu",
  DropdownMenuSub: "DropdownMenu",
  DropdownMenuSubContent: "DropdownMenu",
  DropdownMenuSubTrigger: "DropdownMenu",
  DropdownMenuRadioGroup: "DropdownMenu",

  // Form
  Form: "Form",
  FormField: "Form",
  FormItem: "Form",
  FormLabel: "Form",
  FormControl: "Form",
  FormMessage: "Form",
  FormDescription: "Form",

  // Pagination
  Pagination: "Pagination",
  PaginationContent: "Pagination",
  PaginationEllipsis: "Pagination",
  PaginationItem: "Pagination",
  PaginationLink: "Pagination",
  PaginationNext: "Pagination",
  PaginationPrevious: "Pagination",

  // Popover
  Popover: "Popover",
  PopoverTrigger: "Popover",
  PopoverContent: "Popover",

  // RadioGroup
  RadioGroup: "RadioGroup",
  RadioGroupItem: "RadioGroup",

  // Select
  Select: "Select",
  SelectGroup: "Select",
  SelectValue: "Select",
  SelectTrigger: "Select",
  SelectContent: "Select",
  SelectLabel: "Select",
  SelectItem: "Select",
  SelectSeparator: "Select",
  SelectScrollUpButton: "Select",
  SelectScrollDownButton: "Select",

  // Sheet
  Sheet: "Sheet",
  SheetPortal: "Sheet",
  SheetOverlay: "Sheet",
  SheetTrigger: "Sheet",
  SheetClose: "Sheet",
  SheetContent: "Sheet",
  SheetHeader: "Sheet",
  SheetFooter: "Sheet",
  SheetTitle: "Sheet",
  SheetDescription: "Sheet",

  // Table
  Table: "Table",
  TableHeader: "Table",
  TableBody: "Table",
  TableFooter: "Table",
  TableHead: "Table",
  TableRow: "Table",
  TableCell: "Table",
  TableCaption: "Table",

  // Tabs
  Tabs: "Tabs",
  TabsList: "Tabs",
  TabsTrigger: "Tabs",
  TabsContent: "Tabs",

  // Tooltip
  Tooltip: "Tooltip",
  TooltipTrigger: "Tooltip",
  TooltipContent: "Tooltip",
  TooltipProvider: "Tooltip",

  // Standalone components
  Badge: "Badge",
  Button: "Button",
  Calendar: "Calendar",
  Card: "Card",
  Checkbox: "Checkbox",
  Input: "Input",
  Label: "Label",
  Slider: "Slider",
  Switch: "Switch",
  Textarea: "Textarea",
};

// Mapping of parent UI components to their external dependencies
const uiComponentDependencies = {
  Accordion: ["@radix-ui/react-accordion", "react-icons"],
  Badge: ["class-variance-authority"],
  Breadcrumb: ["@radix-ui/react-slot", "react-icons"],
  Button: ["@radix-ui/react-slot", "class-variance-authority"],
  Calendar: ["react-day-picker", "react-icons"],
  Card: ["class-variance-authority"],
  Carousel: ["embla-carousel-react", "react-icons"],
  Checkbox: ["@radix-ui/react-checkbox", "react-icons"],
  Dialog: ["@radix-ui/react-dialog", "react-icons"],
  DropdownMenu: ["@radix-ui/react-dropdown-menu", "react-icons"],
  Form: ["react-hook-form", "@radix-ui/react-label", "@radix-ui/react-slot"],
  Input: ["class-variance-authority"],
  Label: ["@radix-ui/react-label", "class-variance-authority"],
  Pagination: ["react-icons"],
  RadioGroup: ["@radix-ui/react-radio-group", "react-icons"],
  Select: ["@radix-ui/react-select", "react-icons"],
  Sheet: [
    "@radix-ui/react-dialog",
    "class-variance-authority",
    "react-icons",
    "framer-motion",
  ],
  Slider: ["@radix-ui/react-slider"],
  Switch: ["@radix-ui/react-switch"],
  Table: [],
  Tabs: ["@radix-ui/react-tabs"],
  Textarea: [],
};

// Function to parse a block file and extract UI components, hooks, and external dependencies
function getImports(blockName) {
  const blockPath = path.join(blocksDir, `${blockName}.jsx`);
  if (!fs.existsSync(blockPath)) {
    console.warn(`Block file not found: ${blockPath}`);
    return { uiComponents: [], hooks: [], externalDependencies: [] };
  }
  const code = fs.readFileSync(blockPath, "utf-8");
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });
  const uiComponents = new Set();
  const hooks = new Set();
  const externalDependencies = new Set();

  traverse(ast, {
    ImportDeclaration(path) {
      // Skip type-only imports
      if (path.node.importKind === "type") {
        return;
      }
      const source = path.node.source.value;
      if (source === "@relume_io/relume-ui") {
        path.node.specifiers.forEach((specifier) => {
          if (specifier.importKind === "type") {
            return;
          }
          if (specifier.type === "ImportSpecifier") {
            const name = specifier.imported.name;
            if (name === "useMediaQuery") {
              hooks.add(name);
            } else if (subComponentToParent[name]) {
              uiComponents.add(name);
            }
          }
        });
      } else if (!source.startsWith("./") && !source.startsWith("../")) {
        const packageName = getPackageName(source);
        externalDependencies.add(packageName);
      }
    },
  });

  return {
    uiComponents: Array.from(uiComponents),
    hooks: Array.from(hooks),
    externalDependencies: Array.from(externalDependencies),
  };
}

// Main logic
// Step 1: Get selected blocks
const selectedBlocks = getSelectedBlocks();

// Step 2: Parse blocks and collect unique UI components, hooks, and external dependencies
const usedUIComponents = new Set();
const usedHooks = new Set();
const allExternalDependencies = new Set();

selectedBlocks.forEach((block) => {
  const { uiComponents, hooks, externalDependencies } = getImports(block);
  uiComponents.forEach((comp) => usedUIComponents.add(comp));
  hooks.forEach((hook) => usedHooks.add(hook));
  externalDependencies.forEach((dep) => allExternalDependencies.add(dep));
});

// Step 3: Map UI components to their parent components
const parentComponents = new Set();
usedUIComponents.forEach((comp) => {
  const parent = subComponentToParent[comp];
  if (parent) {
    parentComponents.add(parent);
  }
});

// Step 4: Map parent components to files
const uiFiles = Array.from(parentComponents).map((parent) => ({
  type: "registry:ui",
  path: `ui/${toKebabCase(parent)}.tsx`,
}));

// Step 5: Add useMediaQuery hook if present
if (usedHooks.has("useMediaQuery")) {
  uiFiles.push({
    type: "registry:hook",
    path: "hooks/use-media-query.ts",
  });
}

// Step 6: Collect dependencies from parent UI components
const uiDependencies = new Set();
parentComponents.forEach((parent) => {
  const deps = uiComponentDependencies[parent] || [];
  deps.forEach((dep) => uiDependencies.add(dep));
});

// Step 7: Combine all dependencies
const totalDependencies = new Set([
  ...uiDependencies,
  ...allExternalDependencies,
]);

// Step 8: Map selected blocks to component files
const componentFiles = selectedBlocks.map((block) => ({
  type: "registry:component",
  path: `components/${toKebabCase(block)}.jsx`,
}));

// Step 9: Update/Create registry.json
let registry;
if (fs.existsSync(registryPath)) {
  registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
} else {
  registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "relume",
    homepage: "https://relume-ui-beta.vercel.app/",
    items: [
      {
        name: "relume",
        type: "registry:block",
        description:
          "A collection of Relume UI components, blocks, and styleguide",
        dependencies: [],
        files: [],
      },
    ],
  };
}

const item = registry.items.find((item) => item.name === "relume");
if (!item) {
  console.error('Item "relume" not found in registry.json');
  process.exit(1);
}

item.dependencies = Array.from(totalDependencies);

item.files = [...componentFiles, ...uiFiles];

const requiredFiles = [
  { type: "registry:lib", path: "lib/utils.ts" },
  { type: "registry:file", path: "globals.css", target: "globals.css" },
];

const existingPaths = new Set(item.files.map((file) => file.path));
requiredFiles.forEach((file) => {
  if (!existingPaths.has(file.path)) {
    item.files.push(file);
  }
});

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2), "utf-8");
console.log("registry.json updated successfully");
