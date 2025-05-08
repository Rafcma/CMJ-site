"use client"

import Image from "next/image"

interface PlaceholderImageProps {
  alt: string
  width: number
  height: number
  className?: string
}

export default function PlaceholderImage({ alt, width, height, className }: PlaceholderImageProps) {
  return (
    <div
      className={`relative bg-marrom-claro/20 flex items-center justify-center overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <Image
        src={`/placeholder.svg?key=eutzj&height=${height}&width=${width}&query=${encodeURIComponent(alt)}`}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
      />
    </div>
  )
}
