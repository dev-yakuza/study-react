import type { Preview } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <ToDoListContextProvider>
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </ToDoListContextProvider>
  ),
];