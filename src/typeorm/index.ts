import { Authors } from './authors.entity';
import { Info } from './info.entity';
import { Quotes } from './quotes.entity';
import { Tokens } from './tokens.entity';
import { Users } from './users.entity';

const entities = [Info, Users, Tokens, Authors, Quotes];

export { Info };
export { Users };
export { Tokens };
export { Authors };
export { Quotes };

export default entities;
