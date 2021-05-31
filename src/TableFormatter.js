import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
} from "@chakra-ui/react";

const getETA = (date, start = 19, end = 22) => {
  const dateObj = new Date(date);
  const startDate = new Date(Number(dateObj));
  const endDate = new Date(Number(dateObj));
  startDate.setDate(dateObj.getDate() + start);
  endDate.setDate(dateObj.getDate() + end);
  return `${startDate.toLocaleString([], {
    dateStyle: "short",
  })} - ${endDate.toLocaleString([], { dateStyle: "short" })}`;
};

const TableFormatter = ({ elements }) => {
  return (
    <Table variant='striped' colorScheme='teal'>
      <TableCaption>Tracking codes</TableCaption>
      <Thead>
        <Tr>
          <Th>Bill</Th>
          <Th>Track Number</Th>
          <Th>Status</Th>
          <Th>Dep. date</Th>
          <Th>ETA</Th>
          <Th>Mail guide</Th>
        </Tr>
      </Thead>
      <Tbody>
        {elements.map((parcel, index) => {
          return (
            <Tr key={index}>
              <Td>{parcel.noorder}</Td>
              <Td>{parcel.hbl}</Td>
              <Td>
                <Text color={parcel.depdate ? "green" : null} fontWeight='bold'>
                  {parcel.status}
                </Text>
              </Td>
              <Td>{parcel.depdate ? parcel.depdate : "no date"}</Td>
              <Td>{parcel.depdate ? getETA(parcel.depdate) : "no date"}</Td>
              <Td>{parcel.mailguide ? parcel.mailguide : "no mail guide"}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default TableFormatter;
