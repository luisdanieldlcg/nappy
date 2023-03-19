export interface ICreateCardDTO {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  coverImage: string;
  color: string;
}
export interface ICardDTO extends ICreateCardDTO {}
