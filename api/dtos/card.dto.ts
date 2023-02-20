export interface CreateCardDTO {
  label: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
}
export interface CardDTO extends CreateCardDTO {}
