import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { variantName } = await request.json();

    if (!variantName) {
      return NextResponse.json(
        { success: false, message: "Variant name is required" },
        { status: 400 }
      );
    }

    const variantPath = path.join(
      process.cwd(),
      `ui/button-variants/button-${variantName}.tsx`
    );

    const buttonPath = path.join(process.cwd(), "ui/button.tsx");

    if (!fs.existsSync(variantPath)) {
      return NextResponse.json(
        {
          success: false,
          message: `Button variant '${variantName}' not found`,
        },
        { status: 404 }
      );
    }

    const variantContent = fs.readFileSync(variantPath, "utf8");

    fs.writeFileSync(buttonPath, variantContent, "utf8");

    return NextResponse.json({
      success: true,
      message: `Button updated with '${variantName}' variant`,
    });
  } catch (error) {
    console.error("Error updating button variant:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update button variant",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
