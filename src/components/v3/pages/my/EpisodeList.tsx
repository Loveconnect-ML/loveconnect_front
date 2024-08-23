"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Episode = {
    urls: string[];
    contents: string[];
};

function EpisodeList() {
    const [episodes, setEpisodes] = useState<Episode[] | null>(null);
    const [selectedEpisode, setSelectedEpisode] = useState<number>(0);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response = await fetch('/api/v3/episode');
                const data = await response.json();
                setEpisodes(data.episodes);
            } catch (error) {
                console.error("Failed to fetch episodes:", error);
            }
        };

        fetchEpisodes();
    }, []);

    const handleClick = (episodeIndex: number) => {
        setSelectedEpisode(episodeIndex);
    };

    return (
        <div className='w-full'>
            {episodes && episodes.map((episode, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className='w-full h-12 border-2'
                >
                    {`Episode ${index + 1}`}
                </button>
            ))}

            {episodes?.[selectedEpisode] && (
                <div className='w-full'>
                    {episodes[selectedEpisode].urls.map((url, index) => (
                        <div key={index} className='my-4 w-full flex flex-col items-center justify-center text-center'>
                            <Image src={url} alt={`Image ${index + 1}`} width={324} height={648} />
                            <div>{episodes[selectedEpisode].contents[index]}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default EpisodeList;
