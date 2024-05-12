import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import axios from "axios";
const HOST = import.meta.env.VITE_HOST;

import Typography from "@mui/material/Typography";

function convertData(inputData) {
  // Create a map of id to data for easy access
  const dataMap = inputData.reduce((acc, item) => {
    acc[item._id] = { id: item._id, label: item.label, children: [] };
    return acc;
  }, {});

  // Populate the children arrays
  inputData.forEach((item) => {
    item.children.forEach((childId) => {
      if (dataMap[childId]) {
        dataMap[item._id].children.push(dataMap[childId]);
      }
    });
  });

  // Return the values of the data map as an array
  return Object.values(dataMap);
}

export default function TrackItemSelectionToggle() {
  const [lastSelectedItem, setLastSelectedItem] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${HOST}/category/getData`);
        const formattedData = convertData(response.data);
        setData(formattedData[0]);
        console.log("Formatted data: ", formattedData[0]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleItemSelectionToggle = (event, itemId, isSelected) => {
    console.log(event);
    if (isSelected) {
      setLastSelectedItem(itemId);
    }
  };

  return (
    <>
      <Stack spacing={2}>
        {/* <Typography>
          {lastSelectedItem == null
            ? "No item selection recorded"
            : `Last selected item: ${lastSelectedItem}`}
        </Typography> */}
        <Box sx={{ minHeight: 200, minWidth: 300, flexGrow: 1 }}>
          <RichTreeView
            items={data ? [data] : []}
            onItemSelectionToggle={handleItemSelectionToggle}
          />
        </Box>
      </Stack>
    </>
  );
}
