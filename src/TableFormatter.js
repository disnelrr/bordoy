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

const isInETA = (date, start = 18, end = 23) => {
  const dateObj = new Date(date);
  const today = new Date();
  const startDate = new Date(Number(dateObj));
  const endDate = new Date(Number(dateObj));
  startDate.setDate(dateObj.getDate() + start);
  endDate.setDate(dateObj.getDate() + end);
  return (
    startDate.getTime() < today.getTime() && today.getTime() < endDate.getTime()
  );
};

const isAfterETA = (date, end = 22) => {
  const dateObj = new Date(date);
  const today = new Date();
  const endDate = new Date(Number(dateObj));
  endDate.setDate(dateObj.getDate() + end);
  return today.getTime() > endDate.getTime();
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
          let styleForETA = { fontWeight: "bold" };
          if (parcel.depdate && isInETA(parcel.depdate)) {
            styleForETA = { color: "red", ...styleForETA };
          } else if (isAfterETA(parcel.depdate)) {
            styleForETA = { color: "green", ...styleForETA };
          } else {
            styleForETA = {};
          }
          return (
            <Tr key={index}>
              <Td>{parcel.noorder}</Td>
              <Td>{parcel.hbl}</Td>
              <Td>
                <Text
                  style={
                    parcel.status === "EN CONSIGNATARIO"
                      ? { color: "green", fontWeight: "bold" }
                      : {}
                  }
                >
                  {parcel.status}
                </Text>
              </Td>
              <Td>{parcel.depdate ? parcel.depdate : "no date"}</Td>
              <Td>
                <Text style={styleForETA}>
                  {parcel.depdate ? getETA(parcel.depdate) : "no date"}
                </Text>
              </Td>
              <Td>{parcel.mailguide ? parcel.mailguide : "no mail guide"}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default TableFormatter;
