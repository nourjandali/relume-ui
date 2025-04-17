"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { debounce } from "@/app/lib/utils";

// Import JSX components dynamically
const Navbar6 = dynamic(
  () => import("@/components/Navbar6").then((mod) => mod.Navbar6 || mod),
  { ssr: false }
);
const Footer9 = dynamic(
  () => import("@/components/Footer9").then((mod) => mod.Footer9 || mod),
  { ssr: false }
);
const Cta3 = dynamic(
  () => import("@/components/Cta3").then((mod) => mod.Cta3 || mod),
  { ssr: false }
);
const Header1 = dynamic(
  () => import("@/components/Header1").then((mod) => mod.Header1 || mod),
  { ssr: false }
);
const Header2 = dynamic(
  () => import("@/components/Header2").then((mod) => mod.Header2 || mod),
  { ssr: false }
);
const Header3 = dynamic(
  () => import("@/components/Header3").then((mod) => mod.Header3 || mod),
  { ssr: false }
);
const Header4 = dynamic(
  () => import("@/components/Header4").then((mod) => mod.Header4 || mod),
  { ssr: false }
);
const Header5 = dynamic(
  () => import("@/components/Header5").then((mod) => mod.Header5 || mod),
  { ssr: false }
);

type ComponentOption = {
  id: string;
  name: string;
  component: ComponentType<object>;
};

const componentOptions: ComponentOption[] = [
  { id: "header1", name: "Header 1", component: Header1 },
  { id: "header2", name: "Header 2", component: Header2 },
  { id: "header3", name: "Header 3", component: Header3 },
  { id: "header4", name: "Header 4", component: Header4 },
  { id: "header5", name: "Header 5", component: Header5 },
  { id: "navbar6", name: "Navbar 6", component: Navbar6 },
  { id: "footer9", name: "Footer 9", component: Footer9 },
  { id: "cta3", name: "CTA 3", component: Cta3 },
];

// Button variants section
const buttonVariants = [
  { id: "default", name: "Default" },
  { id: "gradient", name: "Gradient" },
  { id: "brick", name: "Brick" },
  { id: "bubble", name: "Bubble" },
  { id: "sleek", name: "Sleek" },
  { id: "elevate", name: "Elevate" },
];

export default function Playground() {
  const [selectedComponentIds, setSelectedComponentIds] = useState<string[]>(
    []
  );
  const [updateStatus, setUpdateStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
    isScriptRunning?: boolean;
  }>({ loading: false });

  const [exportStatus, setExportStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
    url?: string;
  }>({ loading: false });

  const [showModal, setShowModal] = useState(false);

  const [buttonVariantStatus, setButtonVariantStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
    selected?: string;
  }>({ loading: false });

  // Map component IDs to actual component names in update-registry.cjs
  const getComponentName = (id: string): string => {
    switch (id) {
      case "navbar6":
        return "Navbar6";
      case "footer9":
        return "Footer9";
      case "cta3":
        return "Cta3";
      case "header1":
        return "Header1";
      case "header2":
        return "Header2";
      case "header3":
        return "Header3";
      case "header4":
        return "Header4";
      case "header5":
        return "Header5";
      default:
        return "";
    }
  };

  // Function to update selected blocks via API
  const updateSelectedBlocks = async (componentIds: string[]) => {
    try {
      setUpdateStatus({ loading: true, isScriptRunning: false });

      // Map component IDs to actual component names used in update-registry.cjs
      const selectedBlocks = componentIds
        .map(getComponentName)
        .filter((name) => name !== "");

      const response = await fetch("/api/update-blocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedBlocks }),
      });

      const data = await response.json();

      // Check if message indicates script is running
      const isScriptRunning =
        data.message?.includes("script is running") || false;

      setUpdateStatus({
        loading: false,
        success: data.success,
        message: data.message,
        isScriptRunning,
      });

      // Clear success/error message after 3 seconds, but keep script running state
      setTimeout(() => {
        setUpdateStatus((prev) => ({
          loading: prev.loading,
          isScriptRunning: prev.isScriptRunning,
        }));
      }, 3000);
    } catch (err) {
      console.error("Error updating blocks:", err);
      setUpdateStatus({
        loading: false,
        success: false,
        message: "Failed to update selected blocks",
        isScriptRunning: false,
      });
    }
  };

  // Debounced update function
  const debouncedUpdate = debounce(updateSelectedBlocks, 300);

  // Update selected blocks when component selections change
  useEffect(() => {
    debouncedUpdate(selectedComponentIds);
  }, [selectedComponentIds]);

  const toggleComponent = (id: string) => {
    setSelectedComponentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Function to trigger registry build export
  const handleExport = async () => {
    try {
      setExportStatus({
        loading: true,
        message: "Building registry and generating relume.json...",
      });

      const response = await fetch("/api/export-registry", {
        method: "POST",
      });

      const data = await response.json();

      setExportStatus({
        loading: false,
        success: data.success,
        message: data.message,
        url: data.url,
      });

      // Show the modal with CLI information
      setShowModal(true);

      // Clear export status message after 3 seconds
      setTimeout(() => {
        setExportStatus((prev) => ({
          loading: false,
          url: prev.url, // Maintain the URL even after clearing status
        }));
      }, 3000);
    } catch (err) {
      console.error("Error exporting registry:", err);
      setExportStatus({
        loading: false,
        success: false,
        message: "Failed to export relume.json",
      });
    }
  };

  // Function to apply a button variant
  const applyButtonVariant = async (variantId: string) => {
    try {
      // Update the selected state immediately to avoid flickering
      setButtonVariantStatus({
        loading: true,
        selected: variantId, // Set the selected variant immediately
        message: buttonVariantStatus.message,
        success: buttonVariantStatus.success,
      });

      const response = await fetch("/api/update-button", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variantName: variantId }),
      });

      const data = await response.json();

      setButtonVariantStatus({
        loading: false,
        success: data.success,
        message: data.message,
        selected: variantId,
      });

      // Clear status message after 3 seconds
      setTimeout(() => {
        setButtonVariantStatus((prev) => ({
          loading: false,
          selected: prev.selected, // Maintain the selected state
        }));
      }, 3000);
    } catch (err) {
      console.error("Error updating button variant:", err);
      setButtonVariantStatus({
        loading: false,
        success: false,
        message: "Failed to update button variant",
        selected: variantId, // Keep the selected variant even on error
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-xl font-bold mb-2">Download Components</h2>

            {exportStatus.url ? (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Your <strong>URL </strong>
                  has been generated and uploaded to Vercel. Use the following
                  CLI command to install components:
                </p>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 my-4 font-mono text-sm overflow-x-auto">
                  <strong>npx shadcn@latest add</strong> {exportStatus.url}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Use the following CLI command to download components from your
                  registry:
                </p>

                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 my-4 font-mono text-sm overflow-x-auto">
                  npx shadcn@latest
                  https://relume-ui-beta.vercel.app/r/relume.json
                </div>
              </>
            )}

            <p className="text-xs text-gray-500 mt-2">
              This will install all the components from the Relume registry to
              your project.
            </p>
          </div>
        </div>
      )}

      <div className="border-b border-gray-200 bg-white p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-4xl font-bold">Playground</h1>

          <div className="flex gap-3">
            <button
              onClick={handleExport}
              disabled={exportStatus.loading}
              className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center ${
                exportStatus.loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {exportStatus.loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Building & Exporting...
                </>
              ) : (
                "Export"
              )}
            </button>
          </div>
        </div>

        {/* Export status indicator */}
        {(exportStatus.loading || exportStatus.message) && (
          <div
            className={`text-sm p-2 mb-3 rounded ${
              exportStatus.loading
                ? "bg-blue-100 text-blue-800"
                : exportStatus.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {exportStatus.loading && (
              <span className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-0.5 mr-1.5 h-3 w-3 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            )}
            {exportStatus.message}
          </div>
        )}

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-md font-semibold">Button Variants</h2>

            {/* Button variant status indicator as badge */}
            {buttonVariantStatus.loading && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                <svg
                  className="animate-spin -ml-0.5 mr-1.5 h-2 w-2 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            )}

            {!buttonVariantStatus.loading && buttonVariantStatus.message && (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  buttonVariantStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {buttonVariantStatus.success ? "Updated to " : "Failed: "}
                {buttonVariantStatus.selected &&
                  buttonVariants.find(
                    (v) => v.id === buttonVariantStatus.selected
                  )?.name}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {buttonVariants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => applyButtonVariant(variant.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  buttonVariantStatus.selected === variant.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-md font-semibold">
              Sitebuilder Generated Components
            </h2>

            {/* Layout components status indicator as badge */}
            {updateStatus.loading && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                <svg
                  className="animate-spin -ml-0.5 mr-1.5 h-2 w-2 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            )}

            {!updateStatus.loading && updateStatus.message && (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  updateStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {updateStatus.success ? "Updated" : "Failed to update"}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {componentOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleComponent(option.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedComponentIds.includes(option.id)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        {selectedComponentIds.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-500">
            Select components to preview
          </div>
        ) : (
          selectedComponentIds.map((id) => {
            const option = componentOptions.find((o) => o.id === id);
            if (!option) return null;

            const Component = option.component;
            return (
              <div key={id} className="relative mb-8">
                <div className="bg-gray-100 py-2 px-4 text-sm font-medium sticky top-[73px] z-40">
                  {option.name}
                </div>
                <Component />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
