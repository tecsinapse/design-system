import React from 'react';

export const Stairs = ({
  data,
  property,
  extraStyles,
}: {
  data: Record<string, string>;
  property: string;
  extraStyles?: Record<string, string>;
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>token</th>
          <th>size (rem)</th>
          <th>size (px)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <div
                className="bg-secondary-light rounded-micro pl-micro"
                style={{ [property]: value, ...extraStyles }}
              >
                {value}
              </div>
            </td>
            <td>
              <div
                className="bg-secondary-light rounded-micro pl-micro"
                style={{ [property]: value, ...extraStyles }}
              >
                {parseFloat(value) * 16}px
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const Shapes = ({
  data,
  property,
  extraStyles,
}: {
  data: Record<string, string>;
  property: string;
  extraStyles?: Record<string, string>;
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>token</th>
          <th>size (rem)</th>
          <th>size (px)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => {
          const pxSize = Math.floor(parseFloat(value) * 16);
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <div
                  className="w-[120px] h-mega bg-secondary-light rounded-micro pl-micro flex justify-center items-center"
                  style={{ [property]: value, ...extraStyles }}
                >
                  {value}
                </div>
              </td>
              <td>
                <div
                  className="w-[120px] h-mega bg-secondary-light rounded-micro pl-micro flex justify-center items-center"
                  style={{ [property]: value, ...extraStyles }}
                >
                  {pxSize > 100 ? parseInt(value) : pxSize}px
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const Circles = ({ data }: Record<string, Record<string, string>>) => {
  return Object.entries(data).map(([prop, record]) => (
    <React.Fragment key={prop}>
      <h3>{prop}</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-[33%]">token</th>
            <th>color</th>
            <th>hex</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(record).map(([key, value]) => (
            <tr key={key}>
              <td>
                {prop}-{key}
              </td>
              <td>
                <div
                  className="w-mega h-mega rounded-full"
                  style={{ backgroundColor: value }}
                />
              </td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  ));
};

export const Sizes = ({
  data,
}: {
  data: Record<string, Array<string> | string>;
}) => {
  return (
    <>
      <h3>Font sizes</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th>token</th>
            <th>size (rem)</th>
            <th>size (px)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => {
            return Array.isArray(value) ? (
              <tr key={key}>
                <td style={{ fontSize: value[0], lineHeight: value[1] }}>
                  {key}
                </td>
                <td>
                  <div className="flex flex-col">
                    <span>font size: {value[0]}</span>
                    <span>line height: {value[1]}</span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span>
                      font size: {Math.floor(parseFloat(value[0]) * 16)}px
                    </span>
                    <span>
                      line height: {Math.floor(parseFloat(value[1]) * 16)}px
                    </span>
                  </div>
                </td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
      <h3>Icon sizes</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th>token</th>
            <th>example</th>
            <th>size (rem)</th>
            <th>size (px)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => {
            return !Array.isArray(value) ? (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <div style={{ fontSize: value }}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 32 32"
                      height="1.35em"
                      width="1.35em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"
                      ></path>
                    </svg>
                  </div>
                </td>
                <td>{value}</td>
                <td>{Math.floor(parseFloat(value) * 16)}px</td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </>
  );
};
