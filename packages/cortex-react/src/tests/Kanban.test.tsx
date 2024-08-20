import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Kanban } from '../components/Kanban';

describe('Kanban', () => {
  it('Should render the Kanban Root component', () => {
    const { container } = render(<Kanban.Root />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Should render children inside the Kanban Root component', () => {
    const { getByText } = render(
      <Kanban.Root>
        <span>Kanban Content</span>
      </Kanban.Root>
    );
    expect(getByText('Kanban Content')).toBeInTheDocument();
  });

  it('Should apply the custom class to the Kanban Root component', () => {
    const { container } = render(<Kanban.Root className="bg-blue-400" />);
    expect(container.firstChild).toHaveClass('bg-blue-400');
  });

  it('Should render the Kanban Header component', () => {
    const { container } = render(<Kanban.Header />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Should render children inside the Kanban Header component', () => {
    const { getByText } = render(
      <Kanban.Header>
        <span>Header Content</span>
      </Kanban.Header>
    );
    expect(getByText('Header Content')).toBeInTheDocument();
  });

  it('Should render the Kanban Body component', () => {
    const { container } = render(<Kanban.Body />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Should render children inside the Kanban Body component', () => {
    const { getByText } = render(
      <Kanban.Body>
        <span>Body Content</span>
      </Kanban.Body>
    );
    expect(getByText('Body Content')).toBeInTheDocument();
  });

  it('Should render the Kanban List component', () => {
    const { container } = render(<Kanban.ContainerList />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('Should render children inside the Kanban List component', () => {
    const { getByText } = render(
      <Kanban.ContainerList>
        <span>List Content</span>
      </Kanban.ContainerList>
    );
    expect(getByText('List Content')).toBeInTheDocument();
  });

  it('Should propagate props to the Kanban components', () => {
    const { container } = render(
      <Kanban.Root data-testid="kanban-root" id="kanban-root-id">
        <Kanban.Header data-testid="kanban-header" />
        <Kanban.Body data-testid="kanban-body" />
        <Kanban.ContainerList data-testid="kanban-list" />
      </Kanban.Root>
    );

    const rootElement = container.querySelector('[data-testid="kanban-root"]');
    const headerElement = container.querySelector(
      '[data-testid="kanban-header"]'
    );
    const bodyElement = container.querySelector('[data-testid="kanban-body"]');
    const listElement = container.querySelector('[data-testid="kanban-list"]');

    expect(rootElement).toHaveAttribute('id', 'kanban-root-id');
    expect(headerElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
    expect(listElement).toBeInTheDocument();
  });
});
