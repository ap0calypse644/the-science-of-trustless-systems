import type { TalkSlide } from '../slides';
import { applicationStills } from './applications';
import { beyondStills } from './beyond';
import { privacyStills } from './privacy';

export const stills: readonly TalkSlide[] = [...beyondStills, ...applicationStills, ...privacyStills];
