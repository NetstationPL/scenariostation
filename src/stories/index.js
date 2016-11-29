import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import Step from '../Step.js';
import EditableTitle from '../EditableTitle.js';

storiesOf('Step', module)
  .add('example', () => (
    <Step label="Zakładając, że" />
  ));

storiesOf('EditableTitle', module)
  .add('empty', () => (
    <EditableTitle />
  ))
  .add('filled', () => (
    <EditableTitle title="Some example title" />
  ));

