export interface ICreateCardDTO {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  backgroundImage: string;
}
export interface ICardDTO extends ICreateCardDTO {}
