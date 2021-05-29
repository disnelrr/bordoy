import { Button } from "@chakra-ui/button";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { FaSyncAlt } from "react-icons/fa";
import "./App.css";
import {
  Alert,
  AlertTitle,
  ChakraProvider,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import AccordionFormatter from "./AccordionFormatter";
import TableFormatter from "./TableFormatter";

const ContentDisplay = ({ view, elements }) => {
  switch (view) {
    case "accordion":
      return <AccordionFormatter elements={elements} />;
    case "table":
      return <TableFormatter elements={elements} />;
    default:
      return <Alert>List not implemented yet!</Alert>;
  }
};

function App() {
  const [data, setData] = useState(false);
  const [idCard, setIdCard] = useState("");
  const [status, setStatus] = useState("No data, please update!");
  const [view, setView] = useState("table");

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
      <Box className='App' w={{ base: "100%", md: "50%" }} m='auto' p={5}>
        <Text fontSize='2xl' fontWeight='bold' mb={5}>
          Bordoy Group Tracking Numbers
        </Text>
        <Flex flexWrap={{ base: "wrap", md: "nowrap" }}>
          <Input
            placeholder='Enter your ID card'
            onChange={(e) => setIdCard(e.target.value)}
            mr={5}
          />
          <Button
            onClick={fetchData}
            leftIcon={<FaSyncAlt />}
            marginTop={{ base: 3, md: 0 }}
          >
            Refresh
          </Button>
        </Flex>
        {data && status !== "Fetching data..." ? (
          <>
            <RadioGroup onChange={setView} value={view} my={3}>
              <Stack direction='row'>
                <Radio value='accordion'>Accordion</Radio>
                <Radio value='table'>Table</Radio>
                <Radio value='list'>List</Radio>
              </Stack>
            </RadioGroup>
            <ContentDisplay view={view} elements={elements} />
          </>
        ) : (
          <Alert mt={5}>
            <AlertTitle>{status}</AlertTitle>
          </Alert>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
