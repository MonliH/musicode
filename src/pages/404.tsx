import * as React from "react";
import { Text, Heading, Box } from "theme-ui";

function PageNotFound() {
  return (
    <Box sx={{ m: [3, 3, 4, 5] }}>
      <Heading as="h1" sx={{ fontSize: 8 }}>
        404
      </Heading>
      <Text sx={{ fontSize: 3 }}>
        The page you were looking for was not found.
      </Text>
    </Box>
  );
}

export default PageNotFound;
