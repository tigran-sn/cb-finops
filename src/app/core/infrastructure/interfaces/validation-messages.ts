export interface ValidationMessages {
  email?: Array<TypesAndMessages>;
  username?: Array<TypesAndMessages>;
  password?: Array<TypesAndMessages>;
  dealId?: Array<TypesAndMessages>,
  participant?: Array<TypesAndMessages>,
  dealType?: Array<TypesAndMessages>,
  partner?: Array<TypesAndMessages>,
  dealDate?: Array<TypesAndMessages>,
  calculationDate?: Array<TypesAndMessages>,
  isocode?: Array<TypesAndMessages>,
  volume?: Array<TypesAndMessages>,
  rate?: Array<TypesAndMessages>,
}

export interface TypesAndMessages {
  type: string;
  message: string;
}

export const Messages = {
  incorrectEmailFormat(): string {
    return 'Incorrect email format.';
  },
  validateMaxCharacterMessage(size: number): string {
    return `Max${size}`;
  },
  required: 'RequiredField',
  integersOnly: 'IntegersOnly',
  rateFormat: 'RateFormat',
};
