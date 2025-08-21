import { NextRequest, NextResponse } from "next/server"
import { uploadFileToS3 } from "@/lib/s3"

// POST /api/upload
export async function POST(req: NextRequest) {
  try {
    // Parse multipart/form-data
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Convert file into Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload file to S3
    const fileUrl = await uploadFileToS3(buffer, file.name, file.type)

    return NextResponse.json({ url: fileUrl })
  } catch (error: any) {
    console.error("S3 Upload Error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
