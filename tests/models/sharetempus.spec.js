import { expect } from 'chai';
import { describe, it } from 'mocha';

import ShareTempus from '../../api/models';

describe('ShareTempus', () => {
  it('should ShareTempus model exist', () => {
    expect(ShareTempus).to.exist;
  });
});
