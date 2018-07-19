import { add } from '../utils';

describe('utils', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(5, 5)).toEqual(10);
    });
  });
});
