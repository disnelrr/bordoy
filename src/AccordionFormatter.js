import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Box, Text } from "@chakra-ui/layout";

const AccordionFormatter = ({ elements }) => {
  return (
    <Accordion py={8}>
      {elements.map((parcel, index) => {
        return (
          <AccordionItem key={index}>
            <Text color={parcel.depdate ? "green" : null} fontWeight='bold'>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  {parcel.hbl} - <span fontWeight='bold'>{parcel.noorder}</span>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <Box>Status: {parcel.status}</Box>
              <Box>
                Departure Date:{" "}
                {parcel.depdate
                  ? parcel.depdate
                  : "No departed date yet for this item!"}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default AccordionFormatter;
