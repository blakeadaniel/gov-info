export type CollectionPackage = {
  congress: string;
  dateIssued: string;
  docClass: string;
  lastModified: string;
  packageId: string;
  packageLink: string;
  title: string;
};

export type ExactCollectionItemProps = {
  collectionPackage: CollectionPackage;
  route: {
    params: {
      navigation: any;
    };
  };
};

export type BillProps = {
  active: boolean;
  bill_id: string;
  bill_slug: string;
  bill_type: string;
  bill_uri: string;
  committee_codes: string[];
  committees: string;
  congressdotgov_url: string;
  cosponsors: number;
  cosponsors_by_party?: {
    R?: number;
    D?: number;
    I?: number;
  };
  enacted: boolean | undefined | null;
  govtrack_url: string;
  gpo_pdf_uri: string;
  house_passage: any;
  introduced_date: string;
  last_vote: string | null;
  latest_major_action: string;
  latest_major_action_date: string;
  number: string;
  primary_subject: string;
  senate_passage: any;
  short_title: string;
  sponsor_id: string;
  sponsor_name: string;
  sponsor_party: 'R' | 'D' | 'I';
  sponsor_state: string;
  sponsor_title: 'Rep.' | 'Sen.';
  sponsor_uri: string;
  subcomittee_codes: string[] | number[];
  summary: string;
  summary_short: string;
  title: string;
  vetoed: boolean | null | undefined;
};
