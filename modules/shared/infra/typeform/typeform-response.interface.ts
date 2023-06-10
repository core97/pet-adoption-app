export interface RetriveResponse {
  total_items: number;
  page_count: number;
  items: Item[];
}

interface Item {
  landing_id: string;
  token: string;
  response_id: string;
  landed_at: Date;
  submitted_at: Date;
  metadata: Metadata;
  hidden: Hidden;
  calculated: Calculated;
  answers: Answer[];
}

interface Answer {
  field: Field;
  type: string;
  choice?: Choice;
  text?: string;
}

interface Choice {
  id: string;
  ref: string;
  label: string;
}

interface Field {
  id: string;
  ref: string;
  type: string;
}

interface Calculated {
  score: number;
}

interface Hidden {}

interface Metadata {
  user_agent: string;
  platform: string;
  referer: string;
  network_id: string;
  browser: string;
}
