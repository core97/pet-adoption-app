export interface RetriveForm {
  id:               string;
  type:             string;
  title:            string;
  workspace:        Theme;
  theme:            Theme;
  settings:         Settings;
  thankyou_screens: ThankyouScreen[];
  fields:           Field[];
  created_at:       Date;
  last_updated_at:  Date;
  published_at:     Date;
  _links:           Links;
}

interface Links {
  display: string;
}

interface Field {
  id:          string;
  title:       string;
  ref:         string;
  properties:  FieldProperties;
  validations: Validations;
  type:        string;
  attachment?: FieldAttachment;
  layout?:     Layout;
}

interface FieldAttachment {
  type:       string;
  href:       string;
  properties: PurpleProperties;
}

interface PurpleProperties {
  description: string;
}

interface Layout {
  type:       string;
  attachment: LayoutAttachment;
  placement:  string;
}

interface LayoutAttachment {
  type:       string;
  href:       string;
  properties: FluffyProperties;
}

interface FluffyProperties {
  brightness:  number;
  description: string;
}

interface FieldProperties {
  randomize?:                boolean;
  allow_multiple_selection?: boolean;
  allow_other_choice?:       boolean;
  vertical_alignment?:       boolean;
  choices?:                  Choice[];
}

interface Choice {
  id:    string;
  ref:   string;
  label: string;
}

interface Validations {
  required:    boolean;
  max_length?: number;
}

interface Settings {
  language:                   string;
  progress_bar:               string;
  meta:                       Meta;
  hide_navigation:            boolean;
  is_public:                  boolean;
  is_trial:                   boolean;
  show_progress_bar:          boolean;
  show_typeform_branding:     boolean;
  are_uploads_public:         boolean;
  show_time_to_complete:      boolean;
  show_number_of_submissions: boolean;
  show_cookie_consent:        boolean;
  show_question_number:       boolean;
  show_key_hint_on_choices:   boolean;
  autosave_progress:          boolean;
  free_form_navigation:       boolean;
  pro_subdomain_enabled:      boolean;
  capabilities:               Capabilities;
}

interface Capabilities {
  e2e_encryption: E2EEncryption;
}

interface E2EEncryption {
  enabled:    boolean;
  modifiable: boolean;
}

interface Meta {
  allow_indexing: boolean;
}

interface ThankyouScreen {
  id:          string;
  ref:         string;
  title:       string;
  type:        string;
  properties:  ThankyouScreenProperties;
  attachment?: ThankyouScreenAttachment;
}

interface ThankyouScreenAttachment {
  type: string;
  href: string;
}

interface ThankyouScreenProperties {
  show_button: boolean;
  share_icons: boolean;
  button_mode: string;
  button_text: string;
}

interface Theme {
  href: string;
}
