// Copyright 2017-2020 @polkadot/app-calendar authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import styled from 'styled-components';

import type { EntryInfo } from './types';
import DayItem from './DayItem';

interface Props {
  className?: string;
  date: Date;
  hour: number;
  index: number;
  minutes: number;
  scheduled: EntryInfo[];
}

const MN_TO_MS = 60 * 1000;
const HR_TO_MS = 60 * MN_TO_MS;

function DayHour ({ className = '', date, hour, index, minutes, scheduled }: Props): React.ReactElement<Props> | null {
  const filtered = useMemo(
    (): EntryInfo[] => {
      const start = date.getTime() + (index * HR_TO_MS);
      const end = start + HR_TO_MS;
      const explicit = start + (minutes * MN_TO_MS);

      return scheduled
        .filter(({ dateTime }) => dateTime >= explicit && dateTime < end)
        .sort((a, b) => (a.dateTime - b.dateTime) || a.type.localeCompare(b.type));
    },
    [date, index, minutes, scheduled]
  );

  const hourStr = `${` ${hour}`.slice(-2)} ${hour >= 12 ? 'pm' : 'am'}`;

  return (
    <div className={`${className}${filtered.length ? ' hasItems' : ''}`}>
      <div className={`hourLabel${filtered.length ? ' highlight--color' : ''}`}>{hourStr}</div>
      <div className='hourContainer'>
        {filtered.map((item, index): React.ReactNode => (
          <DayItem
            item={item}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(styled(DayHour)`
  align-items: center;
  display: flex;
  position: relative;
  z-index: 2;

  // &:nth-child(even) {
  //   background: #faf8f6;
  // }

  &:nth-child(odd) {
    background: white;
  }

  &.isPast {
    opacity: 0.75;
  }

  .hourContainer {
    flex: 1;
    padding: 0.25rem 0;
  }

  .hourLabel {
    flex: 0;
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1;
    min-width: 5.5rem;
    opacity: 0.5;
    padding: 0.5rem 1rem;
    text-align: right;
    text-transform: uppercase;
    z-index: 1;
  }

  &.hasItems .hourLabel {
    font-size: 1.1rem;
    font-weight: 400;
    opacity: 1;
    padding: 0.7rem 1rem;
  }
`);
