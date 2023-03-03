export interface CreateCardDTO {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  backgroundImage: string;
}
export interface CardDTO extends CreateCardDTO {}
