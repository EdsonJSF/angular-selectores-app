export interface Pais {
  name: Name;
  cca3: string;
  altSpellings: string[];
}

interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

interface NativeName {
  nld?: Nld;
  pap?: Nld;
  por?: Nld;
  spa?: Nld;
  eng?: Nld;
  aym?: Nld;
  grn?: Nld;
  que?: Nld;
  fra?: Nld;
  jam?: Nld;
  bjz?: Nld;
  hat?: Nld;
  kal?: Nld;
}

interface Nld {
  official: string;
  common: string;
}
