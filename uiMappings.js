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

  //   Tooltip
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
  Accordion: ["@radix-ui/react-accordion"],
  Badge: [],
  Breadcrumb: [],
  Button: ["@radix-ui/react-slot"],
  Calendar: ["react-day-picker"],
  Card: [],
  Carousel: ["embla-carousel-react"],
  Checkbox: ["@radix-ui/react-checkbox"],
  Dialog: ["@radix-ui/react-dialog"],
  DropdownMenu: ["@radix-ui/react-dropdown-menu"],
  Form: ["react-hook-form"],
  Input: [],
  Label: ["@radix-ui/react-label"],
  Pagination: [],
  RadioGroup: ["@radix-ui/react-radio-group"],
  Select: ["@radix-ui/react-select"],
};

const uiMappings = { subComponentToParent, uiComponentDependencies };
export default uiMappings;
