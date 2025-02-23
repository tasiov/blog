import crypto from "crypto"
import { createCanvas } from "canvas"
import fs from "fs"
import path from "path"

function generateHash(input: string): string {
  return crypto.createHash("md5").update(input).digest("hex")
}

export function generatePostImage(title: string, content: string): string {
  // Create a deterministic hash from the post content
  const hash = generateHash(title + content)

  // Define the image path
  const publicDir = path.join(process.cwd(), "public")
  const imagesDir = path.join(publicDir, "post-images")
  const imagePath = path.join(imagesDir, `${hash}.png`)
  const publicPath = `/post-images/${hash}.png`

  // If image already exists, return its path
  if (fs.existsSync(imagePath)) {
    return publicPath
  }

  // Ensure the images directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }

  // Convert hash to array of numbers to use as parameters
  const numbers = hash.match(/.{2}/g)?.map((hex) => parseInt(hex, 16)) || []

  // Create canvas
  const canvas = createCanvas(1200, 630)
  const ctx = canvas.getContext("2d")

  if (!ctx) return ""

  // Set background
  ctx.fillStyle = `hsl(${numbers[0]}, 70%, 90%)`
  ctx.fillRect(0, 0, 1200, 630)

  // Generate shapes based on content hash
  for (let i = 0; i < 8; i++) {
    const x = numbers[i * 2] * (1200 / 255)
    const y = numbers[i * 2 + 1] * (630 / 255)
    const size = (numbers[i + 2] % 100) + 50

    ctx.beginPath()
    ctx.fillStyle = `hsla(${numbers[i + 3]}, 70%, 50%, 0.5)`

    // Alternate between circles and rectangles
    if (i % 2 === 0) {
      ctx.arc(x, y, size, 0, Math.PI * 2)
    } else {
      ctx.rect(x - size / 2, y - size / 2, size, size)
    }

    ctx.fill()
  }

  // Save the image to file
  const buffer = canvas.toBuffer("image/png")
  fs.writeFileSync(imagePath, buffer)

  // Return the public URL
  return publicPath
}
