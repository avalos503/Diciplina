#!/usr/bin/env python3
"""Generate gold-square PNG icons without extra dependencies."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path

GOLD = (232, 197, 71, 255)
INK = (7, 7, 9, 255)


def png_bytes(width: int, height: int, rgba) -> bytes:
    raw = bytearray()
    for y in range(height):
        raw.append(0)
        for x in range(width):
            raw.extend(rgba(x, y))
    return b"".join(
        (
            b"\x89PNG\r\n\x1a\n",
            chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)),
            chunk(b"IDAT", zlib.compress(bytes(raw), 9)),
            chunk(b"IEND", b""),
        )
    )


def chunk(tag: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)


def rounded_rect(px: float, py: float, size: int, radius: float) -> bool:
    x = min(px, size - 1 - px)
    y = min(py, size - 1 - py)
    if x >= radius or y >= radius:
        return True
    return (x - radius) ** 2 + (y - radius) ** 2 <= radius**2


def letter_d(nx: float, ny: float) -> bool:
    """Normalized 0-1 coords for a block letter D."""
    if nx < 0.22 or nx > 0.72 or ny < 0.22 or ny > 0.78:
        return False
    inner = 0.34 < nx < 0.60 and 0.34 < ny < 0.66
    if inner:
        return False
    if nx > 0.52:
        cx, cy = 0.52, 0.50
        rx, ry = 0.20, 0.28
        return ((nx - cx) / rx) ** 2 + ((ny - cy) / ry) ** 2 <= 1
    return True


def painter(size: int):
    radius = size * 0.22

    def rgba(x: int, y: int):
        if not rounded_rect(x, y, size, radius):
            return (0, 0, 0, 0)
        nx, ny = x / size, y / size
        if letter_d(nx, ny):
            return INK
        # small square accent
        if 0.68 <= nx <= 0.78 and 0.20 <= ny <= 0.30:
            return INK
        return GOLD

    return rgba


def write(path: Path, size: int) -> None:
    path.write_bytes(png_bytes(size, size, painter(size)))


def main() -> None:
    public = Path(__file__).resolve().parents[1] / "public"
    write(public / "icon-192.png", 192)
    write(public / "icon-512.png", 512)
    write(public / "apple-touch-icon.png", 180)


if __name__ == "__main__":
    main()
