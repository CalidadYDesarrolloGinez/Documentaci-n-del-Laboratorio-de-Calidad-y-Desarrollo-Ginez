import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

import { REPO_NAME } from "./constants"

export function getBasePath(): string {
    return REPO_NAME
}

export function resolvePath(path: string): string {
    const base = getBasePath()
    if (path.startsWith('http')) return path

    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`

    // In GitHub Pages with basePath in next.config.js, 
    // Link components handle basePath automatically.
    // This function is mainly for standard HTML tags (img, a, etc.)
    return `${base}${normalizedPath}`.replace(/\/+/g, '/')
}

export function getDriveViewUrl(fileId: string | null | undefined): string | null {
    if (!fileId || fileId.trim() === '') return null
    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
}

export function getDriveDownloadUrl(fileId: string | null | undefined): string | null {
    if (!fileId || fileId.trim() === '') return null
    return `https://drive.google.com/uc?export=download&id=${fileId}`
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

export function unslugify(slug: string): string {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}
