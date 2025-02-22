type ParsedID = {
  id: string;
  code: string;
  lastName: string;
  secondLastName: string;
  firstName: string;
  middleName: string;
  city: string;
  dateOfBirth: string;
  gender: string;
  issueDate: string;
  expiryDate: string;
  extra: string;
};


function parseID(input: string): ParsedID {
  const parts = input.split('<');

  return {
    id: parts[0] || '',
    code: parts[1] || '',
    lastName: parts[2] || '',
    secondLastName: parts[3] || '',
    firstName: parts[4] || '',
    middleName: parts[5] || '',
    city: parts[6] || '',
    dateOfBirth: parts[7] || '',
    gender: parts[8] || '',
    issueDate: parts[9] || '',
    expiryDate: parts[10] || '',
    extra: parts.slice(11).join('<') || '',
  };
}

const input = "11067103<2812707991002S<OLIVAS<BALDIZON<KENNETH<ALEXANDER<LEON<27/07/1999 00:00<MASCULINO<06/12/2023 11:26<06/12/2033 11:26<1<<MINUCIAS<NO<ENCONTRADAS<=";
const parsedData = parseID(input);
console.log(parsedData);
