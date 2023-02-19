export interface CreateCardDTO {
  title: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
}
export interface CardDTO extends CreateCardDTO {}
