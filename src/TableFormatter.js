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

const TableFormatter = ({ elements }) => {
  return (
    <Table variant='striped' colorScheme='teal'>
      <TableCaption>Tracking codes</TableCaption>
      <Thead>
        <Tr>
          <Th>Bill</Th>
          <Th>Tracking Number</Th>
          <Th>Status</Th>
          <Th>Dep. date</Th>
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
              <Td>{parcel.depdate}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default TableFormatter;
