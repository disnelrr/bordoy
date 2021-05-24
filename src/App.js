import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { FaSyncAlt } from "react-icons/fa";
import "./App.css";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertTitle,
  ChakraProvider,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const [data, setData] = useState(false);
  const [idCard, setIdCard] = useState("");
  const [status, setStatus] = useState("");

  const fetchData = () => {
    setStatus("Fetching data...");
    fetch(
      `https://www.solvebigtech.com/bordoy/service/index.php?funcname=status&enterprise=bordoy&identity=${idCard}&apikey=bcURfJhHPCNBT4i7ANhVKQDw62e32W`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        setData(jsonData);
        setStatus("Data received!");
      })
      .catch((error) => {
        // handle your errors here
        console.error(error);
      });
  };

  let elements = [];
  if (data) {
    for (let index = 0; index < data[idCard]?.length; index++) {
      elements.push(data[idCard][index]);
    }
  }

  return (
    <ChakraProvider>
      <Box className='App' w={{ base: "100%", md: "50%" }} m='auto' p={10}>
        <Text fontSize='2xl' fontWeight='bold' mb={5}>
          Bordoy Group Tracking Numbers
        </Text>
        <Flex>
          <Input
            placeholder='Enter your ID card'
            onChange={(e) => setIdCard(e.target.value)}
            mr={5}
          />
          <Button onClick={fetchData} leftIcon={<FaSyncAlt />}>
            Refresh
          </Button>
        </Flex>
        {status ? (
          <Alert mt={5}>
            <AlertTitle>{status}</AlertTitle>
          </Alert>
        ) : null}
        <Accordion py={8}>
          {elements.map((parcel, index) => {
            return (
              <AccordionItem key={index}>
                <Text color={parcel.depdate ? "green" : null} fontWeight='bold'>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {parcel.hbl} -{" "}
                      <span fontWeight='bold'>{parcel.noorder}</span>
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
      </Box>
    </ChakraProvider>
  );
}

export default App;
