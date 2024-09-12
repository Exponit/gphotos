import React from 'react'
import {  writeFileSync } from 'fs'


export const getPhoto = async (galleryURL: string) => {
    // Fetch the latest content from the gallery URL
    const res = await fetch(galleryURL, {
        cache: 'no-store', // Disable caching to always get fresh content
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    const content = await res.text();

    console.log('galleryURL', galleryURL);
    const pat = /https:\/\/lh3\.googleusercontent\.com\/pw\/AP1.*?-no/g;
    const urls = content.match(pat) || [];

    // Validate each URL
    const validUrls = await Promise.all(urls.map(async (url) => {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok ? url : null;
    }));

    return validUrls.filter(Boolean);
}

export const setSize = (srcUrl: string, width?: number, height?: number) => {
    const base = srcUrl.split("=")[0]
    const w = 'w' + width || 200
    const h = 'h' + height || 200
    return `${base}=${w}-${h}-no`
}
