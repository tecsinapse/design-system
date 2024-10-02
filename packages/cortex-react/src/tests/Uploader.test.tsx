import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFileUpload } from '../hooks';
import { FileStatus, FileUpload, Uploader } from '../components';

jest.mock('../hooks'); // Mockando o hook

const mockFiles: FileUpload<unknown>[] = [
  {
    uid: '1',
    file: new File(['file content'], 'file1.txt', { type: 'text/plain' }),
    status: FileStatus.UPLOADING,
  },
  {
    uid: '2',
    file: new File(['file content'], 'file2.txt', { type: 'text/plain' }),
    status: FileStatus.SUCCESS,
  },
];

beforeEach(() => {
  (useFileUpload as jest.Mock).mockReturnValue({
    files: mockFiles,
    onOpen: jest.fn(),
    onClose: jest.fn(),
    dropzoneProps: {
      getRootProps: jest.fn(() => ({
        onClick: jest.fn(),
        role: 'button',
        'data-testid': 'dropzone',
      })),
      getInputProps: jest.fn(() => ({
        'aria-label': 'file input',
        type: 'file',
      })),
    },
    open: true,
  });
});

describe('Uploader Components', () => {
  describe('Dropzone', () => {
    it('should render with default props', () => {
      render(
        <Uploader.Dropzone dropzoneProps={useFileUpload({}).dropzoneProps} />
      );

      expect(screen.getByTestId('select-dropzone')).toHaveTextContent(
        'Select a file to start'
      );
      expect(
        screen.getByText(
          'By dragging and dropping it here or clicking the button below'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Select File' })
      ).toBeInTheDocument();
    });

    it('should render with custom props', () => {
      render(
        <Uploader.Dropzone
          dropzoneProps={useFileUpload({}).dropzoneProps}
          selectFileText="Custom file selection"
          dropText="Custom drop text"
          buttonText="Custom Button"
        />
      );

      expect(screen.getByTestId('select-dropzone')).toHaveTextContent(
        'Custom file selection'
      );
      expect(screen.getByText('Custom drop text')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Custom Button' })
      ).toBeInTheDocument();
    });

    it('should call getRootProps and getInputProps', () => {
      render(
        <Uploader.Dropzone dropzoneProps={useFileUpload({}).dropzoneProps} />
      );

      expect(useFileUpload({}).dropzoneProps.getRootProps).toHaveBeenCalled();
      expect(useFileUpload({}).dropzoneProps.getInputProps).toHaveBeenCalled();
    });
  });

  describe('Files', () => {
    it('should render the files list', () => {
      render(<Uploader.Files files={mockFiles} onDelete={jest.fn()} />);

      expect(screen.getByTestId('upload-progress')).toHaveTextContent(
        'Upload(s) in progress'
      );
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('file1.txt')).toBeInTheDocument();
      expect(screen.getByText('file2.txt')).toBeInTheDocument();
    });

    it('should render with custom upload progress text', () => {
      render(
        <Uploader.Files
          files={mockFiles}
          onDelete={jest.fn()}
          uploadProgressText="Uploading..."
        />
      );

      expect(screen.getByTestId('upload-progress')).toHaveTextContent(
        'Uploading...'
      );
    });
  });

  describe('Modal', () => {
    const mockOnClose = jest.fn();

    it('should render the modal with title and close button', () => {
      render(
        <Uploader.Modal open={true} onClose={mockOnClose} title="Test Modal">
          Modal Content
        </Uploader.Modal>
      );

      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
      expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      render(
        <Uploader.Modal open={true} onClose={mockOnClose}>
          Modal Content
        </Uploader.Modal>
      );

      fireEvent.click(screen.getByTestId('close-button'));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Root', () => {
    const mockOnClose = jest.fn();
    const mockOnDelete = jest.fn();

    it('should render Uploader.Root with modal, dropzone, and files', () => {
      render(
        <Uploader.Root
          open={true}
          onClose={mockOnClose}
          files={mockFiles}
          onDelete={mockOnDelete}
          dropzoneProps={useFileUpload({}).dropzoneProps}
          selectFileText="Custom file selection"
          dropText="Custom drop text"
          buttonText="Custom Button"
          uploadProgressText="Custom uploading..."
          titleModal="Custom Modal Title"
        />
      );

      expect(screen.getByText('Custom Modal Title')).toBeInTheDocument();

      expect(screen.getByTestId('select-dropzone')).toHaveTextContent(
        'Custom file selection'
      );
      expect(screen.getByText('Custom drop text')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Custom Button' })
      ).toBeInTheDocument();

      expect(screen.getByTestId('upload-progress')).toHaveTextContent(
        'Custom uploading...'
      );
      expect(screen.getByText('file1.txt')).toBeInTheDocument();
      expect(screen.getByText('file2.txt')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      render(
        <Uploader.Root
          open={true}
          onClose={mockOnClose}
          files={mockFiles}
          onDelete={mockOnDelete}
          dropzoneProps={useFileUpload({}).dropzoneProps}
        />
      );

      fireEvent.click(screen.getByTestId('close-button'));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
