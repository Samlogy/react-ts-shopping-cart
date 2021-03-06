import { Flex, Heading } from "@chakra-ui/react";
import { StoreItem, Layout } from "../components";
import storeItems from "../data/items.json";

export default function Store() {
  return (
    <Layout isHeaderVisible>
      <Heading as="h2" size="2xl" noOfLines={1}>
        Store
      </Heading>

      <Flex flexDir="row" flexWrap="wrap" justify={"space-between"}>
        {storeItems.map((item) => (
          <StoreItem key={item.id} {...item} />
        ))}
      </Flex>
    </Layout>
  );
}
