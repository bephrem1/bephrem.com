import type { FunctionComponent } from 'react';
import SeriesTape from './SeriesTape';

const NIA_BASE = '/commercial/2026/nia-context-week';
const NIA_CLIP_IDS = [1, 2, 3, 4, 5, 6] as const;

type CommercialTapeProps = {
  className?: string;
};

const CommercialTape: FunctionComponent<CommercialTapeProps> = ({ className }) => (
  <SeriesTape base={NIA_BASE} clipIds={NIA_CLIP_IDS} className={className} />
);

export default CommercialTape;
