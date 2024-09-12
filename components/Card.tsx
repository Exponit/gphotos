import React from 'react'
import { setSize } from '@/services/gphoto.service';

function Card({
    url,
    className,
    onClick,
  }: {
    url: string
    className?: string;
    onClick: () => void;
  }) {
    return (
        <div className="cursor-pointer" onClick={onClick}>
            <img src={setSize(url, 500, 500)} alt="Gallery image" className="rounded-lg hover:opacity-80 transition-opacity" />
        </div>
    )
}

export default Card