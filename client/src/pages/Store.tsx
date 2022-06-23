import { Box } from "@chakra-ui/react";
import { StoreItem, Layout } from "../components";
import storeItems from "../data/items.json";

export default function Store() {
  return (
    <Layout isHeaderVisible>
      <h1>Store</h1>

      {storeItems.map((item) => (
        <Box key={item.id}>
          <StoreItem {...item} />
        </Box>
      ))}
    </Layout>
  );
}
