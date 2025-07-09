'use client';

import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import React from 'react';

type MentorAvatarProps = {
  seed: string;
  className?: string;
  options?: {
    hair?: ('short16' | 'short15' | 'short14' | 'short13' | 'short12' | 'short11' | 'short10' | 'short09' | 'short08' | 'short07' | 'short06' | 'short05' | 'short04' | 'short03' | 'long20' | 'short02' | 'short01' | 'long19' | 'long18' | 'long17' | 'long16' | 'long15' | 'long14' | 'long13' | 'long12' | 'long11' | 'long10' | 'long09' | 'long08' | 'long07' | 'long06' | 'long05' | 'long04' | 'long03' | 'long02' | 'long01' | 'short19' | 'long26' | 'long25' | 'short18' | 'long24' | 'long23' | 'long22' | 'short17' | 'long21')[];
    facialHair?: string[];
    accessories?: string[];
    clothes?: string[];
  };
};

export default function MentorAvatar({
  seed,
  className = 'w-24 h-24',
  options = {},
}: MentorAvatarProps) {
  // this will bundle only the Adventurer style
  const svg = createAvatar(adventurer, {
    "seed": "Brian",
    "eyebrows": [
      "variant04"
    ],
    "eyes": [
      "variant03"
    ],
    "hair": [
      "long22",
      "long24",
      "short03"
    ],
    "hairColor": [
      "afafaf"
    ],
    "mouth": [
      "variant12"
    ],
    "skinColor": [
      "f2d3b1"
    ]
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />

  );
}
