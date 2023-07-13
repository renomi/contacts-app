export type GetAllContactResponse = {
  data: Contact[];
  message?: string;
};

export type GetContactResponse = {
  data: Contact;
  message?: string;
};

export type Contact = {
  age: number;
  firstName: string;
  id: string;
  lastName: string;
  photo: string;
};
