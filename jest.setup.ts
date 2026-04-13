import '@testing-library/jest-dom';

// jsdom에 없는 브라우저 API 폴리필
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
