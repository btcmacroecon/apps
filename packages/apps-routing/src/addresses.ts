// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';

import Component from '@polkadot/app-addresses';

import type { Route } from './types';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'accounts',
    icon: 'address-card',
    name: 'addresses',
    text: t('nav.addresses', 'Address book', { ns: 'apps-routing' })
  };
}
