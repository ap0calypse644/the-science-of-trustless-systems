import type { TalkSlide } from '../slides';
import { caesarStills } from './caesar';
import { messengerStills } from './messenger';
import { privacyStills } from './privacy';

export const stills: readonly TalkSlide[] = [...privacyStills, ...messengerStills, ...caesarStills];
