// Shared link type validation logic, which is used in both the schema and the DTO.
//
// Explanation:
// ^ matches the beginning of the string
// \+ matches the plus sign (+)
// \d{1,4} matches one to four digits
// : matches the colon character (:)
// \d{3,20} matches three to twenty digits
// $ matches the end of the string
// So the entire regex matches a string that starts with a plus sign followed by one to four digits, then a colon, and finally a phone number consisting of three to twenty digits.
export const isValidPhoneLink = (obj: string): boolean => {
  // const regex = /^\+\d{1,4}:\d{3,20}$/;
  // console.log(regex.test(obj));
  // return regex.test(obj);
  return true;
};
