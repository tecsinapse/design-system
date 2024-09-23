import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Uploader } from '../components';

// Definindo o tipo FileItem
type FileItem = {
  file: File;
  loading: 'loading' | 'success' | 'error';
};

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'mocked-url');
});

describe('Uploader', () => {
  const mockFiles: FileItem[] = [
    {
      file: new File(['content'], 'file1.png', { type: 'image/png' }),
      loading: 'loading',
    },
    {
      file: new File(['content'], 'file2.jpg', { type: 'image/jpeg' }),
      loading: 'success',
    },
  ];

  const removeFileMock = jest.fn();
  const dropzoneProps = {
    getRootProps: jest.fn(),
    getInputProps: jest.fn(),
    isDragActive: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the uploader component with the correct modal', () => {
    render(
      <Uploader
        isOpen={true}
        onClose={jest.fn()}
        files={mockFiles}
        removeFile={removeFileMock}
        dropzoneProps={dropzoneProps}
      />
    );

    const uploads = screen.getAllByText(/upload/i);
    expect(uploads.length).toBeGreaterThan(0);
    expect(
      screen.getByText('Selecione um arquivo para começar')
    ).toBeInTheDocument();
  });

  it('should display files being uploaded', () => {
    render(
      <Uploader
        isOpen={true}
        onClose={jest.fn()}
        files={mockFiles}
        removeFile={removeFileMock}
        dropzoneProps={dropzoneProps}
      />
    );

    expect(screen.getByText('Upload(s) em progresso')).toBeInTheDocument();
    expect(screen.getByText('file1.png')).toBeInTheDocument();
    expect(screen.getByText('file2.jpg')).toBeInTheDocument();
  });

  it('should render the dropzone area', () => {
    render(
      <Uploader
        isOpen={true}
        onClose={jest.fn()}
        files={mockFiles}
        removeFile={removeFileMock}
        dropzoneProps={dropzoneProps}
      />
    );

    const dropzone = screen.getByText('Selecione um arquivo para começar');
    expect(dropzone).toBeInTheDocument();
  });

  it('should call onClose when the modal is closed', () => {
    const onCloseMock = jest.fn();

    render(
      <Uploader
        isOpen={true}
        onClose={onCloseMock}
        files={mockFiles}
        removeFile={removeFileMock}
        dropzoneProps={dropzoneProps}
      />
    );

    fireEvent.click(screen.getByTestId('close-button'));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
