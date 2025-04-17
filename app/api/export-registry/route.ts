import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

// Convert exec to use promises
const execPromise = promisify(exec);

// Define paths
const registryJsonPath = path.join(process.cwd(), "registry.json");
const relumeJsonPath = path.join(process.cwd(), "public", "r", "relume.json");

// Ensure the directory for relume.json exists
function ensureRelumeDir() {
  const relumeDirPath = path.join(process.cwd(), "public", "r");
  if (!fs.existsSync(relumeDirPath)) {
    fs.mkdirSync(relumeDirPath, { recursive: true });
  }
  return relumeDirPath;
}

async function uploadRelumeFile(): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    if (!fs.existsSync(relumeJsonPath)) {
      return {
        success: false,
        error: "relume.json file not found in public/r directory",
      };
    }

    // Read the file content for upload
    const fileContent = fs.readFileSync(relumeJsonPath, "utf-8");

    const fileName = `relume.json`;

    // Upload to Vercel Blob
    const blob = await put(fileName, fileContent, {
      contentType: "application/json",
      access: "public",
    });

    // Return the public URL
    return {
      success: true,
      url: blob.url,
    };
  } catch (error) {
    console.error("Error uploading relume.json file:", error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

export async function POST() {
  try {
    // Get current working directory for script execution
    const cwd = process.cwd();

    // Ensure the r directory exists
    ensureRelumeDir();

    // Step 1: Run the registry build command
    try {
      // Build the registry
      const { stdout: buildStdout, stderr: buildStderr } = await execPromise(
        "pnpm registry:build",
        { cwd }
      );
      console.log("Registry build completed successfully");
      console.log("Build stdout:", buildStdout);
      if (buildStderr) {
        console.error("Build stderr:", buildStderr);
      }

      // Verify that registry.json was created
      if (!fs.existsSync(registryJsonPath)) {
        return NextResponse.json(
          {
            success: false,
            message: "Build completed but registry.json file was not created",
          },
          { status: 500 }
        );
      }
    } catch (buildError) {
      console.error("Registry build failed:", buildError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to build registry",
          error: (buildError as Error).message,
        },
        { status: 500 }
      );
    }

    // Step 2: Verify that public/r/relume.json exists
    if (!fs.existsSync(relumeJsonPath)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Build completed but public/r/relume.json file was not found. Check if your build process creates this file.",
        },
        { status: 500 }
      );
    }

    // Step 3: Upload the public/r/relume.json to Vercel Blob
    const uploadResult = await uploadRelumeFile();

    if (!uploadResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Registry built but upload failed",
          error: uploadResult.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Registry built and relume.json uploaded successfully",
      url: uploadResult.url,
    });
  } catch (error) {
    console.error("Error in export process:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to complete the export process",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
