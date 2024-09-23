import React from 'react';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
interface FileDropzoneProps {
  dropzoneProps: any;
  button: () => string;
}

export const FileDropzone = ({ dropzoneProps, button }: FileDropzoneProps) => {
  return (
    <div
      {...dropzoneProps.getRootProps()}
      className={`bg-white w-full border-dashed border-2 p-deca flex flex-col justify-center rounded-mili ${
        dropzoneProps.isDragActive ? 'border-success-medium bg-gray-100' : ''
      }`}
    >
      <input {...dropzoneProps.getInputProps()} />
      <div className="flex flex-col justify-center text-center items-center gap-deca">
        <HiOutlineCloudArrowUp className="text-primary-medium" size={35} />
        <div className="gap-mili">
          <p className="text-lg font-semibold ">
            Selecione um arquivo para começar
          </p>
          <p className="text-sm text-gray-500">
            Arrastando ele e soltando aqui ou clicando no botão abaixo
          </p>
        </div>

        <button className={button()}>Selecionar Arquivo</button>
      </div>
    </div>
  );
};
