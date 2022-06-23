import { Flex } from "@chakra-ui/react";
import { StoreItem, Layout } from "../components";
import storeItems from "../data/items.json";

export default function Store() {
  return (
    <Layout isHeaderVisible>
      <h1>Store</h1>

      <Flex flexDir="row" flexWrap="wrap" justify={"space-between"}>
        {storeItems.map((item) => (
          <StoreItem key={item.id} {...item} />
        ))}
      </Flex>
    </Layout>
  );
}
