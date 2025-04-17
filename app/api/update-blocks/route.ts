import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

// Convert exec to use promises
const execPromise = promisify(exec);

export async function POST(request: Request) {
  try {
    const { selectedBlocks } = await request.json();

    // Path to the update-registry.cjs file
    const scriptPath = path.join(process.cwd(), "update-registry.cjs");

    // Read the file
    let content = fs.readFileSync(scriptPath, "utf8");

    // Create the new function content
    const selectedBlocksStr = JSON.stringify(selectedBlocks);
    const newFunctionContent = `function getSelectedBlocks() {
  return ${selectedBlocksStr};
}`;

    // Replace the existing function with the new one using regex
    const functionRegex =
      /function getSelectedBlocks\(\)\s*\{[\s\S]*?return[\s\S]*?\};?/;
    content = content.replace(functionRegex, newFunctionContent);

    // Write the updated content back to the file
    fs.writeFileSync(scriptPath, content, "utf8");

    // Get current working directory to use as cwd for script execution
    const cwd = process.cwd();

    // Run the update-registry.cjs script asynchronously
    try {
      // Start execution in the background without awaiting
      // Using node explicitly and passing the full path with proper cwd
      execPromise(`node "${scriptPath}"`, { cwd }).catch((err) => {
        console.error("Background script execution failed:", err);
      });

      // Return success response immediately while script runs in background
      return NextResponse.json({
        success: true,
        message: "Selected blocks updated and registry script is running",
      });
    } catch (execError) {
      console.error("Error running script:", execError);
      return NextResponse.json(
        {
          success: false,
          message: "Selected blocks updated but failed to run registry script",
          error: (execError as Error).message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating selected blocks:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update selected blocks",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
