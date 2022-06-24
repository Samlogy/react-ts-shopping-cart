import { Flex, Heading } from "@chakra-ui/react";
import { Layout } from "../components";
export default function Home() {
  return (
    <Layout isHeaderVisible>
      <Heading as="h2" size="2xl" noOfLines={1}>
        Store
      </Heading>
    </Layout>
  );
}
