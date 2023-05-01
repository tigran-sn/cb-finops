export interface ValidationMessages {
  email?: Array<TypesAndMessages>;
  password?: Array<TypesAndMessages>;
}

export interface TypesAndMessages {
  type: string;
  message: string;
}

export const Messages = {
  incorrectEmailFormat(): string {
    return 'Incorrect email format.';
  },
  required: 'RequiredField',
};
