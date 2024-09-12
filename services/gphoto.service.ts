import React from 'react'
import {  writeFileSync } from 'fs'


export const getPhoto = async (galleryURL: string) => {
    let res: any = await fetch(galleryURL)
    res = await res.text()
    console.log('galleryURL',galleryURL);
    // console.log('R.E.S-----',res);
    const pat = /https:\/\/lh3\.googleusercontent\.com\/pw\/AP1.*?-no/g;
    const urls = res.match(pat)

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
